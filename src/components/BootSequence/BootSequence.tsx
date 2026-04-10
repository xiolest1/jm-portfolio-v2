import { useEffect, useRef, useState } from 'react'
import { site } from '../../content/site'
import styles from './BootSequence.module.css'

type Phase = 'post' | 'load' | 'prompt' | 'start'

const POST_LINES = [
  `${site.name.toUpperCase().replace(/\s+/g, '_')} PORTFOLIO ROM v2.0`,
  '(C) local session · all rights reserved',
  '',
  'Power-on self-test',
  'Checking RAM ........................... OK (16384 KB)',
  'Vector table ........................... OK',
  'Keyboard controller ...................... OK',
  '',
]

const RESOURCES = [
  'boot.config',
  'ui.kernel',
  'motion.driver',
  'content.index',
  'projects.manifest',
] as const

type BootSequenceProps = {
  reducedMotion: boolean
  onEnter: () => void
}

function waitMs(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    if (signal.aborted) {
      resolve()
      return
    }
    const t = window.setTimeout(resolve, ms)
    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(t)
        resolve()
      },
      { once: true },
    )
  })
}

export function BootSequence({ reducedMotion, onEnter }: BootSequenceProps) {
  const [phase, setPhase] = useState<Phase>(reducedMotion ? 'start' : 'post')
  const [postIndex, setPostIndex] = useState(0)
  const [loadDoneCount, setLoadDoneCount] = useState(0)
  const [loadPct, setLoadPct] = useState(0)
  const [currentResource, setCurrentResource] = useState<string | null>(null)
  const postTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loadTransitionScheduled = useRef(false)

  const startEnabled = reducedMotion || phase === 'start'

  useEffect(() => {
    return () => {
      if (postTimer.current) clearTimeout(postTimer.current)
    }
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    if (phase !== 'post') return
    if (postIndex >= POST_LINES.length) {
      if (loadTransitionScheduled.current) return
      loadTransitionScheduled.current = true
      const id = window.setTimeout(() => setPhase('load'), 0)
      return () => {
        clearTimeout(id)
        loadTransitionScheduled.current = false
      }
    }
    loadTransitionScheduled.current = false
    const line = POST_LINES[postIndex]
    const delay = line === '' ? 120 : 280 + Math.min(220, line.length * 8)
    postTimer.current = setTimeout(() => {
      setPostIndex((i) => i + 1)
    }, delay)
    return () => {
      if (postTimer.current) clearTimeout(postTimer.current)
    }
  }, [phase, postIndex, reducedMotion])

  useEffect(() => {
    if (reducedMotion || phase !== 'load') return

    const ac = new AbortController()
    const { signal } = ac

    async function runLoad() {
      for (let i = 0; i < RESOURCES.length; i++) {
        if (signal.aborted) return
        const name = RESOURCES[i]
        setCurrentResource(name)
        setLoadDoneCount(i)
        for (let p = 0; p <= 100; p += 9) {
          if (signal.aborted) return
          setLoadPct(Math.min(100, p))
          await waitMs(42 + Math.random() * 28, signal)
        }
        setLoadPct(100)
        await waitMs(140, signal)
      }
      if (signal.aborted) return
      setCurrentResource(null)
      setLoadPct(100)
      setLoadDoneCount(RESOURCES.length)
      setPhase('prompt')
    }

    void runLoad()

    return () => ac.abort()
  }, [phase, reducedMotion])

  useEffect(() => {
    if (reducedMotion || phase !== 'prompt') return
    const id = window.setTimeout(() => {
      setPhase('start')
    }, 900)
    return () => clearTimeout(id)
  }, [phase, reducedMotion])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onEnter()
        return
      }
      if (e.key === 'Enter' && startEnabled) {
        e.preventDefault()
        onEnter()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onEnter, startEnabled])

  const visiblePost = POST_LINES.slice(0, postIndex)

  return (
    <div className={styles.root} role="application" aria-label="Boot sequence">
      <div className={styles.screen}>
        {reducedMotion && (
          <>
            <p className={styles.line}>Reduced motion preference detected.</p>
            <p className={`${styles.line} ${styles.dim}`}>Boot sequence shortened.</p>
            <p className={styles.line}>&nbsp;</p>
          </>
        )}

        {!reducedMotion &&
          visiblePost.map((line, i) => (
            <p key={`${i}-${line}`} className={styles.line}>
              {line}
            </p>
          ))}

        {!reducedMotion && phase !== 'post' && (
          <>
            <p className={styles.line}>&nbsp;</p>
            <p className={`${styles.line} ${styles.ok}`}>LOADING RESOURCES</p>
            {RESOURCES.slice(0, loadDoneCount).map((name) => (
              <p key={name} className={`${styles.line} ${styles.ok}`}>
                Loaded {name} ... 100%
              </p>
            ))}
            {currentResource && (
              <>
                <div className={styles.progressRow}>
                  <span className={styles.line}>
                    Loading {currentResource} ... {loadPct}%
                  </span>
                </div>
                <div className={styles.barTrack} aria-hidden>
                  <div className={styles.barFill} style={{ width: `${loadPct}%` }} />
                </div>
              </>
            )}
          </>
        )}

        {!reducedMotion && phase === 'prompt' && (
          <>
            <p className={styles.line}>&nbsp;</p>
            <p className={`${styles.line} ${styles.dim}`}>
              Press DEL for firmware menu (not wired) · ESC skips to site
            </p>
          </>
        )}

        {!reducedMotion && phase === 'start' && (
          <>
            <p className={styles.line}>&nbsp;</p>
            <p className={styles.line}>{site.name} — portfolio session</p>
            <p className={`${styles.line} ${styles.dim}`}>
              Click START or press Enter to continue.
            </p>
          </>
        )}

        {reducedMotion && (
          <>
            <p className={styles.line}>{site.name} — portfolio session</p>
            <p className={`${styles.line} ${styles.dim}`}>
              Press Enter or click START to continue.
            </p>
          </>
        )}
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.startBtn}
          disabled={!startEnabled}
          onClick={onEnter}
        >
          Start
        </button>
        <button type="button" className={styles.skipBtn} onClick={onEnter}>
          Skip intro
        </button>
        <span className={styles.hint}>ESC anywhere also skips to the portfolio.</span>
      </div>
    </div>
  )
}
