"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MusicPlayer } from "@/components/music-player"
import { ArtistCircles } from "@/components/artist-circles"
import { Trophy, Music, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TopBrasil() {
  const [topTracks, setTopTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        setLoading(true)
        // Buscar as músicas mais populares do Brasil
        const response = await fetch("/api/itunes/top-brasil")
        const data = await response.json()

        if (data.results) {
          setTopTracks(data.results)
        } else {
          setError("Não foi possível carregar as músicas populares")
        }
      } catch (err) {
        console.error("Erro ao buscar top músicas:", err)
        setError("Erro ao carregar as músicas populares")
      } finally {
        setLoading(false)
      }
    }

    fetchTopTracks()
  }, [])

  const handleTrackSelect = (track) => {
    setSelectedTrack(track)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f0f8ff] to-[#e6f7ff]">
      <Header />

      <div className="w-full bg-gradient-to-r from-[#009c3b]/90 via-[#ffdf00]/80 to-[#002776]/90 h-2" />

      <ArtistCircles />

      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="relative mb-10 mt-4 md:mt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[#009c3b]/10 via-[#ffdf00]/10 to-[#002776]/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden">
            <div className="flex flex-col items-center py-8 px-6 md:px-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-[#009c3b] to-[#ffdf00] p-2 rounded-full">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  <span className="text-[#009c3b]">Top 10</span> <span className="text-gray-800">Brasil</span>
                </h1>
              </div>

              <p className="text-gray-600 text-center max-w-lg">As músicas mais populares do Brasil neste momento</p>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776]"></div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-[#009c3b] animate-spin mb-4" />
            <p className="text-gray-600">Carregando as músicas mais populares...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
            <div className="bg-red-100 p-4 rounded-full inline-block mb-4">
              <Music className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Ops! Algo deu errado</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {topTracks.map((track, index) => (
              <Card
                key={track.trackId || index}
                className="bg-white/60 backdrop-blur-sm border-[#009c3b]/10 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <CardContent className="p-0">
                  <div className="flex items-center p-0">
                    <div className="flex items-center justify-center bg-gradient-to-r from-[#009c3b]/80 to-[#007c2b] text-white font-bold text-xl md:text-2xl w-16 md:w-20 h-full p-4 md:p-6">
                      {index + 1}
                    </div>

                    <div className="flex flex-1 items-center p-4">
                      <div className="relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0 rounded-md overflow-hidden shadow-md mr-4">
                        <img
                          src={
                            track.artworkUrl100?.replace("100x100", "300x300") ||
                            "/placeholder.svg?height=300&width=300" ||
                            "/placeholder.svg"
                          }
                          alt={track.trackName || track.collectionName}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-base md:text-lg truncate group-hover:text-[#009c3b] transition-colors">
                          {track.trackName || track.collectionName}
                        </h3>
                        <p className="text-sm text-gray-500 truncate mt-1">{track.artistName}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="bg-[#009c3b]/10 text-[#009c3b] border-[#009c3b]/20">
                            {track.primaryGenreName || "Música"}
                          </Badge>
                          {track.trackExplicitness === "explicit" && (
                            <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
                              Explícito
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="ml-4">
                        <button
                          onClick={() => handleTrackSelect(track)}
                          className="bg-[#009c3b]/10 hover:bg-[#009c3b] text-[#009c3b] hover:text-white p-3 rounded-full transition-colors duration-300"
                        >
                          <Music className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {selectedTrack && <MusicPlayer track={selectedTrack} />}

      <Footer />
    </div>
  )
}
