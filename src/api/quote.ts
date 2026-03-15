import type { Quote } from '../shared/types'

interface QuotableResponse {
  content: string
  author: string
}

export async function fetchRandomQuote(): Promise<Quote> {
  const response = await fetch('https://api.quotable.io/random?tags=inspirational|education')
  if (!response.ok) {
    throw new Error(`Failed to fetch quote: ${response.status}`)
  }
  const data = (await response.json()) as QuotableResponse
  return {
    text: data.content,
    author: data.author ?? null,
  }
}
