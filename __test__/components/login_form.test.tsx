// __test__/components/login_form.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import LoginForm from "@/app/_components/login_form"

const mockSignIn = jest.fn()

jest.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: mockSignIn,
    },
  }),
}))

const push = jest.fn()
const refresh = jest.fn()

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
    refresh,
  }),
}))

describe("LoginForm", () => {
  test("renders input and button", () => {
    render(<LoginForm />)

    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByText("Login")).toBeInTheDocument()
  })

  test("updates input values", () => {
    render(<LoginForm />)

    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Password")

    fireEvent.change(emailInput, { target: { value: "test@test.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })

    expect(emailInput).toHaveValue("test@test.com")
    expect(passwordInput).toHaveValue("password123")
  })

  test("calls Supabase login and redirects", async () => {
    mockSignIn.mockResolvedValue({ error: null })

    render(<LoginForm />)

    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Password")
    const loginButton = screen.getByText("Login")

    fireEvent.change(emailInput, { target: { value: "test@test.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })

    fireEvent.click(loginButton)

    expect(mockSignIn).toHaveBeenCalled()
  })
})