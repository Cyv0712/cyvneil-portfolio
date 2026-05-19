import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register the plugin exactly once when this module is first imported.
gsap.registerPlugin(ScrollTrigger)

let normalized = false

// Enable normalized scrolling exactly once across the app to avoid duplicate
// touch / wheel listeners from being attached by every animated section.
export function ensureNormalizedScroll() {
  if (normalized || typeof window === 'undefined') {
    return
  }
  normalized = true
  ScrollTrigger.normalizeScroll(true)
  ScrollTrigger.config({ ignoreMobileResize: true })
}

export { gsap }
