"use client"

import { XCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function FailAnimation() {
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="animate-fail-bounce">
        <XCircle className="h-24 w-24 text-red-500 animate-pulse" />
      </div>
    </div>
  )
}

