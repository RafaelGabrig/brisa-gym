import { useState } from 'react'
import { useLang } from '../context/LangContext'
import './Inscripcion.css'

const FORMSPREE_URL = 'https://formspree.io/f/xvzlanvy'

export default function Inscripcion() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const { t } = useLang()

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    try {
      await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
    } catch (_) {}
    setSubmitted(true)
  }

  return (
    <section id="inscripcion">
      <p className="sec-lbl reveal">{t.inscripcion.lbl}</p>
      <h2 className="sec-title reveal">{t.inscripcion.title} <em>{t.inscripcion.titleEm}</em></h2>
      <p className="body-t reveal">
        {t.inscripcion.body1}<br />{t.inscripcion.body2}
      </p>

      <div className="form-wrap">
        {!submitted ? (
          <form onSubmit={handleSubmit} action={FORMSPREE_URL} method="POST">
            <div className="fg reveal">
              <label htmlFor="nombre">{t.inscripcion.nombre}</label>
              <input type="text" id="nombre" name="nombre" placeholder={t.inscripcion.nombrePh} required />
            </div>
            <div className="fg reveal">
              <label htmlFor="telefono">{t.inscripcion.telefono}</label>
              <input type="tel" id="telefono" name="telefono" placeholder={t.inscripcion.telefonoPh} required />
            </div>
            <div className="fg reveal">
              <label htmlFor="email">{t.inscripcion.email}</label>
              <input type="email" id="email" name="email" placeholder={t.inscripcion.emailPh} required />
            </div>
            <button type="submit" className="form-btn reveal" disabled={sending}>
              {sending ? t.inscripcion.sending : t.inscripcion.btn}
            </button>
          </form>
        ) : (
          <div className="form-ok">
            <p>{t.inscripcion.successTitle}</p>
            <small>{t.inscripcion.successBody}</small>
          </div>
        )}
        <p className="form-note reveal">{t.inscripcion.note}</p>
      </div>
    </section>
  )
}
