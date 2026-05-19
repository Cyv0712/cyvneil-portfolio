import { useLayoutEffect, useRef } from 'react'

import RevealBlock from './RevealBlock.jsx'
import SectionHeading from './SectionHeading.jsx'
import ProjectPreviewPanel from './ProjectPreviewPanel.jsx'
import { projectItems } from '../content/projectsData.js'
import { scrollToSectionById } from '../utils/scrollToSection.js'
import { ensureNormalizedScroll, gsap } from '../utils/gsapSetup.js'

function DashboardIcon() {
  return (
    <svg className="h-16 w-16 text-[#0ac8b9] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M9.75 17 9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
      />
    </svg>
  )
}

function DeviceIcon() {
  return (
    <svg className="h-16 w-16 text-[#0ac8b9] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M12 18h.01M8 21h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z"
      />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg className="h-16 w-16 text-[#0ac8b9] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c1.657 0 3 4.03 3 9s-1.343 9-3 9m0-18c-1.657 0-3 4.03-3 9s1.343 9 3 9"
      />
    </svg>
  )
}

const projectIcons = {
  dashboard: DashboardIcon,
  device: DeviceIcon,
  globe: GlobeIcon,
}

function ProjectCard({ project }) {
  const Icon = projectIcons[project.icon] ?? GlobeIcon

  return (
    <article className="projects-horizontal-card hex-border-box">
      <div className="projects-horizontal-preview">
        <ProjectPreviewPanel project={project} fallback={<Icon />} staticMode />
      </div>

      <div className="projects-horizontal-details">
        <h3 className="projects-horizontal-title font-lol">{project.title}</h3>
        <p className="projects-horizontal-role">{project.role} | {project.organization}</p>
        <p className="projects-horizontal-description">{project.description}</p>
        <p className="projects-horizontal-proof">{project.proof}</p>

        <div className="projects-horizontal-tech">
          {project.tech.map((item) => (
            <span key={item} className="projects-horizontal-tech-pill">
              {item}
            </span>
          ))}
        </div>

        <div className="projects-horizontal-actions">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="projects-horizontal-live-button">
              Live Site
            </a>
          ) : null}
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="projects-horizontal-repo-button">
              Repository
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

function ProjectsFallbackList({ projects }) {
  return (
    <div className="projects-fallback-list">
      {projects.map((project) => {
        const Icon = projectIcons[project.icon] ?? GlobeIcon

        return (
          <article key={project.slug} className="projects-fallback-card hex-border-box">
            <div className="projects-fallback-preview">
              <ProjectPreviewPanel project={project} fallback={<Icon />} staticMode />
            </div>

            <div className="projects-fallback-details">
              <h3 className="projects-fallback-title font-lol">{project.title}</h3>
              <p className="projects-fallback-role">{project.role} | {project.organization}</p>
              <p className="projects-fallback-description">{project.description}</p>
              <p className="projects-fallback-proof">{project.proof}</p>

              <div className="projects-fallback-tech">
                {project.tech.map((item) => (
                  <span key={item} className="projects-fallback-tech-pill">
                    {item}
                  </span>
                ))}
              </div>

              <ul className="projects-fallback-impact-list">
                {project.impact.map((item) => (
                  <li key={item} className="projects-fallback-impact-item">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="projects-fallback-actions">
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="projects-fallback-live-button">
                    Live Site
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="projects-fallback-repo-button">
                    Repository
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function HorizontalProjects({ projects, heading, viewAllHref, viewAllLabel }) {
  const pinRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    ensureNormalizedScroll()

    const pinned = pinRef.current
    const track = trackRef.current

    if (!pinned || !track) {
      return undefined
    }

    // gsap.context scopes the tween + ScrollTrigger to `pinned`; ctx.revert()
    // tears them down on unmount and removes any inline styles GSAP applied.
    const ctx = gsap.context(() => {
      const getDistance = () => {
        const cards = Array.from(track.children)

        if (cards.length === 0) {
          return 0
        }

        const lastCard = cards[cards.length - 1]
        const trackRect = track.getBoundingClientRect()
        const lastCardRect = lastCard.getBoundingClientRect()
        const lastCardLeftInTrack = lastCardRect.left - trackRect.left
        const lastCardCenter = lastCardLeftInTrack + lastCardRect.width / 2
        const viewportCenter = window.innerWidth / 2

        return Math.max(0, lastCardCenter - viewportCenter)
      }

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinned,
          pin: true,
          pinSpacing: true,
          pinType: 'fixed',
          anticipatePin: 1,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: 'pinned-sections',
        },
      })
    }, pinned)

    return () => {
      ctx.revert()
    }
  }, [projects.length])

  return (
    <div ref={pinRef} className="projects-horizontal-viewport">
      <div className="projects-horizontal-header">
        <SectionHeading centered>{heading}</SectionHeading>
      </div>

      <div className="projects-horizontal-stage">
        <div ref={trackRef} className="projects-horizontal-track">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      <a
        href={viewAllHref}
        className="projects-horizontal-cta relative inline-block text-sm tracking-widest text-[#c8aa6e] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-[#c8aa6e] after:transition-colors hover:text-glow-blue hover:after:bg-[#0ac8b9] font-lol"
        onClick={(event) => {
          event.preventDefault()
          scrollToSectionById(viewAllHref.replace(/^#/, ''), {
            smooth: true,
          })
        }}
      >
        {viewAllLabel}
      </a>
    </div>
  )
}

export default function ProjectsSection({ projectsMeta, prefersReducedMotion }) {
  const projects = projectItems

  if (prefersReducedMotion) {
    return (
      <section id="projects" className="projects-section relative border-y border-[#c8aa6e]/20 bg-[#091428]/40 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <RevealBlock className="mb-16 text-center" disabled>
            <SectionHeading centered>{projectsMeta.heading}</SectionHeading>
          </RevealBlock>

          <ProjectsFallbackList projects={projects} />

          <RevealBlock className="mt-12 text-center" disabled>
            <a
              href={projectsMeta.viewAllHref}
              className="relative inline-block text-sm tracking-widest text-[#c8aa6e] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-[#c8aa6e] after:transition-colors hover:text-glow-blue hover:after:bg-[#0ac8b9] font-lol"
              onClick={(event) => {
                event.preventDefault()
                scrollToSectionById(projectsMeta.viewAllHref.replace(/^#/, ''), {
                  smooth: false,
                })
              }}
            >
              {projectsMeta.viewAllLabel}
            </a>
          </RevealBlock>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="projects-section relative border-y border-[#c8aa6e]/20 bg-[#091428]/40">
      <HorizontalProjects
        projects={projects}
        heading={projectsMeta.heading}
        viewAllHref={projectsMeta.viewAllHref}
        viewAllLabel={projectsMeta.viewAllLabel}
      />
    </section>
  )
}
