import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function showOverlay(msg) {
  try {
    let el = document.getElementById('dev-error-overlay')
    if (!el) {
      el = document.createElement('div')
      el.id = 'dev-error-overlay'
      Object.assign(el.style, {
        position: 'fixed',
        left: '10px',
        right: '10px',
        top: '10px',
        padding: '12px',
        background: 'rgba(200,20,20,0.95)',
        color: '#fff',
        zIndex: 999999,
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        borderRadius: '8px'
      })
      document.body.appendChild(el)
    }
    el.textContent = msg
  } catch (err) {
    // ignore overlay errors
    // eslint-disable-next-line no-console
    console.error('Failed to show overlay', err)
  }
}

window.addEventListener('error', (e) => {
  const msg = `Error: ${e.message || (e.error && e.error.message) || 'Unknown'}\n${e.filename || ''}:${e.lineno || ''}:${e.colno || ''}`
  // eslint-disable-next-line no-console
  console.error(msg, e.error || e)
  showOverlay(msg)
})

window.addEventListener('unhandledrejection', (e) => {
  const reason = e.reason && e.reason.message ? e.reason.message : JSON.stringify(e.reason)
  const msg = `UnhandledRejection: ${reason}`
  // eslint-disable-next-line no-console
  console.error(msg, e.reason)
  showOverlay(msg)
})

createRoot(document.getElementById('root')).render(
  <App />
)
