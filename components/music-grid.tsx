"use client"

import { Disc3, Music2, Play, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function MusicGrid({ results, loading, onTrackSelect, searchTerm }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Card
              key={i}
              className="overflow-hidden bg-white/60 backdrop-blur-sm border-[#009c3b]/10 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-0">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    )
  }

  if (results.length === 0 && searchTerm) {
    return (
      <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
        <div className="bg-[#ffdf00]/10 p-6 rounded-full inline-block mb-6">
          <Disc3 className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-medium text-gray-900 mb-2">Nenhum resultado encontrado</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Não encontramos resultados para "<span className="font-medium">{searchTerm}</span>". Tente outra busca ou
          verifique os filtros aplicados.
        </p>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
        <div className="bg-[#ffdf00]/10 p-6 rounded-full inline-block mb-6">
          <Music2 className="h-12 w-12 text-[#009c3b]" />
        </div>
        <h3 className="text-2xl font-medium text-gray-900 mb-2">Descubra novas músicas</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Digite o nome de um artista, música ou álbum na barra de pesquisa para começar a explorar
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {results.map((item) => (
        <Card
          key={item.trackId}
          className="overflow-hidden bg-white/60 backdrop-blur-sm border-[#009c3b]/10 shadow-md hover:shadow-lg transition-all duration-300 group"
        >
          <CardContent className="p-0">
            <div className="relative pb-[100%]">
              <img
                src={item.artworkUrl100?.replace("100x100", "300x300") || "/placeholder.svg?height=300&width=300"}
                alt={item.trackName || item.collectionName}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => onTrackSelect(item)}
                  className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                >
                  <Play className="h-6 w-6 text-[#009c3b] ml-0.5" />
                </button>
              </div>
              {item.trackExplicitness === "explicit" && (
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
                  Explícito
                </div>
              )}
            </div>
            <div className="p-4">
              <h3
                className="font-medium text-sm line-clamp-1 group-hover:text-[#009c3b] transition-colors"
                title={item.trackName || item.collectionName}
              >
                {item.trackName || item.collectionName}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-1 mt-1" title={item.artistName}>
                {item.artistName}
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center text-xs text-gray-500">
                  <Info className="h-3 w-3 mr-1" />
                  {item.primaryGenreName || "Música"}
                </div>
                <button
                  onClick={() => onTrackSelect(item)}
                  className="text-xs font-medium text-[#009c3b] hover:text-[#007c2b] transition-colors"
                >
                  Ouvir
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
