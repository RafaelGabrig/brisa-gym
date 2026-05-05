import { useState, useEffect, useRef } from 'react'
import { useLang } from '../context/LangContext'
import egym1 from '../assets/egym.png'
import egym2 from '../assets/egymhub.jpg'
import egym3 from '../assets/egyms3.png'
import egymVideo from '../assets/egymV.mp4'
import bh2Video from '../assets/bh2.mp4'
import gapImg from '../assets/gap.webp'
import jiuImg from '../assets/jiu.jpeg'
import spinningImg from '../assets/sppining.webp'
import zumbaImg from '../assets/zumba.avif'
import absImg from '../assets/abs.png'
import vsaunaVideo from '../assets/Vsauna.mp4'
import estetica1Img from '../assets/estetica.jpg'
import estetica2Img from '../assets/estetica2.webp'
import estetica3Img from '../assets/estetica3.webp'
import cafe1Img from '../assets/cafe.jpg'
import cafe2Img from '../assets/cafe2.jpg'
import cafe3Img from '../assets/cafe3.jpg'
import './Features.css'

const FEATURES = [
  {
    name: 'Circuito eGym',
    desc: 'Smart Strength con máquinas inteligentes. IA adaptativa, seguimiento de progresos y ajuste automático de resistencia en cada sesión.',
    gradient: null,
    mediaList: [
      { type: 'video', src: egymVideo },
      { type: 'image', src: egym1 },
      { type: 'image', src: egym2 },
      { type: 'image', src: egym3 },
    ],
  },
  {
    name: 'Musculación',
    desc: 'Equipamiento completo: mancuernas, barras, máquinas de cable, cintas de correr y bicicletas. Todo en un solo espacio.',
    gradient: 'linear-gradient(135deg, #3d2b1f 0%, #6b5746 100%)',
    mediaList: [
      { type: 'video', src: bh2Video },
    ],
  },
  {
    name: 'Clases Dirigidas',
    desc: 'Clases de GAP, Spinning, BrisaPump, jiu-jitsu brasileño, entrenamiento funcional, Zumba... Horarios flexibles pensados para tu día a día.',
    gradient: 'linear-gradient(135deg, #7a6858 0%, #af9c82 100%)',
    mediaList: [
      { type: 'image', src: gapImg },
      { type: 'image', src: jiuImg },
      { type: 'image', src: spinningImg },
      { type: 'image', src: zumbaImg },
      { type: 'image', src: absImg },
    ],
  },
  {
    name: 'Recovery & Wellness',
    desc: 'Sauna con infrarrojos, bañera de hielo e hidromasaje.',
    gradient: 'linear-gradient(135deg, #2d1c12 0%, #5f3b2c 100%)',
    mediaList: [
      { type: 'video', src: vsaunaVideo },
    ],
  },
  {
    name: 'Estética',
    desc: 'Cabinas de estética integradas para cuidar tu cuerpo por dentro y por fuera.',
    gradient: 'linear-gradient(135deg, #af9c82 0%, #d4c4b0 100%)',
    mediaList: [
      { type: 'image', src: estetica1Img },
      { type: 'image', src: estetica2Img },
      { type: 'image', src: estetica3Img },
    ],
  },
  {
    name: 'Cafetería',
    desc: 'Batidos de proteínas, açaí bowls, snacks saludables y bebidas. El complemento perfecto para tu entreno.',
    gradient: 'linear-gradient(135deg, #6b4c3b 0%, #af9c82 100%)',
    mediaList: [
      { type: 'image', src: cafe1Img },
      { type: 'image', src: cafe2Img },
      { type: 'image', src: cafe3Img },
    ],
  },
]

export default function Features() {
  const [active, setActive] = useState(0)
  const [bgIdx, setBgIdx] = useState(0)
  const [contentKey, setContentKey] = useState(0)
  const videoRef = useRef(null)

  const { t } = useLang()
  const total = FEATURES.length
  const feature = FEATURES[active]
  const mediaList = feature.mediaList
  const serviceText = t.features.services[active]

  useEffect(() => {
    if (!mediaList.length) return
    const media = mediaList[bgIdx % mediaList.length]

    if (media.type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
      return
    }

    const id = setTimeout(() => {
      setBgIdx(p => (p + 1) % mediaList.length)
    }, 5000)
    return () => clearTimeout(id)
  }, [active, bgIdx]) // eslint-disable-line

  const handleVideoEnded = () => {
    setBgIdx(p => (p + 1) % mediaList.length)
  }

  const go = (dir) => {
    setActive(p => (p + dir + total) % total)
    setBgIdx(0)
    setContentKey(k => k + 1)
  }

  const goTo = (i) => {
    setActive(i)
    setBgIdx(0)
    setContentKey(k => k + 1)
  }

  return (
    <section id="features">
      <div className="f-slide">
        {mediaList.map((media, i) =>
          media.type === 'video' ? (
            <video
              key={`video-${active}`}
              ref={videoRef}
              className={`f-bg-media${i === bgIdx ? ' active' : ''}`}
              src={media.src}
              muted
              playsInline
              loop={mediaList.length === 1}
              onEnded={mediaList.length > 1 ? handleVideoEnded : undefined}
            />
          ) : (
            <img
              key={media.src}
              src={media.src}
              className={`f-bg-media${i === bgIdx ? ' active' : ''}`}
              alt=""
            />
          )
        )}
        {!mediaList.length && (
          <div className="f-bg-solid" style={{ background: feature.gradient }} />
        )}
        <div className="f-overlay" />

        <div className="f-top-label">
          <p className="sec-lbl">{t.features.lbl}</p>
        </div>

        <div className="f-content" key={contentKey}>
          <p className="f-counter">{String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</p>
          <h2 className="f-name">{serviceText.name}</h2>
          <div className="f-divider" />
          <p className="f-desc">{serviceText.desc}</p>
        </div>

        <button className="f-arrow f-prev" onClick={() => go(-1)} aria-label="Anterior">&#8592;</button>
        <button className="f-arrow f-next" onClick={() => go(1)} aria-label="Siguiente">&#8594;</button>

        <div className="f-dots">
          {FEATURES.map((f, i) => (
            <button
              key={i}
              className={`f-dot${i === active ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={f.name}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
