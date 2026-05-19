import { useState, useEffect } from 'react'

export default function Typewriter({ text, speed = 100, start = false }) {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!start) return

    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index))
        setIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [index, text, speed, start])

  return (
    <>
      {displayedText}
      {start ? (
        <span className="typewriter-cursor" aria-hidden="true">
          |
        </span>
      ) : null}
    </>
  )
}
