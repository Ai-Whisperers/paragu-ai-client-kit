"use client"

export interface ProcessStep {
  step?: number | string
  title: string
  description?: string
  icon?: string
}

export interface ProcessSectionProps {
  title?: string
  steps: ProcessStep[]
  variant?: "numbered" | "icon"
  backgroundClass?: string
}

export function ProcessSection({
  title,
  steps,
  variant = "numbered",
  backgroundClass = "",
}: ProcessSectionProps) {
  if (!steps || steps.length === 0) return null

  return (
    <section className={`py-16 px-4 ${backgroundClass}`}>
      <div className="max-w-5xl mx-auto">
        {title && <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {variant === "numbered" && (
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {step.step || i + 1}
                </div>
              )}
              {variant === "icon" && step.icon && (
                <div className="text-4xl mb-4">{step.icon}</div>
              )}
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              {step.description && (
                <p className="text-sm text-muted-foreground">{step.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
