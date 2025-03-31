import { login, signup } from "./actions"

export default function LoginPage() {
  return (
    <form>
      <div className="max-w-xs border-b border-gray-100">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="max-w-xs border-b border-gray-100">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={8}
          required
        />
      </div>
      <button
        formAction={login}
        className="mt-1 ml-2 px-2 py-1 bg-gray-100 cursor-pointer rounded-lg"
      >
        ログイン
      </button>
      <button
        formAction={signup}
        className="mt-1 ml-2 px-2 py-1 bg-gray-100 cursor-pointer rounded-lg"
      >
        新規登録
      </button>
    </form>
  )
}