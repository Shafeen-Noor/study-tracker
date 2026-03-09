import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AddEntry from "./AddEntry"

const mockAddEntry = vi.fn()

vi.mock("react-router-dom", () => ({
  useOutletContext: () => ({ addEntry: mockAddEntry }),
}))

describe("AddEntry", () => {
  beforeEach(() => {
    mockAddEntry.mockClear()
  })

  it("smoke: renders without crashing", () => {
    render(<AddEntry />)
  })

  it("smoke: shows all form fields", () => {
    render(<AddEntry />)
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/topic/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/hours/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
  })

  it("user interaction: user can type into fields and submit the form", async () => {
    const user = userEvent.setup()
    render(<AddEntry />)

    await user.type(screen.getByLabelText(/subject/i), "Math")
    await user.type(screen.getByLabelText(/topic/i), "Algebra")
    await user.clear(screen.getByLabelText(/hours/i))
    await user.type(screen.getByLabelText(/hours/i), "2")
    await user.type(screen.getByLabelText(/date/i), "2024-01-15")

    await user.click(screen.getByRole("button", { name: /add entry/i }))

    expect(mockAddEntry).toHaveBeenCalledTimes(1)
    expect(mockAddEntry).toHaveBeenCalledWith({
      subject: "Math",
      topic: "Algebra",
      hours: 2,
      notes: "",
      date: "2024-01-15",
    })
  })

  it("user interaction: fields clear after successful submit", async () => {
    const user = userEvent.setup()
    render(<AddEntry />)

    await user.type(screen.getByLabelText(/subject/i), "Science")
    await user.type(screen.getByLabelText(/topic/i), "Physics")
    await user.type(screen.getByLabelText(/date/i), "2024-01-15")

    await user.click(screen.getByRole("button", { name: /add entry/i }))

    expect(screen.getByLabelText(/subject/i)).toHaveValue("")
    expect(screen.getByLabelText(/topic/i)).toHaveValue("")
  })
})
