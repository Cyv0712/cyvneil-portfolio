export default function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <span className="section-divider-line" />
      <span className="section-divider-core">
        <svg viewBox="0 0 24 24" className="section-divider-hex" fill="none" stroke="currentColor">
          <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" strokeWidth="1" />
          <circle cx="12" cy="12" r="2.5" strokeWidth="1" />
        </svg>
      </span>
      <span className="section-divider-line section-divider-line-shimmer" />
    </div>
  )
}
