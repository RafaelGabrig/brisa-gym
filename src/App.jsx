import { useEffect } from 'react'
import { LangProvider } from './context/LangContext.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Sobre from './components/Sobre.jsx'
import Features from './components/Features.jsx'
import Ubicacion from './components/Ubicacion.jsx'
import Tarifas from './components/Tarifas.jsx'
import Inscripcion from './components/Inscripcion.jsx'
import Footer from './components/Footer.jsx'
import useScrollReveal from './hooks/useScrollReveal.js'

export default function App() {
  useScrollReveal()

  return (
    <LangProvider>
      <Nav />
      <main>
        <Hero />
        <Sobre />
        <Features />
        <Ubicacion />
        <Tarifas />
        <Inscripcion />
      </main>
      <Footer />
    </LangProvider>
  )
}
