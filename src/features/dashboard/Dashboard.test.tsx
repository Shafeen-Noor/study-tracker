import { render, screen } from "@testing-library/react"
import Dashboard from "./Dashboard"
import type { StudyEntry } from "../../Logic"

const mockEntries: StudyEntry[] = [
  { subject: "Math", topic: "Algebra", hours: 2, date: "2024-01-15" },
]

vi.mock("react-router-dom", () => ({
  useOutletContext: () => ({ entries: mockEntries }),
}))

describe("Dashboard", () => {
  it("smoke: renders without crashing", () => {
    render(<Dashboard />)
  })

  it("smoke: shows the Dashboard heading", () => {
    render(<Dashboard />)
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
  })

  it("smoke: shows the subject name", () => {
    render(<Dashboard />)
    expect(screen.getByText("Math")).toBeInTheDocument()
  })
})
