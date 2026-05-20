import RevealBlock from './RevealBlock.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function ContactSection({ contact, prefersReducedMotion }) {
  return (
    <RevealBlock as="section" className="px-6 py-20" disabled={prefersReducedMotion}>
      <div className="contact-shell mx-auto max-w-5xl p-10 text-center">
        <SectionHeading centered>{contact.heading}</SectionHeading>
        <p className="mx-auto mt-6 max-w-3xl leading-8 text-[#a09b8c]">
          {contact.description}
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {contact.highlights.map((highlight, index) => (
            <RevealBlock
              key={highlight.label}
              className="contact-highlight-panel rounded-2xl border border-[#c8aa6e]/18 bg-[#091428]/55 p-5 text-left"
              delay={Math.min(index * 70, 210)}
              disabled={prefersReducedMotion}
            >
              <p className="font-lol text-xs tracking-[0.3em] text-glow-blue uppercase">
                {highlight.label}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#f0e6d2]">{highlight.value}</p>
            </RevealBlock>
          ))}
        </div>

        <a
          href={`mailto:${contact.primaryEmail}`}
          className="hex-button hex-button-email mt-10 inline-block max-w-full px-4 py-3 text-xs font-bold font-lol sm:px-8 sm:text-sm"
        >
          {contact.primaryEmail}
        </a>

        <div className="contact-method-row mx-auto mt-8 max-w-3xl">
          {contact.methods.map((method) => {
            const content = (
              <>
                <p className="font-lol text-xs tracking-[0.3em] text-glow-blue uppercase">
                  {method.label}
                </p>
                <p className="mt-2 text-sm text-[#f0e6d2]">{method.value}</p>
              </>
            )

            if (method.href) {
              return (
                <a
                  key={method.label}
                  href={method.href}
                  className="contact-method-pill rounded-xl border border-[#c8aa6e]/18 bg-[#091428]/50 px-4 py-4 text-left transition-colors duration-300 hover:border-[#0ac8b9]/35 hover:bg-[#091428]/75"
                >
                  {content}
                </a>
              )
            }

            return (
              <div
                key={method.label}
                className="contact-method-pill rounded-xl border border-[#c8aa6e]/18 bg-[#091428]/50 px-4 py-4 text-left"
              >
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </RevealBlock>
  )
}
