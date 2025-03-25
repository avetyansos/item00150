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

