import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col mt-5 ml-8">
      <h1 className="text-xl">トップページ</h1>
      <h2 className="text-lg">主な使い方</h2>
      <h3 className="">
        <Link href={"/posts"}>
          Posts：返信ができる投稿機能
        </Link >
      </h3>
      <p>
        投稿をして、他のユーザーから返信をもらうことができます。<br />
        質問や相談をする掲示板として使っていただけます。
      </p>

      <h3>
        <Link href={"/complain"}>
          Guchi：返信機能のない、悩みやグチを吐き出す機能
        </Link>
      </h3>
      <p>
        ネガティブな気持ちを吐き出すのに使っていただけます。<br />
        あえて返信できないようにしています。
      </p>

      <h2>予定している機能</h2>
      <h3>
        <Link href={"/posts"}>
          Posts
        </Link>
      </h3>
      <ul>
        <li>見た目の調整</li>
        <li>いいね</li>
        <li>返信</li>
        <li>スレッドページ</li>
        <li>カテゴリー</li>
      </ul>
      <h3>
        <Link href={"/complain"}>
          Guchi
        </Link>
      </h3>
      <ul>
        <li>見た目の調整</li>
        <li>リアクションスタンプ</li>
        <li>非表示</li>
        <li>カテゴリー</li>
      </ul>
      <h3>DM機能</h3>

      <h2>実装できた機能</h2>
    </div>
  );
}
