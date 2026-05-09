"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export interface NavItem {
  label: string
  href: string
}

export interface HeaderProps {
  siteName: string
  navigation: { items: NavItem[]; ctaText?: string; ctaHref?: string }
  logo?: string
  showSearch?: boolean
  showDarkMode?: boolean
}

export function Header({ siteName, navigation, logo, showSearch, showDarkMode }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const nav = navigation?.items || []

  return (
    <header className={`sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm transition-all ${scrolled ? "shadow-sm" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-extrabold text-accent no-underline">
            {logo ? <img src={logo} alt={siteName} className="h-8" /> : siteName}
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n: NavItem) => {
            const isActive = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href))
            return (
              <Link key={n.href} href={n.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-light relative ${
                  isActive ? "text-primary" : "text-foreground"
                }`}>
                {n.label}
                {isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {navigation?.ctaHref && (
            <a href={navigation.ctaHref} target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
              </svg>
              {navigation.ctaText || "Contacto"}
            </a>
          )}

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-surface px-4 py-2 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((n: NavItem) => (
              <Link key={n.href} href={n.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-light"
                onClick={() => setMobileOpen(false)}>
                {n.label}
              </Link>
            ))}
            {navigation?.ctaHref && (
              <a href={navigation.ctaHref} target="_blank" rel="noopener noreferrer"
                className="block rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground text-center mt-2">
                📱 {navigation.ctaText || "Contacto"}
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
