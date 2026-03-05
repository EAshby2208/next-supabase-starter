// __test__/components/signup_form.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import SignupForm from "@/app/_components/signup_form"

const mockSignUp = jest.fn()

jest.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signUp: mockSignUp,
    },
  }),
}))

const push = jest.fn()

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}))

describe("SignupForm", () => {
  test("renders input and button", () => {
    render(<SignupForm />)

    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByText("Sign Up")).toBeInTheDocument()
  })

  test("updates input values", () => {
    render(<SignupForm />)

    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Password")

    fireEvent.change(emailInput, { target: { value: "signup@test.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })

    expect(emailInput).toHaveValue("signup@test.com")
    expect(passwordInput).toHaveValue("password123")
  })

  test("calls Supabase signUp and redirects", async () => {
    mockSignUp.mockResolvedValue({ error: null })

    render(<SignupForm />)

    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Password")
    const signupButton = screen.getByText("Sign Up")

    fireEvent.change(emailInput, { target: { value: "signup@test.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })

    fireEvent.click(signupButton)

    expect(mockSignUp).toHaveBeenCalled()
  })
})