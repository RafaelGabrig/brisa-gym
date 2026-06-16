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

export default function Inscripcion() {
  const { lang, t } = useLang()
  const ti = t.inscripcion

  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', plan: '' })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const handler = e => setForm(f => ({ ...f, plan: e.detail }))
    window.addEventListener('brisa:selectPlan', handler)
    return () => window.removeEventListener('brisa:selectPlan', handler)
  }, [])

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.plan) {
      alert(ti.selectPlanAlert)
      return
    }
    setStatus('sending')

    const planLocale = PLANS[form.plan][lang]

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: form.nombre,
          phone: form.telefono,
          email: form.email,
          plan: planLocale.name,
          subject: `Pre-inscripción: ${form.nombre} — ${planLocale.name}`,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error('web3forms')

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_name: form.nombre,
          to_email: form.email,
          plan_name: planLocale.name,
          plan_price: planLocale.price,
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      )

      setStatus('ok')
    } catch {
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
              <div className="plan-selector">
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
                        onChange={() => setForm(f => ({ ...f, plan: pid }))}
                      />
                      <span className="po-name">{p.name}</span>
                      <span className="po-price">{p.price}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            <div className="fg">
              <label>{ti.nombre}</label>
              <input
                type="text"
                placeholder={ti.nombrePh}
                value={form.nombre}
                onChange={set('nombre')}
                required
              />
            </div>

            <div className="fg">
              <label>{ti.telefono}</label>
              <input
                type="tel"
                placeholder={ti.telefonoPh}
                value={form.telefono}
                onChange={set('telefono')}
              />
            </div>

            <div className="fg">
              <label>{ti.email}</label>
              <input
                type="email"
                placeholder={ti.emailPh}
                value={form.email}
                onChange={set('email')}
                required
              />
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
