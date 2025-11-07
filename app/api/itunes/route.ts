import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const term = searchParams.get("term")
  const country = searchParams.get("country") || "br"
  const limit = searchParams.get("limit") || "20"
  const genre = searchParams.get("genre")

  if (!term) {
    return NextResponse.json({ error: "Termo de busca é obrigatório" }, { status: 400 })
  }

  try {
    let url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=${country}&limit=${limit}&media=music`

    if (genre && genre !== "all") {
      url += `&genre=${encodeURIComponent(genre)}`
    }

    const response = await fetch(url)
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro ao buscar na API do iTunes:", error)
    return NextResponse.json({ error: "Erro ao buscar dados da API do iTunes" }, { status: 500 })
  }
}
