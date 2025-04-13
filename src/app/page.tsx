import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col mt-5 ml-8">
      <h1 className="text-xl">トップページ</h1>
      <Link
        href={"/shunsuke"}
        className="underline text-blue-700 "
      >
        <p className="text-lg mt-3">
          このサイトを運営している人について
        </p>
      </Link>
      <h2 className="text-lg mt-3">主な使い方</h2>
      <h3 className="mt-2">
        <Link href={"/posts"} className="underline">
          Posts：返信ができる投稿機能
        </Link >
      </h3>
      <p>
        投稿をして、他のユーザーから返信をもらうことができます。<br />
        質問や相談をする掲示板として使っていただけます。
      </p>

      <h3 className="mt-2">
        <Link href={"/complain"} className="underline">
          Guchi：返信機能のない、悩みやグチを吐き出す機能
        </Link>
      </h3>
      <p>
        ネガティブな気持ちを吐き出すのに使っていただけます。<br />
        あえて返信できないようにしています。
      </p>

      <h2 className="mt-8 text-lg">予定している機能</h2>
      <h3 className="mt-2">サイト全体について</h3>
      <ul>
        <li>見た目の調整</li>
      </ul>
      <h3 className="mt-2">
        <Link href={"/posts"} className="underline">
          Posts
        </Link>
      </h3>
      <ul>
        <li>見た目の調整</li>
        <li>カテゴリー</li>
        <li>リスペクトのお願い</li>
        <li>返信を受け付けるオンオフ機能</li>
        <li>リアクションの記録</li>
      </ul>
      <h3 className="mt-2">
        <Link href={"/complain"} className="underline">
          Guchi
        </Link>
      </h3>
      <ul>
        <li>見た目の調整</li>
        <li>リアクションスタンプ</li>
        <li>非表示</li>
        <li>カテゴリー</li>
      </ul>
      <h3 className="mt-2">DM機能</h3>
      <h3 className="mt-2">寄付（お金のヘルプ）機能</h3>
      <h3 className="mt-2">不用品おゆずり機能</h3>

      <h2 className="mt-5 text-lg">実装できた機能</h2>
      <ul>
        <li>自分以外の方のプロフィールページ</li>
        <li>登録したニックネームの表示</li>
        <li>ユーザのプロフィールページへのリンク</li>
        <li>プロフィールページとプロフィール編集</li>
        <li>返信の数のデバッグ</li>
        <li>投稿と返信の削除機能</li>
        <li>Postのハートリアクション機能</li>
        <li>平田駿輔の自己紹介ページ</li>
        <li>返信</li>
        <li>返信の数の表示</li>
        <li>ローディングページ</li>
        <li>スレッドページ</li>
      </ul>
    </div>
  );
}
