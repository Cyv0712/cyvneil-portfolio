import { useEffect, useRef, useState } from 'react'

const canObserve =
  typeof window !== 'undefined' && typeof IntersectionObserver !== 'undefined'

// Mount expensive subtrees only when their host element gets close to the
// viewport. The placeholder reserves vertical space so layout doesn't jump
// when the real content takes over.
export default function DeferredSection({
  as: Tag = 'div',
  children,
  className = '',
  rootMargin = '600px 0px',
  minHeight,
  ...rest
}) {
  const ref = useRef(null)
  const [shouldRender, setShouldRender] = useState(!canObserve)

  useEffect(() => {
    if (shouldRender) {
      return undefined
    }

    const node = ref.current
    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldRender(true)
            observer.disconnect()
            return
          }
        }
      },
      { rootMargin },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [shouldRender, rootMargin])

  const placeholderStyle = minHeight ? { minHeight } : undefined

  return (
    <Tag
      ref={ref}
      className={className}
      style={placeholderStyle}
      {...rest}
    >
      {shouldRender ? children : null}
    </Tag>
  )
}
