function PreviewStat({ label, value }) {
  return (
    <div className="project-preview-stat">
      <span className="project-preview-stat-label">{label}</span>
      <strong className="project-preview-stat-value">{value}</strong>
    </div>
  )
}

export default function ProjectPreviewPanel({ project, fallback, staticMode = false }) {
  const preview = project.preview
  const hasImage = Boolean(preview?.image)

  if (!preview) {
    return (
      <div className={`project-preview-fallback ${staticMode ? 'project-preview-static' : ''}`}>
        {fallback}
      </div>
    )
  }

  return (
    <div
      className={`project-preview-frame ${staticMode ? 'project-preview-static' : ''}`}
      style={{
        '--preview-accent': preview.accent,
        '--preview-glow': preview.glow,
        '--preview-surface': preview.surface,
      }}
    >
      <div className="project-preview-chrome">
        <div className="project-preview-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="project-preview-domain">{preview.domain}</span>
        <span className="project-preview-badge">{preview.badge}</span>
      </div>

      <div className={`project-preview-canvas ${hasImage ? 'project-preview-canvas-image' : ''}`}>
        {hasImage ? (
          <>
            <img
              className="project-preview-image"
              src={preview.image}
              alt={preview.alt ?? `${project.title} preview`}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              style={{ objectPosition: preview.imagePosition ?? 'center top' }}
            />
          </>
        ) : (
          <>
            <div className="project-preview-grid" aria-hidden="true" />
            <div className="project-preview-spotlight" aria-hidden="true" />

            <div className="project-preview-copy">
              <p className="project-preview-eyebrow">{preview.eyebrow}</p>
              <h4 className="project-preview-headline">{preview.headline}</h4>
              <p className="project-preview-body">{preview.copy}</p>
            </div>

            <div className="project-preview-pill-row">
              {preview.pills.map((pill) => (
                <span key={pill} className="project-preview-pill">
                  {pill}
                </span>
              ))}
            </div>

            <div className="project-preview-stats">
              {preview.stats.map((stat) => (
                <PreviewStat key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
