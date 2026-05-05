import sobreImg from '../assets/sobre-img.png'
import { useLang } from '../context/LangContext'
import './Sobre.css'

export default function Sobre() {
  const { t } = useLang()

  return (
    <section id="sobre">
      <div className="sobre-visual-wrap reveal">
        <div className="sobre-visual">
          <img src={sobreImg} alt="Brisa Gym" className="sobre-img" />
        </div>
        <div className="sobre-quote">
          <p>
            {t.sobre.quote}<br />
            <strong>{t.sobre.quoteStrong}</strong>
          </p>
        </div>
      </div>

      <div>
        <p className="sec-lbl reveal">{t.sobre.lbl}</p>
        <h2 className="sec-title reveal">
          {t.sobre.title1}<br /><em>{t.sobre.titleEm}</em>
        </h2>
        <div className="divider-line reveal" />
        <p className="body-t reveal">{t.sobre.body}</p>
      </div>
    </section>
  )
}
