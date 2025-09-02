import { AuthForm } from "@/features/auth"

export default function SignInPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <AuthForm mode="sign-in" />
      </div>
    </main>
  )
}


