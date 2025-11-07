"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MusicPlayer } from "@/components/music-player"
import { MusicGrid } from "@/components/music-grid"
import { ArtistCircles } from "@/components/artist-circles"
import { Search, Sparkles, Disc3, Flame, Clock, Mic2, Radio, Headphones } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"

const BRAZILIAN_ARTISTS = [
  {
    id: "caetano-veloso",
    name: "Caetano Veloso",
    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQbzyMsUP8zURLLWl0jefwMIAFuYCRgmQvbbEev09Aw0e4wJWXZ4e7e4e9h2XQqML0n4U6Q95QpBLcO1bQjUTZaB_2DSeaXFVs_f0mF-Q",
  },
  {
    id: "anitta",
    name: "Anitta",
    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR2E3dItz9-q7V26n-MLPMseT48JxGe56ySfQ2BhPGqw0nxHwP_YKUPRFmytaYvYubq2FhTfOOSVppP6wgddeVJCQ",
  },
  {
    id: "gilberto-gil",
    name: "Gilberto Gil",
    image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS2RsYadL3P3ryqXqfekekpSv1GNYUwn_Hk4_K9ViqIJiLKtCOzF7hQ_tI-J-zlSbQrzUgRvy7lZw2fou2fk0d6mg",
  },
  {
    id: "marisa-monte",
    name: "Marisa Monte",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTO1L8lQ-Ti2ewuOt9LGQr0mOkDETFaPUjxgvR1smkzpaZpQtfAaRaNdxZaH-qpqtMnl92xoZFvSyfKxnMzoWeD5Q",
  },
  {
    id: "seu-jorge",
    name: "Seu Jorge",
    image: "https://img.melhoresfilmes.com.br/unsafe/480x640/https%3A%2F%2Fwww.melhoresfilmes.com.br%2Fstorage%2Fimgs%2Factors%2F13918.jpg%3Ft%3D20221025001608",
  },
  {
    id: "maria-bethania",
    name: "Maria Bethânia",
    image: "https://www4.ecad.org.br/wp-content/uploads/2022/03/shutterstock_1037550553.png",
  },
  {
    id: "jorge-ben-jor",
    name: "Jorge Ben Jor",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCIiP-IGfFMoFcqXc0vALHhnVCvOOv46LLgw&s",
  },
  {
    id: "gal-costa",
    name: "Gal Costa",
    image: "https://i.scdn.co/image/ab6761610000e5ebce25c56eb261c36e5ebc7864",
  },
  {
    id: "djavan",
    name: "Djavan",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeIwkyE8fSFLUQFajDYK12UVy0Bs9suw_jvA&s",
  },
  {
    id: "ivete-sangalo",
    name: "Ivete Sangalo",
    image: "https://carnavalbrasileiro.com/wp-content/uploads/2025/02/Ivete.jpg",
  },
  {
    id: "chico-buarque",
    name: "Chico Buarque",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrzHQVUfprTJdgdxaPFuk2tIRfj9NIuQeTCw&s",
  },
  {
    id: "ludmilla",
    name: "Ludmilla",
    image: "https://dicionariompb.com.br/wp-content/uploads/2021/04/ludmilla.jpeg",
  },
  {
    id: "milton-nascimento",
    name: "Milton Nascimento",
    image: "https://dicionariompb.com.br/wp-content/uploads/2021/04/116096421_3691127527582652_6051391570210629779_n.jpg",
  },
  {
    id: "luisa-sonza",
    name: "Luísa Sonza",
    image: "https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/05/luisa-sonza.jpg?w=1200&h=900&crop=1",
  },
  {
    id: "tim-maia",
    name: "Tim Maia",
    image: "https://braziljournal.com/wp-content/uploads/2024/03/tim-maia-memoria-857x482.jpg?x83830",
  },
  {
    id: "alceu-valenca",
    name: "Alceu Valença",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREpNaKV5a0hyEMZxoJxkv4h6w6jgZ0De46MQ&s",
  },
  {
    id: "elza-soares",
    name: "Elza Soares",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoIqwUVcxdIifiSflpZnILaiBijzVjgtWDIA&s",
  },
  {
    id: "zeca-pagodinho",
    name: "Zeca Pagodinho",
    image: "https://i.scdn.co/image/ab6761610000e5ebba8ad8a2315ed9148c7b1cc7",
  },
]

const CATEGORIAS_POPULARES = [
  { id: "mpb", nome: "MPB", icon: <Mic2 className="h-5 w-5" />, cor: "from-green-500 to-green-600" },
  { id: "sertanejo", nome: "Sertanejo", icon: <Radio className="h-5 w-5" />, cor: "from-amber-500 to-amber-600" },
  { id: "samba", nome: "Samba", icon: <Disc3 className="h-5 w-5" />, cor: "from-blue-500 to-blue-600" },
  { id: "funk", nome: "Funk", icon: <Flame className="h-5 w-5" />, cor: "from-red-500 to-red-600" },
  { id: "rock", nome: "Rock", icon: <Headphones className="h-5 w-5" />, cor: "from-purple-500 to-purple-600" },
  { id: "pop", nome: "Pop", icon: <Sparkles className="h-5 w-5" />, cor: "from-pink-500 to-pink-600" },
]

