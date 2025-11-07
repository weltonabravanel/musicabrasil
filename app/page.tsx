"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MusicPlayer } from "@/components/music-player"
import { MusicGrid } from "@/components/music-grid"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArtistCircles } from "@/components/artist-circles"
import { User, Disc3, Music } from "lucide-react"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [activeFilters, setActiveFilters] = useState({
    genre: "all",
    country: "br",
    limit: 20,
  })

  const searchMusic = async () => {
    if (!searchTerm) return

    setLoading(true)
    try {
      const term = encodeURIComponent(searchTerm)
      const country = activeFilters.country
      const limit = activeFilters.limit
      const genre = activeFilters.genre !== "all" ? `&genre=${activeFilters.genre}` : ""

      const response = await fetch(`/api/itunes?term=${term}&country=${country}&limit=${limit}${genre}`)
      const data = await response.json()

      setResults(data.results || [])
    } catch (error) {
      console.error("Erro ao buscar músicas:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMusic()
    }
  }

  const handleTrackSelect = (track) => {
    setSelectedTrack(track)
  }

  const handleFilterChange = (filters) => {
    setActiveFilters({ ...activeFilters, ...filters })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f0f8ff] to-[#e6f7ff]">
      <Header />

      <div className="w-full bg-gradient-to-r from-[#009c3b]/90 via-[#ffdf00]/80 to-[#002776]/90 h-2" />

      <ArtistCircles />

      <main className="flex-1 flex flex-col md:flex-row">
        <Sidebar onFilterChange={handleFilterChange} activeFilters={activeFilters} />

        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="relative mb-12 mt-4 md:mt-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#009c3b]/10 via-[#ffdf00]/10 to-[#002776]/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden">
                <div className="flex flex-col items-center py-8 px-6 md:px-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-[#009c3b] to-[#ffdf00] p-2 rounded-full">
                      <Music className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold">
                      <span className="text-[#009c3b]">Música</span>
                      <span className="text-[#ffdf00]">Brasil</span>
                    </h1>
                  </div>

                  <p className="text-gray-600 mb-8 text-center max-w-lg">
                    Descubra o melhor da música brasileira e internacional escute antes do lançamento
                  </p>

                  <div className="relative w-full max-w-xl">
                    <Input
                      placeholder="Busque por artistas, músicas ou álbuns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-5 pr-14 py-7 rounded-full border-2 border-[#009c3b]/30 focus-visible:ring-[#ffdf00] shadow-md text-lg"
                    />
                    <Button
                      onClick={searchMusic}
                      className="absolute right-1.5 top-1.5 rounded-full bg-gradient-to-r from-[#009c3b] to-[#007c2b] hover:from-[#007c2b] hover:to-[#006c1b] h-12 w-12 p-0 shadow-md transition-transform hover:scale-105"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776]"></div>
              </div>
            </div>

            <Tabs defaultValue="musicas" className="mb-8">
              <TabsList className="bg-white/80 backdrop-blur-sm border border-[#009c3b]/20 p-1 rounded-full shadow-md">
                <TabsTrigger
                  value="musicas"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#009c3b] data-[state=active]:to-[#007c2b] data-[state=active]:text-white transition-all duration-300"
                >
                  Músicas
                </TabsTrigger>
                <TabsTrigger
                  value="artistas"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#009c3b] data-[state=active]:to-[#007c2b] data-[state=active]:text-white transition-all duration-300"
                >
                  Artistas
                </TabsTrigger>
                <TabsTrigger
                  value="albuns"
                  className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#009c3b] data-[state=active]:to-[#007c2b] data-[state=active]:text-white transition-all duration-300"
                >
                  Álbuns
                </TabsTrigger>
              </TabsList>

              <TabsContent value="musicas" className="mt-6">
                <MusicGrid
                  results={results}
                  loading={loading}
                  onTrackSelect={handleTrackSelect}
                  searchTerm={searchTerm}
                />
              </TabsContent>

              <TabsContent value="artistas" className="mt-6">
                <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
                  <div className="bg-[#ffdf00]/10 p-4 rounded-full inline-block mb-4">
                    <User className="h-8 w-8 text-[#009c3b]" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Busca por Artistas</h3>
                  <p className="text-gray-500">Selecione "Músicas" para ver os resultados da busca</p>
                </div>
              </TabsContent>

              <TabsContent value="albuns" className="mt-6">
                <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
                  <div className="bg-[#ffdf00]/10 p-4 rounded-full inline-block mb-4">
                    <Disc3 className="h-8 w-8 text-[#009c3b]" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Busca por Álbuns</h3>
                  <p className="text-gray-500">Selecione "Músicas" para ver os resultados da busca</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {selectedTrack && <MusicPlayer track={selectedTrack} />}

      <Footer />
    </div>
  )
}
