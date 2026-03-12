import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ThemeModeProvider } from "../context/ThemeContext"
import RootLayout from "./RootLayout"

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeModeProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </ThemeModeProvider>
)

describe("RootLayout", () => {
  it("smoke: renders without crashing", () => {
    render(<RootLayout />, { wrapper: Wrapper })
  })

  it("smoke: shows navigation links", () => {
    render(<RootLayout />, { wrapper: Wrapper })
    expect(screen.getByText("Add Entry")).toBeInTheDocument()
    expect(screen.getByText("My Entries")).toBeInTheDocument()
  })
})
