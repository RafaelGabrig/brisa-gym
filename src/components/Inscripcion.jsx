import { useState } from 'react'
import './Inscripcion.css'

const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID'

export default function Inscripcion() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

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
      <p className="sec-lbl reveal">Únete antes de la apertura</p>
      <h2 className="sec-title reveal">Reserva tu plaza <em>ahora</em></h2>
      <p className="body-t reveal">
        Sé de los primeros en formar parte de la comunidad Brisa Gym.<br />
        Los pre-inscritos tendrán acceso a condiciones especiales de lanzamiento.
      </p>

      <div className="form-wrap">
        {!submitted ? (
          <form onSubmit={handleSubmit} action={FORMSPREE_URL} method="POST">
            <div className="fg reveal">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required />
            </div>
            <div className="fg reveal">
              <label htmlFor="telefono">Teléfono</label>
              <input type="tel" id="telefono" name="telefono" placeholder="+34 600 000 000" required />
            </div>
            <div className="fg reveal">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="tu@email.com" required />
            </div>
            <button type="submit" className="form-btn reveal" disabled={sending}>
              {sending ? 'Enviando...' : 'Quiero reservar mi plaza'}
            </button>
          </form>
        ) : (
          <div className="form-ok">
            <p>¡Gracias por unirte!</p>
            <small>Te contactaremos próximos a la apertura.</small>
          </div>
        )}
        <p className="form-note reveal">✦ Tus datos no serán compartidos con terceros.</p>
      </div>
    </section>
  )
}
