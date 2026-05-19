import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

function scrollToTop() {
  window.scrollTo(0, 0)
}

scrollToTop()

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    scrollToTop()
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
