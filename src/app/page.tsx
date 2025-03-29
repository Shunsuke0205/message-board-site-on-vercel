
export default function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return (
    <div>
      <p>記事投稿ページ</p>
      <div>
        <p>{supabaseUrl != undefined ? supabaseUrl : "Shunsuke"}</p>
        <p>{supabaseAnonKey != undefined ? supabaseAnonKey : "can you see me?"}</p>
      </div>
    </div>
  );
}