const ARTISTAS_POPULARES = [
  { id: "anitta", nome: "Anitta" },
  { id: "caetano-veloso", nome: "Caetano Veloso" },
  { id: "marisa-monte", nome: "Marisa Monte" },
  { id: "seu-jorge", nome: "Seu Jorge" },
  { id: "gilberto-gil", nome: "Gilberto Gil" },
  { id: "ludmilla", nome: "Ludmilla" },
  { id: "jorge-ben-jor", nome: "Jorge Ben Jor" },
  { id: "maria-bethania", nome: "Maria Bethânia" },
]

export default function Descobrir() {
  const searchParams = useSearchParams()
  const artistParam = searchParams.get("artist")

  const [searchTerm, setSearchTerm] = useState(artistParam || "")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [recentSearches, setRecentSearches] = useState([])
  const [activeTab, setActiveTab] = useState("recomendacoes")
  const [artistInfo, setArtistInfo] = useState(null)

  useEffect(() => {
    // Carregar buscas recentes do localStorage
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }

    // Se tiver um artista nos parâmetros, fazer a busca automaticamente
    if (artistParam) {
      setSearchTerm(artistParam)
      searchMusic(artistParam)
      setActiveTab("resultados")

      // Simular informações do artista
      setArtistInfo({
        name: artistParam,
        image: BRAZILIAN_ARTISTS.find((a) => a.name === artistParam)?.image || null,
      })
    }
  }, [artistParam])

  const searchMusic = async (term, options = {}) => {
    if (!term) return

    setLoading(true)
    try {
      const params = new URLSearchParams({
        term: encodeURIComponent(term),
        country: options.country || "br",
        limit: options.limit || "20",
      })

      if (options.genre && options.genre !== "all") {
        params.append("genre", options.genre)
      }

      const response = await fetch(`/api/itunes?${params.toString()}`)
      const data = await response.json()

      setResults(data.results || [])

      // Salvar busca recente
      if (!options.skipSaveSearch) {
        const newSearch = { term, timestamp: new Date().toISOString() }
        const updatedSearches = [newSearch, ...recentSearches.filter((s) => s.term !== term)].slice(0, 5)
        setRecentSearches(updatedSearches)
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
      }
    } catch (error) {
      console.error("Erro ao buscar músicas:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMusic(searchTerm)
      setActiveTab("resultados")
      setArtistInfo(null) // Limpar informações do artista quando for uma busca genérica
    }
  }

  const handleTrackSelect = (track) => {
    setSelectedTrack(track)
  }

  const handleCategoryClick = (categoria) => {
    searchMusic(categoria.nome, { genre: categoria.id, skipSaveSearch: true })
    setActiveTab("resultados")
    setArtistInfo(null)
  }

  const handleArtistClick = (artista) => {
    setSearchTerm(artista.nome)
    searchMusic(artista.nome, { skipSaveSearch: true })
    setActiveTab("resultados")

    // Simular informações do artista
    setArtistInfo({
      name: artista.nome,
      image: BRAZILIAN_ARTISTS.find((a) => a.name === artista.nome)?.image || null,
    })
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
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  <span className="text-[#009c3b]">Descobrir</span> <span className="text-gray-800">Música</span>
                </h1>
              </div>

              <p className="text-gray-600 text-center max-w-lg mb-6">
                Explore novos artistas, gêneros e descubra músicas que combinam com seu gosto
              </p>

              <div className="relative w-full max-w-2xl">
                <Input
                  placeholder="Busque por artistas, músicas, gêneros ou humor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-5 pr-14 py-7 rounded-full border-2 border-[#009c3b]/30 focus-visible:ring-[#ffdf00] shadow-md text-lg"
                />
                <Button
                  onClick={() => {
                    searchMusic(searchTerm)
                    setActiveTab("resultados")
                    setArtistInfo(null)
                  }}
                  className="absolute right-1.5 top-1.5 rounded-full bg-gradient-to-r from-[#009c3b] to-[#007c2b] hover:from-[#007c2b] hover:to-[#006c1b] h-12 w-12 p-0 shadow-md transition-transform hover:scale-105"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776]"></div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-[#009c3b]/20 p-1 rounded-full shadow-md">
            <TabsTrigger
              value="recomendacoes"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#009c3b] data-[state=active]:to-[#007c2b] data-[state=active]:text-white transition-all duration-300"
            >
              Recomendações
            </TabsTrigger>
            <TabsTrigger
              value="categorias"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#009c3b] data-[state=active]:to-[#007c2b] data-[state=active]:text-white transition-all duration-300"
            >
              Categorias
            </TabsTrigger>
            <TabsTrigger
              value="artistas"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#009c3b] data-[state=active]:to-[#007c2b] data-[state=active]:text-white transition-all duration-300"
            >
              Artistas
            </TabsTrigger>
            <TabsTrigger
              value="resultados"
              className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#009c3b] data-[state=active]:to-[#007c2b] data-[state=active]:text-white transition-all duration-300"
              disabled={results.length === 0}
            >
              Resultados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recomendacoes" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/60 backdrop-blur-sm border-[#009c3b]/10 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#009c3b]/10 p-2 rounded-full">
                      <Flame className="h-5 w-5 text-[#009c3b]" />
                    </div>
                    <h3 className="text-lg font-medium">Tendências Musicais</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Descubra o que está bombando no momento na cena musical brasileira
                  </p>
                  <Button
                    onClick={() => {
                      searchMusic("tendências musicais brasil", { skipSaveSearch: true })
                      setActiveTab("resultados")
                      setArtistInfo(null)
                    }}
                    className="bg-[#009c3b] hover:bg-[#007c2b] text-white w-full"
                  >
                    Explorar Tendências
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/60 backdrop-blur-sm border-[#009c3b]/10 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#ffdf00]/20 p-2 rounded-full">
                      <Sparkles className="h-5 w-5 text-[#ffdf00]" />
                    </div>
                    <h3 className="text-lg font-medium">Descubra Novos Artistas</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Conheça talentos emergentes da música brasileira que você vai adorar
                  </p>
                  <Button
                    onClick={() => {
                      searchMusic("novos artistas brasileiros", { skipSaveSearch: true })
                      setActiveTab("resultados")
                      setArtistInfo(null)
                    }}
                    className="bg-gradient-to-r from-[#ffdf00] to-[#ffc700] hover:from-[#ffc700] hover:to-[#ffb700] text-gray-800 w-full"
                  >
                    Descobrir Novos Talentos
                  </Button>
                </CardContent>
              </Card>
            </div>

            {recentSearches.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <h3 className="text-lg font-medium">Buscas Recentes</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="bg-white/60 border-[#009c3b]/20 hover:border-[#009c3b] hover:bg-[#009c3b]/5"
                      onClick={() => {
                        setSearchTerm(search.term)
                        searchMusic(search.term)
                        setActiveTab("resultados")
                        setArtistInfo(null)
                      }}
                    >
                      {search.term}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="categorias" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {CATEGORIAS_POPULARES.map((categoria) => (
                <Card
                  key={categoria.id}
                  className="bg-white/60 backdrop-blur-sm border-[#009c3b]/10 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
                  onClick={() => handleCategoryClick(categoria)}
                >
                  <CardContent className="p-0">
                    <div
                      className={`bg-gradient-to-br ${categoria.cor} p-6 flex justify-center items-center text-white`}
                    >
                      {categoria.icon}
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-medium group-hover:text-[#009c3b] transition-colors">{categoria.nome}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="artistas" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ARTISTAS_POPULARES.map((artista) => (
                <Card
                  key={artista.id}
                  className="bg-white/60 backdrop-blur-sm border-[#009c3b]/10 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => handleArtistClick(artista)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-20 h-20 mx-auto bg-[#009c3b]/10 rounded-full flex items-center justify-center mb-3 overflow-hidden">
                      {BRAZILIAN_ARTISTS.find((a) => a.name === artista.nome)?.image ? (
                        <img
                          src={BRAZILIAN_ARTISTS.find((a) => a.name === artista.nome)?.image || "/placeholder.svg"}
                          alt={artista.nome}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Mic2 className="h-8 w-8 text-[#009c3b]" />
                      )}
                    </div>
                    <h3 className="font-medium group-hover:text-[#009c3b] transition-colors">{artista.nome}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resultados" className="mt-6">
            {artistInfo && (
              <div className="mb-6 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#009c3b]/10">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-[#009c3b]/20">
                    {artistInfo.image ? (
                      <img
                        src={artistInfo.image || "/placeholder.svg"}
                        alt={artistInfo.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#009c3b]/10 flex items-center justify-center">
                        <Mic2 className="h-8 w-8 text-[#009c3b]" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{artistInfo.name}</h2>
                    <p className="text-gray-600">Resultados para músicas de {artistInfo.name}</p>
                  </div>
                </div>
              </div>
            )}
            <MusicGrid results={results} loading={loading} onTrackSelect={handleTrackSelect} searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>
      </main>

      {selectedTrack && <MusicPlayer track={selectedTrack} />}

      <Footer />
    </div>
  )
}

