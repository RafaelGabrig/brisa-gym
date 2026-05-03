import { useEffect, useState } from 'react'
import brisaLogo from '../assets/brisa-logo.jpeg'
import './Hero.css'

function useCountdown(target) {
  const [time, setTime] = useState({ d: '00', h: '00', m: '00' })

  useEffect(() => {
    function update() {
      const diff = new Date(target) - new Date()
      if (diff <= 0) return
      setTime({
        d: String(Math.floor(diff / 864e5)).padStart(2, '0'),
        h: String(Math.floor(diff % 864e5 / 36e5)).padStart(2, '0'),
        m: String(Math.floor(diff % 36e5 / 6e4)).padStart(2, '0'),
      })
    }
    update()
    const id = setInterval(update, 60000)
    return () => clearInterval(id)
  }, [target])

  return time
}

export default function Hero() {
  const { d, h, m } = useCountdown('2026-07-01T09:00:00')

  return (
    <section id="hero">
      <div className="hero-logo-pos">
        <img
          src={brisaLogo}
          alt="Brisa Gym"
          className="hero-logo-img"
        />
      </div>

      <div className="hero-bottom-fade" />

      <div className="hero-content">
        <h1 className="hero-tagline">
          Donde el bienestar<br />
          se convierte en <em>estilo de vida</em>
        </h1>
        <p className="hero-sub">Gran Alacant · Alicante · Apertura Julio 2026</p>

        <div className="cd-row">
          <div>
            <span className="cd-num">{d}</span>
            <div className="cd-lbl">Días</div>
          </div>
          <div className="cd-sep">:</div>
          <div>
            <span className="cd-num">{h}</span>
            <div className="cd-lbl">Horas</div>
          </div>
          <div className="cd-sep">:</div>
          <div>
            <span className="cd-num">{m}</span>
            <div className="cd-lbl">Minutos</div>
          </div>
        </div>

        <a href="#inscripcion" className="hero-cta">Reserva tu plaza</a>
      </div>

      <div className="scroll-hint">
        Descubre más
        <div className="scroll-line" />
      </div>
    </section>
  )
}
