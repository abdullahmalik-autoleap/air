import type { AuthCredentials, AuthUser } from "../types"

export const mockSignIn = async (credentials: AuthCredentials): Promise<AuthUser> => {
  if (!credentials.email || !credentials.password) {
    throw new Error("Invalid credentials")
  }
  await new Promise((r) => setTimeout(r, 500))
  return { id: "user_1", email: credentials.email }
}

export const mockSignUp = async (credentials: AuthCredentials): Promise<AuthUser> => {
  if (!credentials.email || !credentials.password) {
    throw new Error("Invalid credentials")
  }
  await new Promise((r) => setTimeout(r, 700))
  return { id: "user_1", email: credentials.email }
}


