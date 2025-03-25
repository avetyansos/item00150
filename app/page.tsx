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

