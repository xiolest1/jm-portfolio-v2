import { useCallback, useState } from 'react'
import { BootSequence } from './components/BootSequence/BootSequence'
import { Showcase } from './components/Showcase/Showcase'
import { STORAGE_KEY_INTRO } from './content/site'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import styles from './App.module.css'

type View = 'boot' | 'showcase'

function readInitialView(): View {
  try {
    return localStorage.getItem(STORAGE_KEY_INTRO) === '1' ? 'showcase' : 'boot'
  } catch {
    return 'boot'
  }
}

export default function App() {
  const [view, setView] = useState<View>(readInitialView)
  const reducedMotion = usePrefersReducedMotion()

  const enterShowcase = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INTRO, '1')
    } catch {
      /* private mode */
    }
    setView('showcase')
  }, [])

  const replayIntro = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY_INTRO)
    } catch {
      /* ignore */
    }
    setView('boot')
  }, [])

  if (view === 'boot') {
    return (
      <div className={styles.shell}>
        <BootSequence reducedMotion={reducedMotion} onEnter={enterShowcase} />
      </div>
    )
  }

  return (
    <div className={styles.shell}>
      <Showcase onReplayIntro={replayIntro} />
    </div>
  )
}
