import { login, signup } from "./actions"

export default function LoginPage() {
  return (
    <div>
      <p>新規登録の際は8文字以上のパスワードを設定してください。<br />
        8文字よりも短いと、エラーとなり登録ができません。</p>
      <p>入力したメールアドレスに、「Supabase Auth」というところから「Confirm Your Signup」という件名でメールが届きます。</p>
      <p>メールのリンクをクリックしたら登録完了です。</p>

      <form className="border mt-4 p-4">
        <div className="max-w-xs border-b border-gray-100">
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required className="ml-2 border border-gray-300" />
        </div>
        <div className="max-w-xs border-b border-gray-100">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={8}
            required
            className="ml-2 border border-gray-300"
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
    </div>
  )
}