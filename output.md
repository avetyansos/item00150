```tsx file="app/components/confetti-celebration.tsx"
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


```

```tsx file="app/components/countdown-timer.tsx"
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


```

```tsx file="app/components/fail-animation.tsx"
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


```

```tsx file="app/components/generate-favicon.tsx"
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


```

```tsx file="app/components/header.tsx"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import Image from "next/image"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image src="/quiz-icon.svg" alt="Quiz Challenge" fill className="rounded-full" priority />
          </div>
          <span className="text-xl font-bold">Quiz Challenge</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}


```

```tsx file="app/components/theme-toggle.tsx"
"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


```

```tsx file="app/hooks/use-window-size.tsx"
"use client"

import { useState, useEffect } from "react"

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}


```

```tsx file="app/icon.tsx"
import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 24,
        background: "#4A90E2",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: "50%",
      }}
    >
      Q
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}


```

```tsx file="app/layout.tsx"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "./components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quiz Challenge",
  description: "Test your knowledge with our interactive quiz app",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
```

```ts file="app/lib/quiz-data.ts"
export const quizData: Record<string, Question[]> = {
  science: [
    {
      question: "What is the chemical symbol for gold?",
      options: [
        { value: "au", label: "Au" },
        { value: "ag", label: "Ag" },
        { value: "fe", label: "Fe" },
        { value: "cu", label: "Cu" },
      ],
      correctAnswer: "au",
      feedback: "The chemical symbol for gold is Au, which comes from the Latin word 'aurum'.",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: [
        { value: "venus", label: "Venus" },
        { value: "mars", label: "Mars" },
        { value: "jupiter", label: "Jupiter" },
        { value: "saturn", label: "Saturn" },
      ],
      correctAnswer: "mars",
      feedback:
        "Mars is known as the Red Planet due to the reddish appearance given by iron oxide (rust) on its surface.",
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: [
        { value: "gold", label: "Gold" },
        { value: "platinum", label: "Platinum" },
        { value: "diamond", label: "Diamond" },
        { value: "titanium", label: "Titanium" },
      ],
      correctAnswer: "diamond",
      feedback: "Diamond is the hardest known natural material, scoring 10 on the Mohs scale of mineral hardness.",
    },
    {
      question: "Which of these is NOT a state of matter?",
      options: [
        { value: "plasma", label: "Plasma" },
        { value: "gas", label: "Gas" },
        { value: "liquid", label: "Liquid" },
        { value: "energy", label: "Energy" },
      ],
      correctAnswer: "energy",
      feedback: "Energy is not a state of matter. The four common states of matter are solid, liquid, gas, and plasma.",
    },
    {
      question: "What is the main gas found in the Earth's atmosphere?",
      options: [
        { value: "oxygen", label: "Oxygen" },
        { value: "carbon-dioxide", label: "Carbon Dioxide" },
        { value: "nitrogen", label: "Nitrogen" },
        { value: "hydrogen", label: "Hydrogen" },
      ],
      correctAnswer: "nitrogen",
      feedback: "Nitrogen makes up about 78% of Earth's atmosphere, while oxygen makes up about 21%.",
    },
  ],
  history: [
    {
      question: "In which year did World War II end?",
      options: [
        { value: "1943", label: "1943" },
        { value: "1945", label: "1945" },
        { value: "1947", label: "1947" },
        { value: "1950", label: "1950" },
      ],
      correctAnswer: "1945",
      feedback: "World War II ended in 1945 with the surrender of Germany in May and Japan in September.",
    },
    {
      question: "Who was the first President of the United States?",
      options: [
        { value: "thomas-jefferson", label: "Thomas Jefferson" },
        { value: "john-adams", label: "John Adams" },
        { value: "george-washington", label: "George Washington" },
        { value: "benjamin-franklin", label: "Benjamin Franklin" },
      ],
      correctAnswer: "george-washington",
      feedback: "George Washington was the first President of the United States, serving from 1789 to 1797.",
    },
    {
      question: "Which ancient civilization built the pyramids at Giza?",
      options: [
        { value: "romans", label: "Romans" },
        { value: "greeks", label: "Greeks" },
        { value: "egyptians", label: "Egyptians" },
        { value: "mayans", label: "Mayans" },
      ],
      correctAnswer: "egyptians",
      feedback: "The pyramids at Giza were built by the ancient Egyptians as tombs for their pharaohs.",
    },
    {
      question: "The Renaissance period began in which country?",
      options: [
        { value: "france", label: "France" },
        { value: "england", label: "England" },
        { value: "italy", label: "Italy" },
        { value: "spain", label: "Spain" },
      ],
      correctAnswer: "italy",
      feedback: "The Renaissance began in Italy in the 14th century before spreading to the rest of Europe.",
    },
    {
      question: "Who wrote the 'I Have a Dream' speech?",
      options: [
        { value: "malcolm-x", label: "Malcolm X" },
        { value: "martin-luther-king", label: "Martin Luther King Jr." },
        { value: "rosa-parks", label: "Rosa Parks" },
        { value: "barack-obama", label: "Barack Obama" },
      ],
      correctAnswer: "martin-luther-king",
      feedback:
        "Martin Luther King Jr. delivered his famous 'I Have a Dream' speech during the March on Washington in 1963.",
    },
  ],
  programming: [
    {
      question: "Which language is primarily used for styling web pages?",
      options: [
        { value: "html", label: "HTML" },
        { value: "css", label: "CSS" },
        { value: "javascript", label: "JavaScript" },
        { value: "python", label: "Python" },
      ],
      correctAnswer: "css",
      feedback: "CSS (Cascading Style Sheets) is used to style and layout web pages.",
    },
    {
      question: "What does API stand for?",
      options: [
        { value: "application-programming-interface", label: "Application Programming Interface" },
        { value: "automated-program-instruction", label: "Automated Program Instruction" },
        { value: "application-process-integration", label: "Application Process Integration" },
        { value: "advanced-programming-implementation", label: "Advanced Programming Implementation" },
      ],
      correctAnswer: "application-programming-interface",
      feedback:
        "API stands for Application Programming Interface, which allows different software applications to communicate with each other.",
    },
    {
      question: "Which of these is NOT a JavaScript framework or library?",
      options: [
        { value: "react", label: "React" },
        { value: "angular", label: "Angular" },
        { value: "django", label: "Django" },
        { value: "vue", label: "Vue" },
      ],
      correctAnswer: "django",
      feedback: "Django is a Python web framework, not a JavaScript framework or library.",
    },
    {
      question: "What does the acronym SQL stand for?",
      options: [
        { value: "structured-query-language", label: "Structured Query Language" },
        { value: "simple-question-language", label: "Simple Question Language" },
        { value: "standard-query-logic", label: "Standard Query Logic" },
        { value: "system-quality-level", label: "System Quality Level" },
      ],
      correctAnswer: "structured-query-language",
      feedback: "SQL stands for Structured Query Language, which is used to communicate with and manipulate databases.",
    },
    {
      question: "Which data structure operates on a Last-In-First-Out (LIFO) principle?",
      options: [
        { value: "queue", label: "Queue" },
        { value: "stack", label: "Stack" },
        { value: "tree", label: "Tree" },
        { value: "graph", label: "Graph" },
      ],
      correctAnswer: "stack",
      feedback:
        "A stack follows the Last-In-First-Out (LIFO) principle, where the last element added is the first one to be removed.",
    },
  ],
  general: [
    {
      question: "Which country is home to the kangaroo?",
      options: [
        { value: "new-zealand", label: "New Zealand" },
        { value: "australia", label: "Australia" },
        { value: "south-africa", label: "South Africa" },
        { value: "brazil", label: "Brazil" },
      ],
      correctAnswer: "australia",
      feedback: "Kangaroos are native to Australia and are one of the country's most recognizable symbols.",
    },
    {
      question: "How many sides does a hexagon have?",
      options: [
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
      ],
      correctAnswer: "6",
      feedback: "A hexagon has 6 sides. The prefix 'hex' comes from the Greek word for six.",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        { value: "vincent-van-gogh", label: "Vincent van Gogh" },
        { value: "pablo-picasso", label: "Pablo Picasso" },
        { value: "leonardo-da-vinci", label: "Leonardo da Vinci" },
        { value: "michelangelo", label: "Michelangelo" },
      ],
      correctAnswer: "leonardo-da-vinci",
      feedback: "The Mona Lisa was painted by Leonardo da Vinci in the early 16th century.",
    },
    {
      question: "Which planet is closest to the sun?",
      options: [
        { value: "venus", label: "Venus" },
        { value: "earth", label: "Earth" },
        { value: "mars", label: "Mars" },
        { value: "mercury", label: "Mercury" },
      ],
      correctAnswer: "mercury",
      feedback: "Mercury is the closest planet to the sun in our solar system.",
    },
    {
      question: "What is the capital city of Japan?",
      options: [
        { value: "beijing", label: "Beijing" },
        { value: "seoul", label: "Seoul" },
        { value: "tokyo", label: "Tokyo" },
        { value: "bangkok", label: "Bangkok" },
      ],
      correctAnswer: "tokyo",
      feedback: "Tokyo is the capital and largest city of Japan.",
    },
  ],
}

export interface Question {
  question: string
  options: {
    value: string
    label: string
  }[]
  correctAnswer: string
  feedback: string
}


```

