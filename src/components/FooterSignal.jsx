import { Fragment } from 'react'

export default function FooterSignal({ items }) {
  // Repeat items to ensure the group is wider than the screen for a seamless loop
  const repeatedItems = [...items, ...items, ...items, ...items]

  return (
    <div className="footer-signal" aria-hidden="true">
      <div className="footer-signal-viewport">
        <div className="footer-signal-scroll">
          <div className="footer-signal-group">
            {repeatedItems.map((item, index) => (
              <Fragment key={`a-${index}-${item}`}>
                <span className="footer-signal-item">{item}</span>
                <span className="text-[#0ac8b9] opacity-35 text-[0.45rem]" aria-hidden="true">
                  ◆
                </span>
              </Fragment>
            ))}
          </div>
          <div className="footer-signal-group" aria-hidden="true">
            {repeatedItems.map((item, index) => (
              <Fragment key={`b-${index}-${item}`}>
                <span className="footer-signal-item">{item}</span>
                <span className="text-[#0ac8b9] opacity-35 text-[0.45rem]" aria-hidden="true">
                  ◆
                </span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
