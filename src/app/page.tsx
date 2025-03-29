
export default function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return (
    <div>
      <p>記事投稿ページ</p>
      <p>Are the environment variables available?</p>
      <div>
        <p>{supabaseUrl != undefined ? supabaseUrl : "Shunsuke"}</p>
        <p>{supabaseAnonKey != undefined ? supabaseAnonKey : "can you see me?"}</p>
      </div>
    </div>
  );
}
