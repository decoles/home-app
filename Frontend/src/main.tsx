import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StaticPage from './pages/static/StaticPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StaticPage/>
  </StrictMode>,
)
