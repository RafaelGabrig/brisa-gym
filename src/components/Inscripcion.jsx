import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { useLang } from '../context/LangContext'
import './Inscripcion.css'

const PLANS = {
  standard: {
    es: { name: 'Estándar', price: '39,90€/mes' },
    en: { name: 'Standard', price: '39.90€/mo' },
  },
  premium: {
    es: { name: 'Premium', price: '49,90€/mes' },
    en: { name: 'Premium', price: '49.90€/mo' },
  },
  elite: {
    es: { name: 'Elite', price: '59,90€/mes' },
    en: { name: 'Elite', price: '59.90€/mo' },
  },
}

const PLAN_KEYS = ['standard', 'premium', 'elite']

const W3F_KEY      = import.meta.env.VITE_WEB3FORMS_KEY      ?? 'ecc2ab41-eae0-4a1e-ae7a-249420e365dc'
const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? 'service_w6zpj3o'
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_vjepw7c'
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? '96Ly57RbepEzePEJy'

export default function Inscripcion() {
  const { lang, t } = useLang()
  const ti = t.inscripcion

  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', plan: '' })
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const handler = e => setForm(f => ({ ...f, plan: e.detail }))
    window.addEventListener('brisa:selectPlan', handler)
    return () => window.removeEventListener('brisa:selectPlan', handler)
  }, [])

  const set = key => e => {
    const val = e.target.value
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }))
  }

  function validate(f) {
    const e = {}
    if (!f.plan) e.plan = ti.errPlan
    if (!f.nombre.trim()) e.nombre = ti.errRequired
    if (!f.telefono.trim()) e.telefono = ti.errRequired
    if (!f.email.trim()) e.email = ti.errRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = ti.errEmail
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setStatus('sending')

    const planLocale = PLANS[form.plan][lang]

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: W3F_KEY,
          name: form.nombre,
          phone: form.telefono,
          email: form.email,
          plan: planLocale.name,
          subject: `Pre-inscripción: ${form.nombre} — ${planLocale.name}`,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error('web3forms')

      // Email de confirmação — best-effort, não bloqueia o sucesso
      emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          to_name: form.nombre,
          to_email: form.email,
          plan_name: planLocale.name,
          plan_price: planLocale.price,
        },
        { publicKey: EJS_KEY },
      ).catch(err => console.error('EmailJS error:', err))

      setStatus('ok')
    } catch (err) {
      console.error('Submission error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="inscripcion">
      <p className="sec-lbl reveal">{ti.lbl}</p>
      <h2 className="sec-title reveal">
        {ti.title} <em>{ti.titleEm}</em>
      </h2>
      <p className="body-t reveal">
        {ti.body1}<br />{ti.body2}
      </p>

      <div className="form-wrap">
        {status === 'ok' ? (
          <div className="form-ok">
            <p>{ti.successTitle}</p>
            <small>{ti.successBody}</small>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="fg">
              <label>{ti.plan}</label>
              <div className={`plan-selector${errors.plan ? ' plan-selector-err' : ''}`}>
                {PLAN_KEYS.map(pid => {
                  const p = PLANS[pid][lang]
                  return (
                    <label
                      key={pid}
                      className={`plan-option${form.plan === pid ? ' plan-selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={pid}
                        checked={form.plan === pid}
                        onChange={() => {
                          setForm(f => ({ ...f, plan: pid }))
                          if (errors.plan) setErrors(prev => ({ ...prev, plan: '' }))
                        }}
                      />
                      <span className="po-name">{p.name}</span>
                      <span className="po-price">{p.price}</span>
                    </label>
                  )
                })}
              </div>
              {errors.plan && <span className="field-err">{errors.plan}</span>}
            </div>

            <div className="fg">
              <label>{ti.nombre}</label>
              <input
                type="text"
                placeholder={ti.nombrePh}
                value={form.nombre}
                onChange={set('nombre')}
                className={errors.nombre ? 'input-err' : ''}
              />
              {errors.nombre && <span className="field-err">{errors.nombre}</span>}
            </div>

            <div className="fg">
              <label>{ti.telefono}</label>
              <input
                type="tel"
                placeholder={ti.telefonoPh}
                value={form.telefono}
                onChange={set('telefono')}
                className={errors.telefono ? 'input-err' : ''}
              />
              {errors.telefono && <span className="field-err">{errors.telefono}</span>}
            </div>

            <div className="fg">
              <label>{ti.email}</label>
              <input
                type="email"
                placeholder={ti.emailPh}
                value={form.email}
                onChange={set('email')}
                className={errors.email ? 'input-err' : ''}
              />
              {errors.email && <span className="field-err">{errors.email}</span>}
            </div>

            {status === 'error' && (
              <p className="form-err">{ti.errorMsg}</p>
            )}

            <button className="form-btn" disabled={status === 'sending'} type="submit">
              {status === 'sending' ? ti.sending : ti.btn}
            </button>

            <p className="form-note">{ti.note}</p>
          </form>
        )}
      </div>
    </section>
  )
}
