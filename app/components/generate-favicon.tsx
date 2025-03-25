"use client"

// This is just a utility component to show how the favicon was generated
// It's not actually used in the app

import { useEffect } from "react"

export function GenerateFavicon() {
  useEffect(() => {
    // Create a canvas element
    const canvas = document.createElement("canvas")
    canvas.width = 64
    canvas.height = 64

    // Get the canvas context
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw a blue circle
    ctx.beginPath()
    ctx.arc(32, 32, 30, 0, 2 * Math.PI)
    ctx.fillStyle = "#4A90E2"
    ctx.fill()

    // Add the letter Q
    ctx.font = "32px Arial"
    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("Q", 32, 32)

    // Convert to data URL
    const dataUrl = canvas.toDataURL("image/png")
    console.log("Favicon data URL:", dataUrl)

    // You would then convert this to an .ico file
  }, [])

  return null
}

