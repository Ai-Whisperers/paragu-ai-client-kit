"use client"
import Link from "next/link"

export interface CtaBannerProps {
  title: string
  description?: string
  primaryText?: string
  primaryHref?: string
  secondaryText?: string
  secondaryHref?: string
  variant?: "primary" | "accent" | "gradient"
  backgroundClass?: string
}

export function CtaBanner({
  title,
  description,
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
  variant = "primary",
  backgroundClass,
}: CtaBannerProps) {
  const bgClass = backgroundClass || (
    variant === "gradient"
      ? "bg-gradient-to-r from-primary to-accent"
      : variant === "accent"
      ? "bg-accent"
      : "bg-primary"
  )

  return (
    <section className={`py-16 px-4 text-center text-white ${bgClass}`}>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {description && <p className="mb-6 text-white/80 max-w-lg mx-auto">{description}</p>}
      <div className="flex gap-4 justify-center flex-wrap">
        {primaryHref && (
          <Link href={primaryHref}
            className="inline-block rounded-lg bg-white text-primary px-8 py-4 font-semibold hover:bg-white/90 transition-colors no-underline">
            {primaryText || "Ver más"}
          </Link>
        )}
        {secondaryHref && (
          <a href={secondaryHref} target="_blank" rel="noopener noreferrer"
            className="inline-block rounded-lg bg-transparent text-white px-8 py-4 font-semibold border-2 border-white/50 hover:border-white transition-colors no-underline">
            {secondaryText || "Contactar"}
          </a>
        )}
      </div>
    </section>
  )
}
