import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Calculator } from './pages/Calculator'
import { HowItWorks } from './pages/HowItWorks'
import { WhyBitcoin } from './pages/WhyBitcoin'
import { IsThisForYou } from './pages/IsThisForYou'
import { Pricing } from './pages/Pricing'
import { Book } from './pages/Book'
import { Faq } from './pages/Faq'
import { NotFound } from './pages/NotFound'
import { DisclaimerPage } from './pages/legal/DisclaimerPage'
import { Terms } from './pages/legal/Terms'
import { Privacy } from './pages/legal/Privacy'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="why-bitcoin" element={<WhyBitcoin />} />
        <Route path="is-this-for-you" element={<IsThisForYou />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="book" element={<Book />} />
        <Route path="faq" element={<Faq />} />
        <Route path="legal/disclaimer" element={<DisclaimerPage />} />
        <Route path="legal/terms" element={<Terms />} />
        <Route path="legal/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
