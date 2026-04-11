import { useState, type FormEvent } from 'react'
import { site } from '../../content/site'
import styles from './ContactForm.module.css'

const RATE_MS = 30_000
const STORAGE_KEY = 'portfolio_contact_last_submit'

type MessageState = { type: 'idle' } | { type: 'success'; text: string } | { type: 'error'; text: string }

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<MessageState>({ type: 'idle' })
  const [sending, setSending] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus({ type: 'idle' })

    if (honeypot) return

    if (email !== confirmEmail) {
      setStatus({ type: 'error', text: 'Email addresses do not match.' })
      return
    }

    const now = Date.now()
    try {
      const last = localStorage.getItem(STORAGE_KEY)
      if (last && now - parseInt(last, 10) < RATE_MS) {
        setStatus({
          type: 'error',
          text: 'Please wait a moment before sending another message.',
        })
        return
      }
    } catch {
      /* private mode */
    }

    const bodyText = message.trim()
    if (bodyText.includes('http') || bodyText.includes('www.')) {
      setStatus({
        type: 'error',
        text: 'Links are not allowed in messages.',
      })
      return
    }

    setSending(true)
    const fd = new FormData()
    fd.append('name', name.trim())
    fd.append('email', email.trim())
    fd.append('message', bodyText)
    fd.append('_subject', `Portfolio: ${name.trim() || 'message'}`)

    try {
      const res = await fetch(site.contactFormAction, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        try {
          localStorage.setItem(STORAGE_KEY, String(now))
        } catch {
          /* ignore */
        }
        setStatus({ type: 'success', text: 'Message sent successfully!' })
        setName('')
        setEmail('')
        setConfirmEmail('')
        setMessage('')
      } else {
        setStatus({
          type: 'error',
          text: 'Failed to send message. Please try again.',
        })
      }
    } catch {
      setStatus({
        type: 'error',
        text: 'Failed to send message. Please try again.',
      })
    } finally {
      setSending(false)
    }
  }

  const msgClass =
    status.type === 'success'
      ? styles.messageSuccess
      : status.type === 'error'
        ? styles.messageError
        : ''

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <p
        className={`${styles.message} ${msgClass}`}
        role="status"
        aria-live="polite"
      >
        {status.type !== 'idle' ? status.text : '\u00a0'}
      </p>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-honeypot">Leave this field empty</label>
        <input
          id="contact-honeypot"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-name">
          Name
        </label>
        <input
          id="contact-name"
          className={styles.input}
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          className={styles.input}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-email-confirm">
          Confirm email
        </label>
        <input
          id="contact-email-confirm"
          className={styles.input}
          name="confirmEmail"
          type="email"
          required
          autoComplete="email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          className={styles.textarea}
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button type="submit" className={styles.submit} disabled={sending}>
        {sending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
