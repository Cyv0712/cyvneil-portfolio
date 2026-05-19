export default function SectionHeading({
  children,
  as: Component = 'h2',
  className = '',
  centered = false,
}) {
  return (
    <Component
      className={`font-lol text-3xl tracking-widest text-glow-gold uppercase md:text-4xl ${centered ? 'text-center' : ''} ${className}`.trim()}
    >
      {children}
    </Component>
  )
}
