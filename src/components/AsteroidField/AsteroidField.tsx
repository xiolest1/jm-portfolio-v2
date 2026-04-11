import { useEffect, useRef } from 'react'
import styles from './AsteroidField.module.css'

type Asteroid = {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  vr: number
  r: number
  sides: number
  jitter: number[]
  hue: number
}

function makeAsteroid(w: number, h: number): Asteroid {
  const r = 6 + Math.random() * 28
  const sides = 5 + Math.floor(Math.random() * 4)
  const jitter = Array.from({ length: sides }, () => 0.65 + Math.random() * 0.45)
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.003,
    r,
    sides,
    jitter,
    hue: 18 + Math.random() * 42,
  }
}

type AsteroidFieldProps = {
  reducedMotion: boolean
}

export function AsteroidField({ reducedMotion }: AsteroidFieldProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    const c2d = el?.getContext('2d')
    if (!el || !c2d) return

    const canvas = el
    const ctx = c2d

    let width = 0
    let height = 0
    let asteroids: Asteroid[] = []
    let raf = 0

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = Math.min(
        48,
        Math.max(10, Math.floor((width * height) / 42000)),
      )
      asteroids = Array.from({ length: target }, () => makeAsteroid(width, height))
    }

    function drawRock(a: Asteroid) {
      ctx.save()
      ctx.translate(a.x, a.y)
      ctx.rotate(a.rot)
      ctx.beginPath()
      for (let i = 0; i < a.sides; i++) {
        const ang = (i / a.sides) * Math.PI * 2 - Math.PI / 2
        const rad = a.r * a.jitter[i]
        const px = Math.cos(ang) * rad
        const py = Math.sin(ang) * rad
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fillStyle = `hsla(${a.hue}, 35%, 58%, 0.14)`
      ctx.strokeStyle = `hsla(${a.hue + 20}, 45%, 72%, 0.12)`
      ctx.lineWidth = 0.8
      ctx.fill()
      ctx.stroke()
      ctx.restore()
    }

    function step() {
      ctx.clearRect(0, 0, width, height)
      for (const a of asteroids) {
        a.x += a.vx
        a.y += a.vy
        a.rot += a.vr
        if (a.x < -a.r * 2) a.x = width + a.r
        if (a.x > width + a.r * 2) a.x = -a.r
        if (a.y < -a.r * 2) a.y = height + a.r
        if (a.y > height + a.r * 2) a.y = -a.r
        drawRock(a)
      }
    }

    function onResize() {
      resize()
      if (reducedMotion) step()
    }

    onResize()
    window.addEventListener('resize', onResize)

    if (reducedMotion) {
      return () => window.removeEventListener('resize', onResize)
    }

    const loop = () => {
      step()
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={ref}
      className={styles.canvas}
      aria-hidden
      role="presentation"
    />
  )
}
