import { useEffect, useRef, useState } from 'react'

function useInView({
  disabled = false,
  once = true,
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.14,
} = {}) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (disabled) {
      return undefined
    }

    const node = elementRef.current

    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          if (once) {
            observer.unobserve(node)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        rootMargin,
        threshold,
      },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [disabled, once, rootMargin, threshold])

  return [elementRef, isVisible]
}

export default function RevealBlock({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  disabled = false,
  once = true,
  rootMargin,
  threshold,
  style,
  ...props
}) {
  const [ref, isVisible] = useInView({ disabled, once, rootMargin, threshold })
  const visible = disabled || isVisible

  const revealClassName = [
    'reveal-block',
    visible ? 'reveal-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      ref={ref}
      className={revealClassName}
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </Tag>
  )
}
