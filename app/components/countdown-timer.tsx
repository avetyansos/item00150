"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  seconds: number
  onComplete: () => void
  className?: string
}

export function CountdownTimer({ seconds, onComplete, className = "" }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(seconds)

  useEffect(() => {
    setTimeRemaining(seconds)
  }, [seconds])

  useEffect(() => {
    if (timeRemaining <= 0) {
      onComplete()
      return
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining, onComplete])

  const percentage = (timeRemaining / seconds) * 100

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span className={`font-mono ${timeRemaining <= 10 ? "text-red-500 font-bold" : ""}`}>{timeRemaining}s</span>
        </div>
      </div>
      <Progress value={percentage} className={`h-1 ${timeRemaining <= 10 ? "bg-red-200" : ""}`} />
    </div>
  )
}

