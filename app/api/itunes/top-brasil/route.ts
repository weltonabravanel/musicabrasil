import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Buscar as músicas mais populares do Brasil
    // Podemos usar termos populares ou artistas brasileiros conhecidos
    const popularTerms = ["musica brasileira", "mpb", "sertanejo", "pop brasil"]

    // Escolher um termo aleatório para variar os resultados
    const randomTerm = popularTerms[Math.floor(Math.random() * popularTerms.length)]

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(randomTerm)}&country=br&limit=10&media=music`

    const response = await fetch(url)
    const data = await response.json()

    // Filtrar e ordenar os resultados para garantir qualidade
    let results = data.results || []

    // Filtrar apenas músicas com preview disponível
    results = results.filter((item) => item.previewUrl)

    // Ordenar por popularidade (usando o campo popularity se disponível, ou trackTimeMillis como aproximação)
    results.sort((a, b) => (b.trackTimeMillis || 0) - (a.trackTimeMillis || 0))

    // Limitar a 10 resultados
    results = results.slice(0, 10)

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Erro ao buscar top músicas do Brasil:", error)
    return NextResponse.json({ error: "Erro ao buscar dados da API do iTunes" }, { status: 500 })
  }
}
