import { useLayoutEffect, useMemo, useRef, useState } from 'react'

import SectionHeading from './SectionHeading.jsx'
import TechMarquee from './TechMarquee.jsx'
import { ensureNormalizedScroll, gsap } from '../utils/gsapSetup.js'

const OFFSET_Y = 36
const SCALE_STEP = 0.05
const OPACITY_STEP = 0.16
// Hold the pin a bit longer after the last card lands before releasing scroll.
const END_DWELL = 0.5

function getStackedState(positionFromTop, total) {
  return {
    y: positionFromTop * OFFSET_Y,
    scale: 1 - positionFromTop * SCALE_STEP,
    opacity: 1 - positionFromTop * OPACITY_STEP,
    zIndex: total - positionFromTop,
  }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function AboutCardsStack({ cards, heading, marqueeItems }) {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  // Stable per-index ref callbacks so React doesn't detach / reattach refs
  // every render (which the previous implementation was doing by clearing
  // cardRefs.current = [] in the component body).
  const setCardRef = useMemo(
    () =>
      cards.map((_, index) => (el) => {
        cardRefs.current[index] = el
      }),
    [cards],
  )

  useLayoutEffect(() => {
    ensureNormalizedScroll()

    const section = sectionRef.current
    const cardEls = cardRefs.current.filter(Boolean)

    if (!section || cardEls.length < 2) {
      return undefined
    }

    const total = cardEls.length
    const totalDuration = total - 1 + END_DWELL

    // gsap.context scopes every animation, tween, ScrollTrigger, and inline
    // style mutation made inside the callback. ctx.revert() kills all of them
    // on cleanup, which is the recommended pattern for avoiding leaks.
    const ctx = gsap.context(() => {
      cardEls.forEach((card, i) => {
        gsap.set(card, getStackedState(i, total))
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          pinType: 'fixed',
          anticipatePin: 1,
          start: 'top top',
          end: () => `+=${window.innerHeight * totalDuration}`,
          scrub: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: 'pinned-sections',
          onUpdate: (self) => {
            const animationProgress = Math.min(
              1,
              (self.progress * totalDuration) / (total - 1),
            )
            const idx = Math.min(
              total - 1,
              Math.max(0, Math.round(animationProgress * (total - 1))),
            )
            setActiveIndex((prev) => (prev === idx ? prev : idx))
          },
        },
      })

      const visualOrder = cardEls.map((_, i) => i)

      for (let phase = 0; phase < total - 1; phase += 1) {
        const leavingIdx = visualOrder[0]
        const leavingCard = cardEls[leavingIdx]
        const backState = getStackedState(total - 1, total)

        tl.to(
          leavingCard,
          {
            keyframes: [
              { y: '+=260', scale: 0.86, opacity: 0.35, duration: 0.55 },
              {
                y: backState.y,
                scale: backState.scale,
                opacity: backState.opacity,
                duration: 0.45,
              },
            ],
            ease: 'power2.inOut',
          },
          phase,
        )

        tl.set(leavingCard, { zIndex: backState.zIndex }, phase + 0.55)

        for (let pos = 1; pos < total; pos += 1) {
          const cardIdx = visualOrder[pos]
          const card = cardEls[cardIdx]
          const target = getStackedState(pos - 1, total)
          tl.to(
            card,
            {
              y: target.y,
              scale: target.scale,
              opacity: target.opacity,
              duration: 1,
              ease: 'power2.inOut',
            },
            phase,
          )
          tl.set(card, { zIndex: target.zIndex }, phase + 0.5)
        }

        visualOrder.push(visualOrder.shift())
      }

      tl.to({}, { duration: END_DWELL })
    }, section)

    return () => {
      ctx.revert()
    }
  }, [cards.length])

  const total = cards.length

  return (
    <div ref={sectionRef} className="about-stack-viewport">
      {heading ? (
        <div className="about-stack-header">
          <SectionHeading centered>{heading}</SectionHeading>
        </div>
      ) : null}

      {marqueeItems && marqueeItems.length > 0 ? (
        <div className="about-stack-marquee">
          <TechMarquee items={marqueeItems} />
        </div>
      ) : null}

      <div className="about-stack-arena">
        <div className="about-stack">
          {cards.map((card, index) => (
            <article
              key={card.title}
              ref={setCardRef[index]}
              className="about-stack-card hex-border-box"
              data-stack-index={index}
            >
              <h3 className="about-card-title font-lol text-lg tracking-[0.2em] text-glow-gold uppercase md:text-xl">
                {card.title}
              </h3>
              <p className="about-card-description mt-4 text-base leading-8 text-[#a09b8c]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="about-stack-counter font-lol" aria-live="polite">
        <span className="about-stack-counter-current text-glow-gold">
          {pad(activeIndex + 1)}
        </span>
        <span className="about-stack-counter-divider">/</span>
        <span className="about-stack-counter-total">{pad(total)}</span>
      </div>
    </div>
  )
}
