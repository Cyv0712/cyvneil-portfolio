import { Fragment } from 'react'

function MarqueeItemGroup({ items, groupKey, ariaHidden = false }) {
  return (
    <div
      className="marquee-item font-lol text-sm uppercase tracking-[0.2em] md:text-base"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item, index) => (
        <Fragment key={`${groupKey}-${item}`}>
          <span className={index % 2 === 0 ? 'text-glow-blue' : 'text-glow-gold'}>{item}</span>
          <span className="text-[#c8aa6e] opacity-40" aria-hidden="true">
            ✦
          </span>
        </Fragment>
      ))}
    </div>
  )
}

export default function TechMarquee({ items }) {
  return (
    <section
      className="marquee-container shadow-[0_0_15px_rgba(200,170,110,0.1)]"
      aria-label="Technologies"
    >
      <div className="marquee-track">
        <MarqueeItemGroup items={items} groupKey="a" />
        <MarqueeItemGroup items={items} groupKey="b" ariaHidden />
      </div>
    </section>
  )
}
