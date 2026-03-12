import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { SubjectsProvider } from "../../context/SubjectContext"
import AddEntry from "./AddEntry"

const mockAddEntry = vi.fn()

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useOutletContext: () => ({ addEntry: mockAddEntry }),
  }
})

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <SubjectsProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </SubjectsProvider>
)

describe("AddEntry", () => {
  beforeEach(() => {
    mockAddEntry.mockClear()
  })

  it("smoke: renders without crashing", () => {
    render(<AddEntry />, { wrapper: Wrapper })
  })

  it("smoke: shows all form fields", () => {
    render(<AddEntry />, { wrapper: Wrapper })
    expect(screen.getByText("Add Study Entry")).toBeInTheDocument()
    expect(screen.getByLabelText(/hours/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
  })

  it("user interaction: user can fill hours field", async () => {
    const user = userEvent.setup()
    render(<AddEntry />, { wrapper: Wrapper })

    await user.clear(screen.getByLabelText(/hours/i))
    await user.type(screen.getByLabelText(/hours/i), "2")

    expect(screen.getByLabelText(/hours/i)).toHaveValue(2)
  })

  it("user interaction: user can fill date field", async () => {
    const user = userEvent.setup()
    render(<AddEntry />, { wrapper: Wrapper })

    await user.type(screen.getByLabelText(/date/i), "2024-01-15")

    expect(screen.getByLabelText(/date/i)).toHaveValue("2024-01-15")
  })
})
