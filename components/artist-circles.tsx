"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Artist {
  id: string
  name: string
  image: string
}

const BRAZILIAN_ARTISTS: Artist[] = [
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

export function ArtistCircles() {
  const router = useRouter()
  const [activeArtist, setActiveArtist] = useState<string | null>(null)

  const handleArtistClick = (artist: Artist) => {
    setActiveArtist(artist.id)
    router.push(`/descobrir?artist=${encodeURIComponent(artist.name)}`)
  }

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border-b border-[#009c3b]/10 py-4 px-2 overflow-hidden shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-1 mb-2 px-2">
          <div className="h-5 w-1 bg-gradient-to-b from-[#009c3b] to-[#ffdf00] rounded-full mr-1"></div>
          <h2 className="text-sm font-medium text-gray-700">Artistas Brasileiros</h2>
        </div>

        <div className="flex overflow-x-auto pb-2 px-2 scrollbar-hide">
          <div className="flex gap-4">
            {BRAZILIAN_ARTISTS.map((artist) => (
              <div
                key={artist.id}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => handleArtistClick(artist)}
              >
                <div className="relative mb-1">
                  <div
                    className={cn(
                      "absolute -inset-1 rounded-full bg-gradient-to-br opacity-70 group-hover:opacity-100 transition-opacity",
                      activeArtist === artist.id
                        ? "from-[#009c3b] via-[#ffdf00] to-[#002776] animate-spin-slow"
                        : "from-[#009c3b]/40 via-[#ffdf00]/40 to-[#002776]/40",
                    )}
                  ></div>
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white bg-white">
                    <img
                      src={artist.image || "/placeholder.svg"}
                      alt={artist.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
                <span className="text-xs text-center w-16 truncate">{artist.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
