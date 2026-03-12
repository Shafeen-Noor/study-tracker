export interface Quote {
  text: string
  author?: string
}

export async function fetchRandomQuote(): Promise<Quote> {
  const response = await fetch("https://api.quotable.io/random")

  if (!response.ok) {
    throw new Error("Failed to fetch quote")
  }

  const data = await response.json()
  return {
    text: data.content,
    author: data.author,
  }
}
