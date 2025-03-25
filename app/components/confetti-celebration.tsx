"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "@/app/hooks/use-window-size"

export function ConfettiCelebration() {
  const { width, height } = useWindowSize()
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  if (!isActive) return null

  return <Confetti width={width} height={height} recycle={false} numberOfPieces={500} gravity={0.15} />
}

