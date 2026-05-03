import './Ubicacion.css'

export default function Ubicacion() {
  return (
    <section id="ubicacion">
      <div>
        <p className="sec-lbl reveal">Dónde estamos</p>
        <h2 className="sec-title reveal">
          En el corazón de<br /><em>Gran Alacant</em>
        </h2>

        <div className="addr-item reveal">
          <div className="addr-icon">📍</div>
          <div className="addr-text">
            <strong>Dirección</strong>
            <p>Av. Escandinavia, 72<br />Gran Alacant, Alicante, España</p>
          </div>
        </div>

        <div className="addr-item reveal">
          <div className="addr-icon">📅</div>
          <div className="addr-text">
            <strong>Apertura prevista</strong>
            <p>Julio 2026</p>
          </div>
        </div>

        <div className="addr-item reveal">
          <div className="addr-icon">✉️</div>
          <div className="addr-text">
            <strong>Contacto</strong>
            <p>brisagym.alc@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="map-box reveal">
        <iframe
          title="Brisa Gym location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3161.1234567890123!2d-0.5720000000000001!3d38.178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDEwJzQwLjgiTiAwwrAzNCcxOS4yIlc!5e0!3m2!1ses!2ses!4v1234567890"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}
