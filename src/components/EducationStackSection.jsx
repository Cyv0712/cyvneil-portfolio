import RevealBlock from './RevealBlock.jsx'
import SectionHeading from './SectionHeading.jsx'

function AcademicIcon() {
  return (
    <svg className="h-12 w-12 text-[#0ac8b9] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        d="M12 14 3 9l9-5 9 5-9 5Zm0 0 6.16-3.422A12.083 12.083 0 0 1 18 13.5C18 16.538 15.314 19 12 19s-6-2.462-6-5.5c0-.994.288-1.927.84-2.922L12 14Z"
      />
    </svg>
  )
}

export default function EducationStackSection({ education, skills, prefersReducedMotion }) {
  return (
    <RevealBlock
      as="section"
      id="education"
      className="skills-section px-6 py-20"
      disabled={prefersReducedMotion}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <SectionHeading centered>Education and Core Stack</SectionHeading>
        </div>

        <div className="education-subsection">
          <p className="font-lol mb-8 text-center text-xs tracking-[0.45em] text-glow-blue uppercase">
            {education.heading}
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {education.items.map((item, index) => (
              <RevealBlock
                key={`${item.title}-${item.subtitle}`}
                className="hex-border-box p-6 text-center"
                delay={Math.min(index * 70, 210)}
                disabled={prefersReducedMotion}
              >
                <div className="mb-4 flex justify-center">
                  <AcademicIcon />
                </div>
                {item.meta ? (
                  <p className="font-lol text-xs tracking-[0.3em] text-glow-blue uppercase">
                    {item.meta}
                  </p>
                ) : null}
                <h3 className="font-lol mt-3 text-lg tracking-wide text-[#f0e6d2] uppercase">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#a09b8c]">{item.subtitle}</p>
              </RevealBlock>
            ))}
          </div>
        </div>

        <div className="education-stack-divider my-16" aria-hidden="true" />

        <div className="stack-subsection">
          <p className="font-lol mb-3 text-center text-xs tracking-[0.45em] text-glow-blue uppercase">
            {skills.heading}
          </p>
          <p className="mx-auto mb-10 max-w-3xl text-center text-base leading-8 text-[#a09b8c]">
            {skills.description}
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.groups.map((group, index) => (
              <RevealBlock
                key={group.title}
                className={`hex-border-box p-6 ${group.title === 'Tools' ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                delay={Math.min(index * 70, 210)}
                disabled={prefersReducedMotion}
              >
                <p className="font-lol text-center text-sm tracking-[0.3em] text-glow-gold uppercase">
                  {group.title}
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="skill-tag rounded-lg border border-[#0ac8b9]/40 bg-[#0ac8b9]/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#f0e6d2]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </RevealBlock>
  )
}
