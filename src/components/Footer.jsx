import brisaLogo from '../assets/brisa-logo.jpeg'
import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <a href="#hero" className="ft-logo-link">
        <img src={brisaLogo} alt="Brisa Gym" className="ft-logo-img" />
      </a>
      <div className="ft-info">
        Av. Escandinavia 72 · Gran Alacant · Alicante<br />
        brisagym.alc@gmail.com · Apertura Julio 2026
      </div>
      <div className="ft-social">
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
      </div>
    </footer>
  )
}
