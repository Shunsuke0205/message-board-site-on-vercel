
export default function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return (
    <div>
      <p>記事投稿ページ</p>
      <div>
        <p>{supabaseUrl}</p>
        <p>{supabaseAnonKey}</p>
      </div>
    </div>
  );
}
