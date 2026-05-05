import { useEffect, useState } from 'react'
import { useLang } from '../context/LangContext'
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
  const { lang, toggle, t } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <ul className="nav-links">
        <li><a href="#sobre">{t.nav.nosotros}</a></li>
        <li><a href="#features">{t.nav.servicios}</a></li>
        <li><a href="#ubicacion">{t.nav.ubicacion}</a></li>
        <li><a href="#inscripcion">{t.nav.inscripcion}</a></li>
      </ul>
      <button className="lang-btn" onClick={toggle}>
        {lang === 'es' ? 'EN' : 'ES'}
      </button>
    </nav>
  )
}
