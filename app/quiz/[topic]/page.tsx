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
      <div className="container mx-auto py-6 px-4 max-w-3xl">
        {isPerfectScore && <ConfettiCelebration />}
        {isFailingScore && <FailAnimation />}

        <div className="mb-5">
          <h1 className="text-2xl font-bold">{topicTitle} Quiz Results</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="flex items-center hover:text-foreground">
              <Home className="mr-1 h-3.5 w-3.5" />
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>{topicTitle}</span>
            <span className="mx-2">/</span>
            <span>Results</span>
          </div>
        </div>

        <Card className="mb-6 relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-xl">Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-4">
              {isPerfectScore ? (
                <div className="flex flex-col items-center">
                  <Award className="h-14 w-14 text-yellow-500 mb-2 animate-success-rotate" />
                  <p className="text-3xl font-bold mb-1 animate-score-pulse text-indigo-500">
                    {score} / {questions.length}
                  </p>
                  <p className="text-lg text-indigo-600">Perfect Score! Congratulations!</p>
                </div>
              ) : isFailingScore ? (
                <div className="flex flex-col items-center">
                  <Frown className="h-14 w-14 text-red-500 mb-2 animate-pulse" />
                  <p className="text-3xl font-bold mb-1 text-red-500">
                    {score} / {questions.length}
                  </p>
                  <p className="text-lg text-red-600">Better luck next time!</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="text-3xl font-bold mb-1">
                    {score} / {questions.length}
                  </p>
                  <p className="text-lg text-muted-foreground">Your score: {percentage}%</p>
                </div>
              )}
              <Progress
                value={percentage}
                className={`h-2 mt-3 ${isPerfectScore ? "bg-indigo-200" : isFailingScore ? "bg-red-200" : ""}`}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <Button variant="outline" onClick={() => router.push("/")} size="sm">
              Back to Topics
            </Button>
            <Button onClick={handleRestart} size="sm">
              Restart Quiz
            </Button>
          </CardFooter>

          {isPerfectScore && (
            <div className="absolute -top-10 -right-10 h-40 w-40 bg-indigo-500 rotate-45 opacity-20"></div>
          )}
        </Card>

        <h2 className="text-xl font-bold mb-3">Question Review</h2>
        {questions.map((question, index) => (
          <Card
            key={index}
            className={`mb-4 transition-colors ${
              selectedAnswers[index] === question.correctAnswer ? "border-green-500" : "border-red-500"
            }`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-start gap-2">
                <span className="mt-0.5 flex-shrink-0">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs">
                      ✕
                    </span>
                  )}
                </span>
                <span>{question.question}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
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
    <div className="container mx-auto py-6 px-4 max-w-3xl">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">{topicTitle} Quiz</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="flex items-center hover:text-foreground">
            <Home className="mr-1 h-3.5 w-3.5" />
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>{topicTitle}</span>
        </div>
      </div>

      <div className="mb-6">
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
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-base pr-16">{currentQuestion.question}</CardTitle>
            <div className="flex items-center gap-1 text-muted-foreground absolute top-4 right-4">
              <Clock className="h-3.5 w-3.5" />
              <span
                className={`font-mono text-sm ${timeRemaining <= 10 ? "text-red-500 font-bold animate-pulse" : ""}`}
              >
                {timeRemaining}s
              </span>
            </div>
          </div>
        </CardHeader>

        {/* Question timer progress bar */}
        <div className="px-6">
          <Progress
            value={(timeRemaining / 60) * 100}
            className={`h-1.5 ${timeRemaining <= 10 ? "bg-red-200" : "bg-indigo-200"}`}
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
                <Label htmlFor={option.value} className="flex-grow cursor-pointer text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestionIndex]} className="w-full text-sm">
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

