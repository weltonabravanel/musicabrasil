import { Heart, Instagram, Twitter, Facebook, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-[#009c3b]/20 py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-[#009c3b] to-[#ffdf00] p-1.5 rounded-full">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-[#009c3b]">Música</span>
                <span className="text-[#ffdf00]">Brasil</span>
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Sua plataforma de música com o melhor da música brasileira e internacional.
            </p>
            <div className="flex items-center gap-3">
              <Link href="#" className="text-gray-400 hover:text-[#009c3b] transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#009c3b] transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#009c3b] transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#009c3b] transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-500 hover:text-[#009c3b] transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/descobrir" className="text-sm text-gray-500 hover:text-[#009c3b] transition-colors">
                  Descobrir
                </Link>
              </li>
              <li>
                <Link href="/top-brasil" className="text-sm text-gray-500 hover:text-[#009c3b] transition-colors">
                  Top Brasil
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-[#009c3b] transition-colors">
                  Playlists
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Gêneros Populares</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/descobrir" className="text-sm text-gray-500 hover:text-[#009c3b] transition-colors">
                  MPB
                </Link>
              </li>
              <li>
                <Link href="/descobrir" className="text-sm text-gray-500 hover:text-[#009c3b] transition-colors">
                  Sertanejo
                </Link>
              </li>
              <li>
                <Link href="/descobrir" className="text-sm text-gray-500 hover:text-[#009c3b] transition-colors">
                  Samba
                </Link>
              </li>
              <li>
                <Link href="/descobrir" className="text-sm text-gray-500 hover:text-[#009c3b] transition-colors">
                  Funk
                </Link>
              </li>
              <li>
                <Link href="/descobrir" className="text-sm text-gray-500 hover:text-[#009c3b] transition-colors">
                  Bossa Nova
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-[#009c3b] transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-[#009c3b] transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-[#009c3b] transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-500 hover:text-[#009c3b] transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#009c3b]/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2023 MúsicaBrasil. Todos os direitos reservados.</p>
          <p className="text-xs text-gray-400 mt-2 md:mt-0 flex items-center">
            Desenvolvido com <Heart className="inline h-3 w-3 text-red-500 mx-1" /> no Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
