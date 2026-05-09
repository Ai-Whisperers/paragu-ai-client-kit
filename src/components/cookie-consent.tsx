"use client"
import { useState, useEffect } from "react"

export interface CookieConsentProps {
  storageKey?: string
  title?: string
  description?: string
  acceptAllText?: string
  acceptEssentialText?: string
  onAccept?: (preferences: { analytics: boolean; essential: boolean }) => void
}

export function CookieConsent({
  storageKey = "paraguai_cookie_prefs",
  title = "🍪 Este sitio usa cookies",
  description = "Usamos cookies esenciales para el funcionamiento del sitio y cookies analíticas para mejorar tu experiencia.",
  acceptAllText = "Aceptar todas",
  acceptEssentialText = "Solo necesarias",
  onAccept,
}: CookieConsentProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      const pref = localStorage.getItem(storageKey)
      if (!pref) setShow(true)
    } catch { setShow(true) }
  }, [storageKey])

  const acceptAll = () => {
    const prefs = { analytics: true, essential: true }
    localStorage.setItem(storageKey, JSON.stringify(prefs))
    setShow(false)
    onAccept?.(prefs)
  }

  const acceptEssential = () => {
    const prefs = { analytics: false, essential: true }
    localStorage.setItem(storageKey, JSON.stringify(prefs))
    setShow(false)
    onAccept?.(prefs)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[99999] bg-surface border-t border-border p-4 md:p-5 shadow-xl">
      <div className="mx-auto max-w-3xl flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-foreground font-medium mb-1">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={acceptEssential}
            className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {acceptEssentialText}
          </button>
          <button onClick={acceptAll}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            {acceptAllText}
          </button>
        </div>
      </div>
    </div>
  )
}
