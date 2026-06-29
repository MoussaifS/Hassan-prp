import { Analytics } from '@vercel/analytics/react'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Impact from './components/Impact.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import FloatingCTA from './components/FloatingCTA.jsx'

export default function App() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Impact />
      <Contact />
      <Footer />
      <FloatingCTA />
      <Analytics />
    </>
  )
}
