import { useState, useRef, useEffect } from 'react'
import './ChatWidget.css'

const API_KEY = import.meta.env.VITE_CLAUDE_API_KEY

const SYSTEM_PROMPT = `Eres la asistente virtual de Brisa Gym, un gimnasio premium en Gran Alacant (Alicante, España).
Apertura: julio 2026
Dirección: Av. Escandinavia 72, Gran Alacant
Servicios: Circuito eGym Smart Strength (12 máquinas), musculación, clases (yoga/pilates/spinning/HIIT), Recovery & Wellness, estética, cafetería
Contacto: brisagym.alc@gmail.com
Pre-inscripción disponible — condiciones especiales de lanzamiento
Responde en español, amable y conciso (máx 2-3 frases). Precios: "Se anunciarán próximos a la apertura".`

const QUICK_QUESTIONS = [
  { label: 'Servicios', q: '¿Qué servicios tendréis?' },
  { label: 'Apertura', q: '¿Cuándo abrís?' },
  { label: 'eGym', q: '¿Cómo funciona el eGym?' },
  { label: 'Pre-inscripción', q: '¿Cómo me pre-inscribo?' },
]

function TypingIndicator() {
  return (
    <div className="mw assistant">
      <div className="typing">
        <span /><span /><span />
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '¡Hola! Soy la asistente virtual de Brisa Gym. Estoy aquí para responder todas tus dudas. ¿En qué puedo ayudarte? 🌿' },
  ])
  const [typing, setTyping] = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const msgsRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  }, [messages, typing])

  useEffect(() => {
    if (open && inputRef.current) setTimeout(() => inputRef.current.focus(), 100)
  }, [open])

  async function sendMessage(text) {
    if (!text.trim()) return
    const userMsg = { role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setShowQuick(false)
    setTyping(true)

    const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.text }))

    let reply = 'No pude procesar tu mensaje. Inténtalo de nuevo.'
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-allow-browser': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 400,
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      })
      const data = await res.json()
      if (data.content?.[0]?.text) reply = data.content[0].text
    } catch (_) {
      reply = 'Error de conexión. Por favor, inténtalo de nuevo.'
    }

    setTyping(false)
    setMessages(prev => [...prev, { role: 'assistant', text: reply }])
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      <button
        id="chat-btn"
        title="Asistente Brisa AI"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Cerrar chat' : 'Abrir chat'}
      >
        <span>{open ? '✕' : '💬'}</span>
      </button>

      {open && (
        <div id="chat-panel">
          <div className="ch-head">
            <div className="ch-av">🌿</div>
            <div>
              <div className="ch-name">Asistente Brisa</div>
              <div className="ch-powered">Powered by Claude · Anthropic</div>
            </div>
          </div>

          <div className="ch-msgs" id="msgs" ref={msgsRef}>
            {messages.map((m, i) => (
              <div key={i} className={`mw ${m.role}`}>
                <div className="mb">{m.text}</div>
              </div>
            ))}
            {typing && <TypingIndicator />}
          </div>

          {showQuick && (
            <div className="ch-quick">
              {QUICK_QUESTIONS.map(({ label, q }) => (
                <button key={label} className="qb" onClick={() => sendMessage(q)}>{label}</button>
              ))}
            </div>
          )}

          <div className="ch-input-row">
            <input
              ref={inputRef}
              className="ch-input"
              type="text"
              placeholder="Escribe tu pregunta..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="ch-send"
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  )
}
