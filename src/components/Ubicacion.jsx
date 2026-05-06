import { useLang } from '../context/LangContext'
import './Ubicacion.css'

export default function Ubicacion() {
  const { t } = useLang()

  return (
    <section id="ubicacion">
      <div>
        <p className="sec-lbl reveal">{t.ubicacion.lbl}</p>
        <h2 className="sec-title reveal">
          {t.ubicacion.title1}<br /><em>{t.ubicacion.titleEm}</em>
        </h2>

        <div className="addr-item reveal">
          <div className="addr-icon">📍</div>
          <div className="addr-text">
            <strong>{t.ubicacion.dirLabel}</strong>
            <p>{t.ubicacion.dir1}<br />{t.ubicacion.dir2}</p>
          </div>
        </div>

        <div className="addr-item reveal">
          <div className="addr-icon">📅</div>
          <div className="addr-text">
            <strong>{t.ubicacion.apertLabel}</strong>
            <p>{t.ubicacion.apert}</p>
          </div>
        </div>

        <div className="addr-item reveal">
          <div className="addr-icon">✉️</div>
          <div className="addr-text">
            <strong>{t.ubicacion.contactLabel}</strong>
            <p>contacto@brisagym.es</p>
          </div>
        </div>
      </div>

      <div className="map-box reveal">
        <iframe
          title="Brisa Gym location"
          src="https://maps.google.com/maps?q=38.22487978355518,-0.5205746237942304&output=embed&z=17"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}
