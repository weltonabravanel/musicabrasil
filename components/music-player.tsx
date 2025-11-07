"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X, Music, Heart } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export function MusicPlayer({ track }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const audioRef = useRef(null)

  useEffect(() => {
    if (track) {
      setIsPlaying(false)
      setCurrentTime(0)

      // Pequeno timeout para garantir que o áudio seja carregado corretamente
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.volume = volume
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              console.error("Erro ao reproduzir áudio:", error)
            })
        }
      }, 100)
    }
  }, [track])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Erro ao reproduzir áudio:", error)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0")
    return `${minutes}:${seconds}`
  }

  if (!track) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-[#009c3b]/20 p-3 md:p-4 shadow-lg z-20">
      <audio
        ref={audioRef}
        src={track.previewUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={handleTimeUpdate}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 md:h-16 md:w-16 rounded-md overflow-hidden shadow-md">
            <img
              src={track.artworkUrl100?.replace("100x100", "300x300") || "/placeholder.svg?height=300&width=300"}
              alt={track.trackName}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-1 right-1 bg-white/80 rounded-full p-0.5">
              <Music className="h-3 w-3 text-[#009c3b]" />
            </div>
          </div>

          <div className="min-w-0">
            <h4 className="font-medium text-sm md:text-base truncate">{track.trackName}</h4>
            <p className="text-xs md:text-sm text-gray-500 truncate">{track.artistName}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-[#009c3b]/10 text-[#009c3b] px-2 py-0.5 rounded-full">
                {track.primaryGenreName || "Música"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-gray-600 hover:text-[#009c3b] hover:bg-[#009c3b]/10"
              disabled
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className={`h-12 w-12 rounded-full border-2 ${
                isPlaying
                  ? "bg-[#009c3b] border-[#009c3b] text-white hover:bg-[#007c2b] hover:border-[#007c2b]"
                  : "border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b]/10"
              } shadow-md transition-all duration-300`}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-gray-600 hover:text-[#009c3b] hover:bg-[#009c3b]/10"
              disabled
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full max-w-xs mt-2">
            <span className="text-xs text-gray-500 w-8 text-right">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration || 120}
              step={0.1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <span className="text-xs text-gray-500 w-8">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-full ${isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-gray-600 hover:text-[#009c3b] hover:bg-[#009c3b]/10"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>

            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-gray-600 hover:text-[#009c3b] hover:bg-[#009c3b]/10 ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776]"
          style={{
            width: `${(currentTime / (duration || 30)) * 100}%`,
            transition: "width 0.1s linear",
          }}
        ></div>
      </div>
    </div>
  )
}
