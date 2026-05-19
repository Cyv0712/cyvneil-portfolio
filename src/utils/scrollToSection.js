const DEFAULT_OFFSET = 96

let activeSmoothScrollCancel = null

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - (-2 * progress + 2) ** 3 / 2
}

function getSmoothScrollDuration(distance) {
  return Math.min(1100, Math.max(520, Math.abs(distance) * 0.45))
}

function cancelActiveSmoothScroll() {
  activeSmoothScrollCancel?.()
  activeSmoothScrollCancel = null
}

function smoothScrollTo(targetTop, { onComplete } = {}) {
  cancelActiveSmoothScroll()

  const startTop = window.scrollY
  const distance = targetTop - startTop

  if (Math.abs(distance) < 2) {
    window.scrollTo(0, targetTop)
    onComplete?.()
    return
  }

  const duration = getSmoothScrollDuration(distance)
  const startTime = performance.now()
  let frameId = 0

  const step = (now) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const nextTop = startTop + distance * easeInOutCubic(progress)

    window.scrollTo(0, nextTop)

    if (progress < 1) {
      frameId = requestAnimationFrame(step)
      return
    }

    window.scrollTo(0, targetTop)
    activeSmoothScrollCancel = null
    onComplete?.()
  }

  activeSmoothScrollCancel = () => {
    cancelAnimationFrame(frameId)
    activeSmoothScrollCancel = null
  }

  frameId = requestAnimationFrame(step)
}

function getNavScrollOffset() {
  const nav = document.querySelector('nav')

  if (!nav) {
    return DEFAULT_OFFSET
  }

  return Math.ceil(nav.getBoundingClientRect().height) + 12
}

function getSectionDocumentTop(section) {
  return section.getBoundingClientRect().top + window.scrollY
}

// Used for the active-nav-link calculation. Sits roughly a third of the way
// down the viewport so a section "lights up" the moment its top enters view,
// not only after it slides under the nav bar.
function getActiveSectionMarker() {
  const navOffset = getNavScrollOffset()
  const viewportTrigger = window.innerHeight * 0.35
  return window.scrollY + Math.max(navOffset, viewportTrigger)
}

export function getActiveSectionId(sectionIds, { heroFallback = 'about' } = {}) {
  const offset = getNavScrollOffset()
  const marker = getActiveSectionMarker()
  const viewportBottom = window.scrollY + window.innerHeight
  const pageBottom = document.documentElement.scrollHeight
  const lastSectionId = sectionIds[sectionIds.length - 1]

  if (lastSectionId && viewportBottom >= pageBottom - 48) {
    return lastSectionId
  }

  let current = ''

  for (const sectionId of sectionIds) {
    const section = document.getElementById(sectionId)

    if (!section) {
      continue
    }

    if (getSectionDocumentTop(section) <= marker + 4) {
      current = sectionId
    }
  }

  if (lastSectionId) {
    const lastSection = document.getElementById(lastSectionId)

    if (lastSection) {
      const { top, bottom } = lastSection.getBoundingClientRect()

      if (top <= offset + 12 && bottom > offset) {
        return lastSectionId
      }
    }
  }

  if (!current && heroFallback) {
    const fallbackSection = document.getElementById(heroFallback)

    if (fallbackSection && getSectionDocumentTop(fallbackSection) > marker) {
      return heroFallback
    }
  }

  return current
}

export function scrollToSectionById(sectionId, { smooth = true, onComplete } = {}) {
  const scrollTargetId = sectionId === 'about' ? 'home' : sectionId
  const section = document.getElementById(scrollTargetId)

  if (!section) {
    return false
  }

  const offset = getNavScrollOffset()
  const targetTop = Math.max(0, getSectionDocumentTop(section) - offset)

  if (!smooth) {
    cancelActiveSmoothScroll()
    window.scrollTo(0, targetTop)
    onComplete?.()
    return true
  }

  smoothScrollTo(targetTop, { onComplete })
  return true
}
