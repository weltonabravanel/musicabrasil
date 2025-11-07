"use client"

import { useState, useEffect } from "react"
import { Filter, ChevronDown, Music, Globe, ListFilter, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Sidebar({ onFilterChange, activeFilters }) {
  const [isOpen, setIsOpen] = useState(false)
  const [limit, setLimit] = useState(activeFilters.limit)

  const genres = [
    { value: "all", label: "Todos os gêneros" },
    { value: "pop", label: "Pop" },
    { value: "rock", label: "Rock" },
    { value: "mpb", label: "MPB" },
    { value: "sertanejo", label: "Sertanejo" },
    { value: "samba", label: "Samba" },
    { value: "funk", label: "Funk" },
    { value: "rap", label: "Rap/Hip-Hop" },
    { value: "electronic", label: "Eletrônica" },
    { value: "classical", label: "Clássica" },
    { value: "jazz", label: "Jazz" },
    { value: "bossa-nova", label: "Bossa Nova" },
    { value: "forro", label: "Forró" },
    { value: "axe", label: "Axé" },
  ]

  const countries = [
    { value: "br", label: "Brasil" },
    { value: "us", label: "Estados Unidos" },
    { value: "pt", label: "Portugal" },
    { value: "es", label: "Espanha" },
    { value: "mx", label: "México" },
    { value: "ar", label: "Argentina" },
    { value: "co", label: "Colômbia" },
  ]

  useEffect(() => {
    setLimit(activeFilters.limit)
  }, [activeFilters.limit])

  const handleLimitChange = (value) => {
    setLimit(value[0])
    onFilterChange({ limit: value[0] })
  }

  return (
    <>
      <div className="md:hidden p-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-between border-[#009c3b]/30 bg-white/80 backdrop-blur-sm shadow-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-[#009c3b]" />
            Filtros
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
        </Button>
      </div>

      <aside
        className={`bg-white/80 backdrop-blur-sm border-r border-[#009c3b]/10 w-full md:w-72 p-4 md:p-6 shadow-sm ${
          isOpen ? "block" : "hidden"
        } md:block transition-all duration-300`}
      >
        <div className="sticky top-20">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-6 w-1 bg-gradient-to-b from-[#009c3b] to-[#ffdf00] rounded-full"></div>
            <h2 className="font-bold text-lg text-gray-800">Filtros</h2>
          </div>

          <Accordion type="single" collapsible defaultValue="genre" className="space-y-4">
            <AccordionItem value="genre" className="border border-[#009c3b]/10 rounded-lg shadow-sm">
              <AccordionTrigger className="text-sm font-medium px-4 py-3 hover:bg-[#009c3b]/5 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-[#009c3b]" />
                  <span>Gênero Musical</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <Select value={activeFilters.genre} onValueChange={(value) => onFilterChange({ genre: value })}>
                  <SelectTrigger className="w-full border-[#009c3b]/20 focus:ring-[#ffdf00]/50">
                    <SelectValue placeholder="Selecione um gênero" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {genres.map((genre) => (
                      <SelectItem key={genre.value} value={genre.value}>
                        {genre.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="country" className="border border-[#009c3b]/10 rounded-lg shadow-sm">
              <AccordionTrigger className="text-sm font-medium px-4 py-3 hover:bg-[#009c3b]/5 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[#009c3b]" />
                  <span>País</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <Select value={activeFilters.country} onValueChange={(value) => onFilterChange({ country: value })}>
                  <SelectTrigger className="w-full border-[#009c3b]/20 focus:ring-[#ffdf00]/50">
                    <SelectValue placeholder="Selecione um país" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="limit" className="border border-[#009c3b]/10 rounded-lg shadow-sm">
              <AccordionTrigger className="text-sm font-medium px-4 py-3 hover:bg-[#009c3b]/5 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <ListFilter className="h-4 w-4 text-[#009c3b]" />
                  <span>Quantidade</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <div className="space-y-4">
                  <Slider
                    defaultValue={[limit]}
                    min={5}
                    max={50}
                    step={5}
                    onValueChange={handleLimitChange}
                    className="mt-6"
                  />
                  <div className="text-center text-sm text-gray-500 font-medium">{limit} resultados</div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-6">
            <Button
              className="w-full bg-gradient-to-r from-[#009c3b] to-[#007c2b] hover:from-[#007c2b] hover:to-[#006c1b] text-white shadow-md transition-all duration-300 hover:shadow-lg"
              onClick={() => {
                onFilterChange({
                  genre: "all",
                  country: "br",
                  limit: 20,
                })
              }}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-br from-[#009c3b]/10 to-[#ffdf00]/10 rounded-lg border border-[#009c3b]/10">
            <h3 className="font-medium text-sm mb-2 text-gray-700">Dica</h3>
            <p className="text-xs text-gray-600">
              Experimente buscar por artistas brasileiros como "Caetano Veloso", "Anitta" ou "Seu Jorge" para descobrir
              o melhor da música nacional.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
