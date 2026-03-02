// __test__/components/login_form.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import LoginForm from "@/app/_components/login_form"

jest.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithOtp: jest.fn(),
    },
  }),
}))

describe("LoginForm", () => {
  test("renders input and button", () => {
    render(<LoginForm />)

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
    expect(screen.getByText("Login")).toBeInTheDocument()
  })

  test("updates input value", () => {
    render(<LoginForm />)

    const input = screen.getByPlaceholderText("Email")

    fireEvent.change(input, {
      target: { value: "test@test.com" },
    })

    expect(input).toHaveValue("test@test.com")
  })
})