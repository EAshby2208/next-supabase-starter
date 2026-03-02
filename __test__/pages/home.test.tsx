// __test__/pages/home.test.tsx
import { render, screen } from "@testing-library/react"
import Home from "@/app/page"

jest.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({
    auth: {
      getUser: async () => ({
        data: { user: null },
      }),
    },
  }),
}))

describe("Home page", () => {
  test("renders starter app title", async () => {
    const Page = await Home()

    render(Page)

    expect(screen.getByText("Starter App")).toBeInTheDocument()
  })
})