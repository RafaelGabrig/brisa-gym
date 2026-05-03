import { useEffect, useState } from 'react'
import './Nav.css'

function LogoBlock({ size = 'nav' }) {
  return (
    <a href="#hero" className={`logo-block ${size}-logo`}>
      <span className="lb-brisa">BR<span className="lb-i">I</span>SA</span>
      <span className="lb-gym">Gym</span>
    </a>
  )
}

export { LogoBlock }

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <LogoBlock size="nav" />
      <ul className="nav-links">
        <li><a href="#sobre">Nosotros</a></li>
        <li><a href="#features">Servicios</a></li>
        <li><a href="#equipo">Equipamiento</a></li>
        <li><a href="#ubicacion">Ubicación</a></li>
        <li><a href="#inscripcion">Pre-inscripción</a></li>
      </ul>
    </nav>
  )
}
