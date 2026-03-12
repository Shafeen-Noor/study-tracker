import { createContext, useContext, useState } from "react"

interface FilterContextType {
  filterSubject: string
  setFilterSubject: (subject: string) => void
}

const FilterContext = createContext<FilterContextType | null>(null)
// eslint-disable-next-line react-refresh/only-export-components
export function useFilter() { 
  const context = useContext(FilterContext)
  if (!context) throw new Error("useFilter must be used inside FilterProvider")
  return context
}

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filterSubject, setFilterSubject] = useState("")

  return (
    <FilterContext.Provider value={{ filterSubject, setFilterSubject }}>
      {children}
    </FilterContext.Provider>
  )
}