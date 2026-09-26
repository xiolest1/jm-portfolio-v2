import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HireFluxCaseStudy } from './components/HireFluxCaseStudy'
import { SiteLayout } from './components/SiteLayout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteLayout>
      <HireFluxCaseStudy />
    </SiteLayout>
  </StrictMode>,
)
