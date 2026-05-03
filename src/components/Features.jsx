import './Features.css'

const FEATURES = [
  {
    icon: '⚡',
    name: 'Circuito eGym',
    desc: 'Smart Strength con máquinas inteligentes. IA adaptativa, seguimiento de progresos y ajuste automático de resistencia en cada sesión.',
  },
  {
    icon: '💪',
    name: 'Musculación',
    desc: 'Equipamiento completo: mancuernas, barras, máquinas de cable, cintas de correr y bicicletas. Todo en un solo espacio.',
  },
  {
    icon: '🧘',
    name: 'Clases Dirigidas',
    desc: 'Clases de GAP, Spinning, BrisaPump, jiu-jitsu brasileño, entrenamiento funcional, Zumba... Horarios flexibles pensados para tu día a día.',
  },
  {
    icon: '🛁',
    name: 'Recovery & Wellness',
    desc: 'Sauna con infrarrojos, bañera de hielo y hidromasaje.',
  },
  {
    icon: '🌿',
    name: 'Estética',
    desc: 'Cabinas de estética integradas para cuidar tu cuerpo por dentro y por fuera.',
  },
  {
    icon: '☕',
    name: 'Cafetería',
    desc: 'Batidos de proteínas, açaí bowls, snacks saludables y bebidas. El complemento perfecto para tu entreno.',
  },
]

export default function Features() {
  return (
    <section id="features">
      <p className="sec-lbl reveal">Lo que encontrarás</p>
      <h2 className="sec-title reveal">
        Espacios diseñados<br />para <em>tu bienestar</em>
      </h2>
      <p className="f-intro reveal">Cada zona pensada para ofrecerte la mejor experiencia.</p>
      <div className="f-grid">
        {FEATURES.map((f) => (
          <div key={f.name} className="f-card reveal">
            <span className="f-icon">{f.icon}</span>
            <h3 className="f-name">{f.name}</h3>
            <p className="f-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
