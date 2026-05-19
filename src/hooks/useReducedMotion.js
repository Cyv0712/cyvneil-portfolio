import { useEffect, useState } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
// GSAP pin + scrub animations behave poorly below ~900px and on touch devices,
// so we treat both as a signal to fall back to static section layouts.
const SMALL_VIEWPORT_QUERY = '(max-width: 900px)'
const COARSE_POINTER_QUERY = '(hover: none) and (pointer: coarse)'

function readMatch(query) {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false
  }
  return window.matchMedia(query).matches
}

function useMediaList(queries) {
  const [matches, setMatches] = useState(() => queries.some(readMatch))

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined
    }

    const mqls = queries.map((q) => window.matchMedia(q))
    const update = () => setMatches(mqls.some((mql) => mql.matches))

    update()
    mqls.forEach((mql) => mql.addEventListener('change', update))

    return () => {
      mqls.forEach((mql) => mql.removeEventListener('change', update))
    }
  }, [queries])

  return matches
}

const REDUCED_MOTION_QUERIES = [REDUCED_MOTION_QUERY]
const SCROLL_ANIMATION_QUERIES = [
  REDUCED_MOTION_QUERY,
  SMALL_VIEWPORT_QUERY,
  COARSE_POINTER_QUERY,
]
const COARSE_POINTER_QUERIES = [COARSE_POINTER_QUERY]

// Honors the user's OS-level reduced-motion preference only. Use this for
// intro overlay timing and small reveal animations that work fine on mobile.
export function useReducedMotion() {
  return useMediaList(REDUCED_MOTION_QUERIES)
}

// True when we should swap GSAP scroll animations (pinned cards, horizontal
// projects) for static layouts: reduced-motion preference, narrow viewport,
// or touch-first device.
export function useDisableScrollAnimations() {
  return useMediaList(SCROLL_ANIMATION_QUERIES)
}

// Used to skip mouse-only effects (e.g. hero parallax) on touch devices.
export function useCoarsePointer() {
  return useMediaList(COARSE_POINTER_QUERIES)
}
