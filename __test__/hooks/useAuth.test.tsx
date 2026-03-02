// __test__/hooks/useAuth.test.tsx
import { renderHook } from "@testing-library/react"
import { useAuth } from "@/lib/hooks/useAuth"

jest.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      getUser: () =>
        Promise.resolve({
          data: { user: null },
        }),
      onAuthStateChange: () => ({
        data: {
          subscription: {
            unsubscribe: jest.fn(),
          },
        },
      }),
    },
  }),
}))

describe("useAuth", () => {
  test("returns user", async () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.user).toBe(null)
  })
})