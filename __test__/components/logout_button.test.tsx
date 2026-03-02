// __test__/components/logout_button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import LogoutButton from "@/app/_components/logout_button"

jest.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signOut: jest.fn(),
    },
  }),
}))

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe("LogoutButton", () => {
  test("renders button", () => {
    render(<LogoutButton />)

    expect(screen.getByText("Logout")).toBeInTheDocument()
  })
})