import { useQuery } from "@tanstack/react-query"
import { fetchRandomQuote } from "../../api/quote"

export function useQuote() {
  return useQuery({
    queryKey: ["quote"],
    queryFn: fetchRandomQuote,
    staleTime: Infinity, // don't auto-refetch, only refetch on button click
    retry: 1,
  })
}
