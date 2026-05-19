import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'

import DeferredSection from './components/DeferredSection.jsx'
import RevealBlock from './components/RevealBlock.jsx'
import SectionDivider from './components/SectionDivider.jsx'
import SectionHeading from './components/SectionHeading.jsx'
import TechMarquee from './components/TechMarquee.jsx'
import Typewriter from './components/Typewriter.jsx'
import { siteContent } from './content/siteContent.js'
import {
  useCoarsePointer,
  useDisableScrollAnimations,
  useReducedMotion,
} from './hooks/useReducedMotion.js'
import {
  getActiveSectionId,
  scrollToSectionById,
} from './utils/scrollToSection.js'

// Code-split heavy sections so the initial bundle only ships the hero scaffold
// and lightweight chrome. The chunks get fetched on demand as the user scrolls.
const AboutCardsStack = lazy(() => import('./components/AboutCardsStack.jsx'))
const ProjectsSection = lazy(() => import('./components/ProjectsSection.jsx'))
const EducationStackSection = lazy(() => import('./components/EducationStackSection.jsx'))
const ContactSection = lazy(() => import('./components/ContactSection.jsx'))
const FooterSignal = lazy(() => import('./components/FooterSignal.jsx'))

const observedSections = siteContent.navigation.map((link) => link.href.slice(1))

function SectionFallback({ minHeight = '60vh' }) {
  return <div className="section-skeleton" style={{ minHeight }} aria-hidden="true" />
}

