// __test__/components/signup_form.test.tsx
import { render, screen } from "@testing-library/react"
import SignupForm from "@/app/_components/signup_form"

jest.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signUp: jest.fn(),
    },
  }),
}))

describe("SignupForm", () => {
  test("renders fields", () => {
    render(<SignupForm />)

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
    expect(screen.getByText("Sign Up")).toBeInTheDocument()
  })
})