import { PortfolioHome } from './components/PortfolioHome'
import { SiteLayout } from './components/SiteLayout'

export default function App() {
  return (
    <SiteLayout footerVariant="home">
      <PortfolioHome />
    </SiteLayout>
  )
}
