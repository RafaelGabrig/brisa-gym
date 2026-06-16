import brisaLogo from '../assets/logo-fundo-transparente.svg'
import { useLang } from '../context/LangContext'
import './Hero.css'

export default function Hero() {
  const { t } = useLang()

  return (
    <section id="hero">
      <div className="hero-logo-pos">
        <img src={brisaLogo} alt="Brisa Gym" className="hero-logo-img" />
      </div>

      <div className="hero-bottom-fade" />

      <div className="hero-content">
        <h1 className="hero-tagline">
          {t.hero.tagline1}<br />
          {t.hero.tagline2} <em>{t.hero.taglineEm}</em>
        </h1>
        <p className="hero-sub">{t.hero.sub}</p>

        <p className="muy-pronto">{t.hero.muyPronto}</p>

        <a href="#inscripcion" className="hero-cta">{t.hero.cta}</a>
      </div>

      <div className="scroll-hint">
        {t.hero.scroll}
        <div className="scroll-line" />
      </div>
    </section>
  )
}
