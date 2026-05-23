import { useState } from 'react'
import { useKioskStore } from './store/kioskStore'
import KioskShell from './components/layout/KioskShell'
import WelcomeScreen from './screens/WelcomeScreen'
import InstructionScreen from './screens/InstructionScreen'
import TestingScreen from './screens/TestingScreen'
import ResultScreen from './screens/ResultScreen'
import DriversScreen from './screens/DriversScreen'
import PackageScreen from './screens/PackageScreen'
import PaymentScreen from './screens/PaymentScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import DevPanel from './components/dev/DevPanel'

export default function App() {
  const { screen, devMode } = useKioskStore()
  const [showDev, setShowDev] = useState(false)

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':      return <WelcomeScreen />
      case 'instruction':  return <InstructionScreen />
      case 'testing':      return <TestingScreen />
      case 'result':       return <ResultScreen />
      case 'drivers':      return <DriversScreen />
      case 'package':      return <PackageScreen />
      case 'payment':      return <PaymentScreen />
      case 'confirmation': return <ConfirmationScreen />
      default:             return <WelcomeScreen />
    }
  }

  return (
    <KioskShell>
      {/* Dev toggle button */}
      {devMode && !showDev && (
        <button
          onClick={() => setShowDev(true)}
          className="absolute top-3 right-3 z-40 px-2 py-1 rounded-lg text-xs font-bold transition-all hover:opacity-80"
          style={{
            background: 'rgba(245,158,11,0.15)',
            border: '1px solid rgba(245,158,11,0.4)',
            color: '#f59e0b',
          }}
        >
          ⚙ DEV
        </button>
      )}

      {/* Active screen */}
      <div className="flex-1 flex flex-col relative">
        {renderScreen()}

        {/* Dev panel overlay */}
        {showDev && devMode && (
          <DevPanel onClose={() => setShowDev(false)} />
        )}
      </div>
    </KioskShell>
  )
}
