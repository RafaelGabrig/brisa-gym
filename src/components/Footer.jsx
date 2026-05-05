import brisaLogo from '../assets/brisa-logo.jpeg'
import { useLang } from '../context/LangContext'
import './Footer.css'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer>
      <a href="#hero" className="ft-logo-link">
        <img src={brisaLogo} alt="Brisa Gym" className="ft-logo-img" />
      </a>
      <div className="ft-info">
        Av. Escandinavia 72 · Gran Alacant · Alicante<br />
        brisagym.alc@gmail.com · {t.footer.apertura}
      </div>
      <div className="ft-social">
        <a href="https://www.instagram.com/brisagym/">Instagram</a>
        <a href="https://www.facebook.com/share/1CGdWhDTe9/">Facebook</a>
      </div>
    </footer>
  )
}