function App() {
  const prefersReducedMotion = useReducedMotion()
  const disableScrollAnimations = useDisableScrollAnimations()
  const isCoarsePointer = useCoarsePointer()
  const introTimersRef = useRef([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [systemStatus, setSystemStatus] = useState(siteContent.intro.initialStatus)
  const [accessGranted, setAccessGranted] = useState(false)
  const [gatesOpen, setGatesOpen] = useState(false)
  const [zoomPast, setZoomPast] = useState(false)
  const [mainLoaded, setMainLoaded] = useState(false)
  const [showOverlay, setShowOverlay] = useState(true)
  const [activeSection, setActiveSection] = useState('about')
  const [navScrolled, setNavScrolled] = useState(false)
  const [heroShift, setHeroShift] = useState({ x: 0, y: 0 })

  const clearIntroTimers = useCallback(() => {
    introTimersRef.current.forEach((timer) => window.clearTimeout(timer))
    introTimersRef.current = []
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const frame = requestAnimationFrame(() => window.scrollTo(0, 0))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    document.title = siteContent.site.title

    if (prefersReducedMotion) {
      introTimersRef.current = [
        window.setTimeout(() => {
          setSystemStatus(siteContent.intro.calibratingStatus)
        }, 350),
        window.setTimeout(() => {
          setSystemStatus(siteContent.intro.readyStatus)
          setAccessGranted(true)
        }, 1400),
        window.setTimeout(() => {
          setGatesOpen(true)
          setZoomPast(true)
          setMainLoaded(true)
        }, 2550),
        window.setTimeout(() => {
          setShowOverlay(false)
        }, 3400),
      ]

      return () => {
        clearIntroTimers()
      }
    }

    introTimersRef.current = [
      window.setTimeout(() => {
        setSystemStatus(siteContent.intro.calibratingStatus)
      }, 1050),
      window.setTimeout(() => {
        setSystemStatus(siteContent.intro.readyStatus)
        setAccessGranted(true)
      }, 2250),
      window.setTimeout(() => {
        setGatesOpen(true)
        setZoomPast(true)
        setMainLoaded(true)
      }, 3400),
      window.setTimeout(() => {
        setShowOverlay(false)
      }, 4300),
    ]

    return () => {
      clearIntroTimers()
    }
  }, [clearIntroTimers, prefersReducedMotion])

  const updateActiveSection = useCallback(() => {
    setActiveSection(getActiveSectionId(observedSections, { heroFallback: 'about' }))
  }, [])

  useEffect(() => {
    let rafId = 0

    const onScrollOrResize = () => {
      if (rafId) {
        return
      }
      rafId = requestAnimationFrame(() => {
        rafId = 0
        setNavScrolled(window.scrollY > 24)
        updateActiveSection()
      })
    }

    onScrollOrResize()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [updateActiveSection])

  useEffect(() => {
    if (!prefersReducedMotion && !mainLoaded) {
      return undefined
    }

    const frame = requestAnimationFrame(() => {
      updateActiveSection()
    })

    return () => cancelAnimationFrame(frame)
  }, [mainLoaded, prefersReducedMotion, updateActiveSection])

  const handleSectionLinkClick = useCallback(
    (event, href) => {
      event.preventDefault()

      const sectionId = href.replace(/^#/, '')

      const smooth = !prefersReducedMotion

      scrollToSectionById(sectionId, {
        smooth,
        onComplete: updateActiveSection,
      })

      if (!smooth) {
        updateActiveSection()
      } else {
        setActiveSection(sectionId)
      }

      setMenuOpen(false)
    },
    [prefersReducedMotion, updateActiveSection],
  )

  // Mouse-only parallax is meaningless on touch devices (and ChromeOS-style
  // hover emulation can also cause jitter), so we skip the handler entirely.
  const heroParallaxEnabled = !prefersReducedMotion && !isCoarsePointer

  const handleHeroMove = (event) => {
    if (!heroParallaxEnabled) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const nextX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 28
    const nextY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 18

    setHeroShift({ x: nextX, y: nextY })
  }

  const resetHeroMove = () => {
    if (!heroParallaxEnabled) {
      return
    }
    setHeroShift({ x: 0, y: 0 })
  }

  const cinematicReady = prefersReducedMotion || mainLoaded

  return (
    <div className="antialiased">
      {showOverlay ? (
        <div id="intro-overlay" className={gatesOpen ? 'gates-open' : ''}>
          <div className="gate gate-top" />
          <div className="gate gate-bottom" />

          <div id="intro-content" className={`intro-content ${zoomPast ? 'zoom-past' : ''}`}>
            <div className="intro-label">{siteContent.intro.label}</div>
            <h1 className="intro-name font-lol">{siteContent.site.ownerName}</h1>
            <div className="loading-container">
              <div className="loading-bar" />
            </div>
            <div className={`system-status ${accessGranted ? 'system-status-ready' : ''}`}>
              {systemStatus}
            </div>
          </div>
        </div>
      ) : null}

      <div
        id="main-content"
        className={`relative z-0 flex min-h-screen flex-col ${cinematicReady ? 'loaded' : ''}`}
      >
        <nav className={`sticky top-0 z-50 w-full px-6 py-4 backdrop-blur-sm ${navScrolled ? 'nav-scrolled' : ''}`}>
          <div className="mx-auto flex max-w-7xl items-center justify-end md:justify-center">
            <div className="hidden space-x-8 text-sm tracking-widest md:flex font-lol">
              {siteContent.navigation.map((link) => {
                const sectionId = link.href.slice(1)
                const isActive = activeSection === sectionId

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(event) => handleSectionLinkClick(event, link.href)}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>

            <button
              type="button"
              className="text-[#c8aa6e] transition-colors hover:text-[#0ac8b9] md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {menuOpen ? (
            <div className="mx-auto mt-4 max-w-7xl rounded-2xl border border-[#c8aa6e]/25 bg-[#010a13]/95 p-4 md:hidden">
              <div className="flex flex-col gap-4 text-sm tracking-[0.3em] uppercase font-lol">
                {siteContent.navigation.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`nav-link w-fit ${activeSection === link.href.slice(1) ? 'nav-link-active' : ''}`}
                    onClick={(event) => handleSectionLinkClick(event, link.href)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </nav>

        <section
          id="home"
          className="hero-shell relative flex items-center justify-center px-6 py-12"
          onMouseMove={handleHeroMove}
          onMouseLeave={resetHeroMove}
          style={{
            '--hero-shift-x': `${heroShift.x}px`,
            '--hero-shift-y': `${heroShift.y}px`,
          }}
        >
          <div className="hero-scene" aria-hidden="true">
            <div className="hero-grid" />
            <div className="hero-orbit hero-orbit-outer" />
            <div className="hero-orbit hero-orbit-middle" />
            <div className="hero-orbit hero-orbit-inner" />
            <div className="hero-core-glow" />
            <svg viewBox="0 0 100 100" className="hero-hex">
              <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <polygon points="50,15 85,30 85,70 50,85 15,70 15,30" fill="none" stroke="currentColor" strokeWidth="0.24" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="#c8aa6e" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="hero-content z-10 mx-auto max-w-5xl text-center">
            <p
              className={`hero-sequence-item font-lol mb-4 text-sm tracking-[0.3em] text-glow-blue uppercase md:text-base ${cinematicReady ? 'hero-sequence-ready' : ''
                }`}
              style={{ transitionDelay: '40ms' }}
            >
              {siteContent.hero.eyebrow}
            </p>
            <h1
              className={`hero-name hero-sequence-item font-lol mb-5 bg-gradient-to-b from-[#f0e6d2] to-[#c8aa6e] bg-clip-text font-black text-transparent ${cinematicReady ? 'hero-sequence-ready' : ''
                }`}
              style={{ transitionDelay: '130ms' }}
            >
              <Typewriter text={siteContent.site.ownerName} speed={80} start={cinematicReady} />
            </h1>
            <p
              className={`hero-sequence-item font-lol mb-6 text-lg tracking-[0.3em] text-glow-blue uppercase md:text-2xl ${cinematicReady ? 'hero-sequence-ready' : ''
                }`}
              style={{ transitionDelay: '210ms' }}
            >
              {siteContent.hero.title.prefix}{' '}
              <span className="text-glow-gold">{siteContent.hero.title.accent}</span>{' '}
              {siteContent.hero.title.suffix}
            </p>
            <p
              className={`hero-sequence-item hero-description mx-auto mb-10 max-w-3xl text-lg leading-relaxed ${cinematicReady ? 'hero-sequence-ready' : ''
                }`}
              style={{ transitionDelay: '300ms' }}
            >
              {siteContent.hero.description}
            </p>

            <div
              className={`hero-sequence-item flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 ${cinematicReady ? 'hero-sequence-ready' : ''
                }`}
              style={{ transitionDelay: '380ms' }}
            >
              <a
                href={siteContent.hero.primaryCta.href}
                className="hex-button w-full max-w-xs px-6 py-3 text-center text-sm font-bold font-lol sm:w-auto sm:px-8"
                onClick={(event) => handleSectionLinkClick(event, siteContent.hero.primaryCta.href)}
              >
                {siteContent.hero.primaryCta.label}
              </a>
              <a
                href={siteContent.hero.secondaryCta.href}
                className="hero-secondary-cta group relative w-full max-w-xs overflow-hidden border border-[#0ac8b9] px-6 py-3 text-center text-sm font-bold text-[#0ac8b9] transition-all duration-300 hover:bg-[#0ac8b9] hover:text-[#010a13] hover:shadow-[0_0_15px_rgba(10,200,185,0.6)] font-lol sm:w-auto sm:px-8"
                onClick={(event) => handleSectionLinkClick(event, siteContent.hero.secondaryCta.href)}
              >
                <span className="relative z-10">{siteContent.hero.secondaryCta.label}</span>
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          {disableScrollAnimations ? (
            <div className="pt-12 pb-16 md:pt-16 md:pb-20">
              <RevealBlock className="mx-auto max-w-6xl px-6 text-center" disabled={prefersReducedMotion}>
                <SectionHeading centered className="mb-10 md:mb-12">
                  {siteContent.about.heading}
                </SectionHeading>
              </RevealBlock>
              <TechMarquee items={siteContent.marquee.items} />
              <div className="mx-auto mt-12 max-w-6xl px-6">
                <div className="about-cards-grid">
                  {siteContent.about.cards.map((card, index) => (
                    <RevealBlock
                      key={card.title}
                      className="about-card hex-border-box p-6 text-left md:p-8"
                      delay={Math.min(index * 80, 240)}
                      disabled={prefersReducedMotion}
                    >
                      <h3 className="about-card-title font-lol text-lg tracking-[0.2em] text-glow-gold uppercase md:text-xl">
                        {card.title}
                      </h3>
                      <p className="about-card-description mt-4 text-base leading-8 text-[#a09b8c]">
                        {card.description}
                      </p>
                    </RevealBlock>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <DeferredSection rootMargin="800px 0px" minHeight="100vh">
              <Suspense fallback={<SectionFallback minHeight="100vh" />}>
                <AboutCardsStack
                  cards={siteContent.about.cards}
                  heading={siteContent.about.heading}
                  marqueeItems={siteContent.marquee.items}
                />
              </Suspense>
            </DeferredSection>
          )}
        </section>

        <SectionDivider />

        <DeferredSection rootMargin="1200px 0px" minHeight="100vh">
          <Suspense fallback={<SectionFallback minHeight="100vh" />}>
            <ProjectsSection
              projectsMeta={siteContent.projects}
              prefersReducedMotion={disableScrollAnimations}
            />
          </Suspense>
        </DeferredSection>

        <SectionDivider />

        <DeferredSection rootMargin="600px 0px" minHeight="60vh">
          <Suspense fallback={<SectionFallback minHeight="60vh" />}>
            <EducationStackSection
              education={siteContent.education}
              skills={siteContent.skills}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>
        </DeferredSection>

        <SectionDivider />

        <DeferredSection rootMargin="600px 0px" minHeight="50vh">
          <Suspense fallback={<SectionFallback minHeight="50vh" />}>
            <ContactSection
              contact={siteContent.contact}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Suspense>
        </DeferredSection>

        <footer className="site-footer mt-auto border-t border-[#c8aa6e]/20 bg-[#010a13] py-8 text-center">
          <DeferredSection rootMargin="400px 0px" minHeight="3rem">
            <Suspense fallback={<div style={{ minHeight: '3rem' }} aria-hidden="true" />}>
              <FooterSignal items={siteContent.footer.signal} />
            </Suspense>
          </DeferredSection>
          <p className="font-lol text-sm tracking-widest text-[#a09b8c]">
            <span className="text-glow-gold">{siteContent.site.brand}</span> &copy;{' '}
            {siteContent.site.year}. {siteContent.footer.suffix}
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
