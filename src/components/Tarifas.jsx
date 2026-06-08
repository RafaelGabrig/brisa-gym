import { useLang } from '../context/LangContext'
import './Tarifas.css'

const PLANS_ES = [
  {
    id: 'estandar',
    name: 'Estándar',
    oldPrice: '49,90€',
    price: '39,90€',
    period: '/mes',
    badge: null,
    items: [
      'Sala de musculación',
      'Clases dirigidas ilimitadas',
    ],
    acomp: [
      'Evaluación física inicial con equipo de entrenadores',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    oldPrice: '64,90€',
    price: '49,90€',
    period: '/mes',
    badge: 'Más elegido',
    items: [
      'Sala de musculación',
      'Clases dirigidas ilimitadas',
      'Acceso a máquinas EGYM',
      'Zona Recovery 2x/semana',
      '10% descuento cafetería',
      '10% descuento estética',
    ],
    acomp: [
      'Evaluación física inicial',
      'Evaluación física mensual',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    oldPrice: '74,90€',
    price: '59,90€',
    period: '/mes',
    badge: null,
    items: [
      'Sala de musculación',
      'Clases dirigidas ilimitadas',
      'Acceso a máquinas EGYM',
      'Zona Recovery 3x/semana',
      '15% descuento cafetería',
      '15% descuento estética',
      'Reserva anticipada de clases',
    ],
    acomp: [
      'Evaluación física inicial',
      'Evaluación física mensual',
      'Acompañamiento nutricional periódico personalizado',
    ],
  },
]

const PLANS_EN = [
  {
    id: 'standard',
    name: 'Standard',
    oldPrice: '49.90€',
    price: '39.90€',
    period: '/mo',
    badge: null,
    items: [
      'Weight training room',
      'Unlimited group classes',
    ],
    acomp: [
      'Initial physical assessment with coaching team',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    oldPrice: '64.90€',
    price: '49.90€',
    period: '/mo',
    badge: 'Most popular',
    items: [
      'Weight training room',
      'Unlimited group classes',
      'EGYM machine access',
      'Recovery zone 2x/week',
      '10% café discount',
      '10% aesthetics discount',
    ],
    acomp: [
      'Initial physical assessment',
      'Monthly physical assessment',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    oldPrice: '74.90€',
    price: '59.90€',
    period: '/mo',
    badge: null,
    items: [
      'Weight training room',
      'Unlimited group classes',
      'EGYM machine access',
      'Recovery zone 3x/week',
      '15% café discount',
      '15% aesthetics discount',
      'Priority class booking',
    ],
    acomp: [
      'Initial physical assessment',
      'Monthly physical assessment',
      'Personalised periodic nutritional coaching',
    ],
  },
]

export default function Tarifas() {
  const { lang, t } = useLang()
  const plans = lang === 'es' ? PLANS_ES : PLANS_EN

  return (
    <section id="tarifas">
      <p className="sec-lbl reveal">{t.tarifas.lbl}</p>
      <h2 className="sec-title reveal">
        {t.tarifas.title1} <em>{t.tarifas.titleEm}</em>
      </h2>
      <p className="tarifas-sub reveal">{t.tarifas.sub}</p>

      <div className="tarifas-grid">
        {plans.map((plan, i) => (
          <div key={i} className={`tarifa-card reveal${plan.badge ? ' tarifa-featured' : ''}`}>
            {plan.badge && <div className="tarifa-badge">{plan.badge}</div>}

            <div className="tarifa-header">
              <h3 className="tarifa-name">{plan.name}</h3>
              <div className="tarifa-pricing">
                <span className="tarifa-old">{plan.oldPrice}</span>
                <span className="tarifa-price">{plan.price}</span>
                <span className="tarifa-period">{plan.period}</span>
              </div>
            </div>

            <ul className="tarifa-items">
              {plan.items.map((item, i) => (
                <li key={i}><span className="tarifa-check">✓</span>{item}</li>
              ))}
            </ul>

            <div className="tarifa-acomp">
              <p className="tarifa-acomp-lbl">{t.tarifas.acompLabel}</p>
              <ul>
                {plan.acomp.map((a, i) => (
                  <li key={i}><span className="tarifa-check">✓</span>{a}</li>
                ))}
              </ul>
            </div>

            <a href="#inscripcion" className="tarifa-cta">{t.tarifas.cta}</a>
          </div>
        ))}
      </div>

      <p className="tarifas-tagline reveal">{t.tarifas.tagline}</p>
    </section>
  )
}
