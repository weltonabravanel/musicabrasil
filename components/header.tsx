import Link from "next/link"
import { Music, Search, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-[#009c3b]/10 py-4 px-4 md:px-6 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-r from-[#009c3b] to-[#ffdf00] p-1.5 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
            <Music className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">
            <span className="text-[#009c3b] group-hover:text-[#007c2b] transition-colors">Música</span>
            <span className="text-[#ffdf00] group-hover:text-[#ffd000] transition-colors">Brasil</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-[#009c3b] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#009c3b] after:transition-all"
          >
            Início
          </Link>
          <Link
            href="/descobrir"
            className="text-sm font-medium text-gray-700 hover:text-[#009c3b] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#009c3b] after:transition-all"
          >
            Descobrir
          </Link>
          <Link
            href="/top-brasil"
            className="text-sm font-medium text-gray-700 hover:text-[#009c3b] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#009c3b] after:transition-all"
          >
            Top Brasil
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-700 hover:text-[#009c3b] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#009c3b] after:transition-all"
          >
            Playlists
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#009c3b]/10 hover:text-[#009c3b]">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#009c3b]/10 hover:text-[#009c3b]">
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-[#009c3b]/10 hover:text-[#009c3b] md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