```tsx file="app/page.tsx"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, BookOpen, Code, Atom } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const topics = [
    {
      id: "science",
      title: "Science",
      description: "Test your knowledge of scientific concepts and discoveries",
      icon: <Atom className="h-8 w-8 text-violet-500" />,
    },
    {
      id: "history",
      title: "History",
      description: "Challenge yourself with questions about historical events",
      icon: <BookOpen className="h-8 w-8 text-amber-500" />,
    },
    {
      id: "programming",
      title: "Programming",
      description: "Prove your programming knowledge with coding questions",
      icon: <Code className="h-8 w-8 text-green-500" />,
    },
    {
      id: "general",
      title: "General Knowledge",
      description: "Test your knowledge across a variety of topics",
      icon: <Brain className="h-8 w-8 text-purple-500" />,
    },
  ]

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Choose a Topic</h1>
        <p className="text-muted-foreground text-lg">Select a category to start the quiz</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {topics.map((topic) => (
          <Card key={topic.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              {topic.icon}
              <div>
                <CardTitle>{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </div>
            </CardHeader>
            <CardFooter>
              <Link href={`/quiz/${topic.id}`} className="w-full">
                <Button className="w-full">Start Quiz</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


```

```tsx file="app/quiz/[topic]/page.tsx"
"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, CheckCircle2, Award, Frown, Clock, Home } from "lucide-react"
import { quizData } from "@/app/lib/quiz-data"
import { ConfettiCelebration } from "@/app/components/confetti-celebration"
import { FailAnimation } from "@/app/components/fail-animation"
import Link from "next/link"

export default function QuizPage({ params }: { params: { topic: string } }) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(60) // 60 seconds per question
  const [completedQuestions, setCompletedQuestions] = useState(0)

  const topic = params.topic
  const questions = quizData[topic] || []
  const topicTitle = topic.charAt(0).toUpperCase() + topic.slice(1)

  // Calculate progress based on completed questions, not current question
  const progress = (completedQuestions / questions.length) * 100

  const handleNext = useCallback(() => {
    // Mark the current question as completed
    setCompletedQuestions((prev) => prev + 1)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setTimeRemaining(60) // Reset timer for next question
    } else {
      setIsCompleted(true)
    }
  }, [currentQuestionIndex, questions.length])

  // Reset timer when question changes
  useEffect(() => {
    setTimeRemaining(60)
  }, [currentQuestionIndex])

  // Timer effect for current question
  useEffect(() => {
    if (isCompleted) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // If no answer selected, set it to empty string
          if (!selectedAnswers[currentQuestionIndex]) {
            const newAnswers = [...selectedAnswers]
            newAnswers[currentQuestionIndex] = ""
            setSelectedAnswers(newAnswers)
          }
          // Move to next question
          handleNext()
          return 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestionIndex, handleNext, isCompleted, selectedAnswers])

  // If no questions found, redirect to home
  useEffect(() => {
    if (questions.length === 0) {
      router.push("/")
    }
  }, [questions, router])

  if (questions.length === 0) {
    return null
  }

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = value
    setSelectedAnswers(newAnswers)
  }

  const calculateScore = () => {
    let score = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score++
      }
    })
    return score
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setIsCompleted(false)
    setTimeRemaining(60)
    setCompletedQuestions(0)
  }

  if (isCompleted) {
    const score = calculateScore()
    const percentage = Math.round((score / questions.length) * 100)
    const isPerfectScore = score === questions.length
    const isFailingScore = percentage < 60

    return (
      <div className="container mx-auto py-10 px-4 max-w-3xl">
        {isPerfectScore && <ConfettiCelebration />}
        {isFailingScore && <FailAnimation />}

        <div className="mb-6">
          <h1 className="text-2xl font-bold">{topicTitle} Quiz Results</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="flex items-center hover:text-foreground">
              <Home className="mr-1 h-4 w-4" />
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>{topicTitle}</span>
            <span className="mx-2">/</span>
            <span>Results</span>
          </div>
        </div>

        <Card className="mb-8 relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-center">Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-6">
              {isPerfectScore ? (
                <div className="flex flex-col items-center">
                  <Award className="h-16 w-16 text-yellow-500 mb-2 animate-success-rotate" />
                  <p className="text-4xl font-bold mb-2 animate-score-pulse text-violet-500">
                    {score} / {questions.length}
                  </p>
                  <p className="text-xl text-violet-600">Perfect Score! Congratulations!</p>
                </div>
              ) : isFailingScore ? (
                <div className="flex flex-col items-center">
                  <Frown className="h-16 w-16 text-red-500 mb-2 animate-pulse" />
                  <p className="text-4xl font-bold mb-2 text-red-500">
                    {score} / {questions.length}
                  </p>
                  <p className="text-xl text-red-600">Better luck next time!</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="text-4xl font-bold mb-2">
                    {score} / {questions.length}
                  </p>
                  <p className="text-xl text-muted-foreground">Your score: {percentage}%</p>
                </div>
              )}
              <Progress
                value={percentage}
                className={`h-2 mt-4 ${isPerfectScore ? "bg-violet-200" : isFailingScore ? "bg-red-200" : ""}`}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/")}>
              Back to Topics
            </Button>
            <Button onClick={handleRestart}>Restart Quiz</Button>
          </CardFooter>

          {isPerfectScore && (
            <div className="absolute -top-10 -right-10 h-40 w-40 bg-violet-500 rotate-45 opacity-20"></div>
          )}
        </Card>

        <h2 className="text-2xl font-bold mb-4">Question Review</h2>
        {questions.map((question, index) => (
          <Card
            key={index}
            className={`mb-4 transition-all duration-300 ${
              selectedAnswers[index] === question.correctAnswer
                ? "border-green-500 hover:shadow-md hover:shadow-green-200"
                : "border-red-500 hover:shadow-md hover:shadow-red-200"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-start gap-2">
                <span className="mt-0.5">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs">
                      ✕
                    </span>
                  )}
                </span>
                <span>{question.question}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                <span className="font-semibold">Your answer:</span>{" "}
                {selectedAnswers[index] === ""
                  ? "Time expired - No answer"
                  : question.options.find((opt) => opt.value === selectedAnswers[index])?.label || "Not answered"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Correct answer:</span>{" "}
                {question.options.find((opt) => opt.value === question.correctAnswer)?.label}
              </p>
              <p className="text-muted-foreground">{question.feedback}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{topicTitle} Quiz</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="flex items-center hover:text-foreground">
            <Home className="mr-1 h-4 w-4" />
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>{topicTitle}</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <p className="text-sm font-medium">{Math.round(progress)}%</p>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader className="relative pb-2">
          <div className="absolute right-4 top-4 flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className={`font-mono ${timeRemaining <= 10 ? "text-red-500 font-bold animate-pulse" : ""}`}>
              {timeRemaining}s
            </span>
          </div>
          <CardTitle>{currentQuestion.question}</CardTitle>
        </CardHeader>

        {/* Question timer progress bar */}
        <div className="px-6">
          <Progress
            value={(timeRemaining / 60) * 100}
            className={`h-1.5 ${timeRemaining <= 10 ? "bg-red-200" : "bg-violet-200"}`}
          />
          <p className="text-xs text-center mt-1 text-muted-foreground">Time remaining for this question</p>
        </div>

        <CardContent className="pt-4">
          <RadioGroup
            value={selectedAnswers[currentQuestionIndex] || ""}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent transition-colors duration-200"
                onClick={() => handleAnswerSelect(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-grow cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestionIndex]} className="w-full">
            {currentQuestionIndex < questions.length - 1 ? (
              <>
                Next Question <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Complete Quiz"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


```

```tsx file="components/theme-provider.tsx"
'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

```

```ts file="components/ui/use-toast.ts"
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

```

```tsx file="hooks/use-mobile.tsx"
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```

```ts file="hooks/use-toast.ts"
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

```

```ts file="lib/utils.ts"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

```ts file="tailwind.config.ts"
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config


```

