import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, BookOpen, Code, Atom } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const topics = [
    {
      id: "science",
      title: "Science",
      description: "Test your knowledge of scientific concepts and discoveries",
      icon: <Atom className="h-7 w-7 text-indigo-500" />,
    },
    {
      id: "history",
      title: "History",
      description: "Challenge yourself with questions about historical events",
      icon: <BookOpen className="h-7 w-7 text-amber-500" />,
    },
    {
      id: "programming",
      title: "Programming",
      description: "Prove your programming knowledge with coding questions",
      icon: <Code className="h-7 w-7 text-green-500" />,
    },
    {
      id: "general",
      title: "General Knowledge",
      description: "Test your knowledge across a variety of topics",
      icon: <Brain className="h-7 w-7 text-purple-500" />,
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Choose a Topic</h1>
        <p className="text-muted-foreground text-base max-w-md mx-auto">
          Select a category below to start the quiz and test your knowledge
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {topics.map((topic) => (
          <Card key={topic.id} className="transition-colors border-border hover:border-primary/50">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-muted rounded-md">{topic.icon}</div>
              <div>
                <CardTitle className="text-xl">{topic.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-2 pb-6">
              <CardDescription className="min-h-[40px]">{topic.description}</CardDescription>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href={`/quiz/${topic.id}`} className="w-full">
                <Button className="w-full text-sm">Start Quiz</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

