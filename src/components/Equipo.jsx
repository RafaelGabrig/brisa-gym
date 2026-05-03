import egym1 from '../assets/egym.png'
import egym2 from '../assets/egymhub.jpg'
import egym3 from '../assets/egyms3.png'
import './Equipo.css'

const EQUIPMENT = [
  { label: 'Circuito eGym Smart Strength', tag: 'MAQUINAS CON IA' },
  { label: 'Café Gym', tag: '' },
  { label: 'Bicicletas estáticas y elípticas', tag: 'Alta gama' },
  { label: 'Zona de peso libre completa', tag: 'Mancuernas & barras' },
  { label: '', tag: '' },
  { label: 'Zona de estiramiento y movilidad', tag: 'Recovery' },
  { label: '', tag: '' },
  { label: '', tag: '' },
]

const EGYM_IMAGES = [
  { src: egym1, alt: 'eGym Smart Strength machines' },
  { src: egym2, alt: 'eGym hub' },
  { src: egym3, alt: 'eGym training area' },
]

export default function Equipo() {
  return (
    <section id="equipo">
      <p className="sec-lbl reveal">Equipamiento</p>
      <h2 className="sec-title reveal">
        Tecnología al servicio<br />de tu <em>rendimiento</em>
      </h2>

      <div className="eq-layout">
        <ul className="eq-list reveal">
          {EQUIPMENT.map((item, i) => (
            <li key={i}>
              {item.label}
              {item.tag && <span>{item.tag}</span>}
            </li>
          ))}
        </ul>

        <div className="eq-hl reveal">
          <h3>eGym Smart Strength</h3>
          <p>
            El sistema más avanzado del mercado. Cada máquina mide tu fuerza, ajusta la resistencia y registra tu progreso.
            Entrena de forma más inteligente, no más dura.
          </p>
          <p>
            Compatible con la app eGym para seguimiento completo de tus entrenamientos desde el móvil.
          </p>
          <div className="badges">
            <span className="badge">Smart Strength</span>
            <span className="badge">Connected App</span>
            <span className="badge">IA Adaptativa</span>
            <span className="badge">Progress Tracking</span>
          </div>
        </div>
      </div>

      <div className="egym-gallery reveal">
        {EGYM_IMAGES.map((img) => (
          <div key={img.alt} className="egym-gallery-item">
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>
    </section>
  )
}
