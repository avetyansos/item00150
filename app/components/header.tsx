import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import Image from "next/image"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-7 w-7">
            <Image src="/quiz-icon.svg" alt="Quiz Challenge" fill className="rounded-full" priority />
          </div>
          <span className="text-lg font-bold">Quiz Challenge</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}

