import { useEffect, useRef } from 'react'
import styles from './BootSequence.module.css'

type BootSequenceProps = {
  open: boolean
  onClose: () => void
}

export function BootSequence({ open, onClose }: BootSequenceProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      className={styles.dialog}
      ref={dialogRef}
      aria-labelledby="boot-title"
      onClose={onClose}
    >
      <div className={styles.header}>
        <p className={styles.label}>Optional system view</p>
        <button className={styles.close} type="button" onClick={onClose}>Close</button>
      </div>
      <h2 id="boot-title">System ready</h2>
      <p className={styles.intro}>
        A small callback to the portfolio’s original boot-sequence idea.
      </p>
      <ul className={styles.statusList}>
        <li><span>portfolio content</span><strong>ready</strong></li>
        <li><span>engineering work</span><strong>available</strong></li>
        <li><span>HireFlux case study</span><strong>available</strong></li>
      </ul>
      <p className={styles.note}>This replay is optional. The portfolio is always available behind it.</p>
    </dialog>
  )
}
