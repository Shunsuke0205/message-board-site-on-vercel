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
      <h3 className="mt-2">
        <Link href={"/second-hand"} className="underline">
          不用品おゆずり機能
        </Link>
      </h3>
      <p>
        メルカリ機能です。<br />
        ただし、有料で不用品を売ることはできません。
      </p>

      <h2 className="mt-8 text-lg">予定している機能</h2>
      <h3 className="mt-2">
        <Link href={"/posts"} className="underline">
          Posts
        </Link>
      </h3>
      <ul>
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
        <li>非表示</li>
        <li>カテゴリー</li>
      </ul>
      <h3 className="mt-2">
        <Link href={"/second-hand"} className="underline">
          不用品おゆずり機能
        </Link>
      </h3>
      <ul>
        <li>投稿の削除</li>
        <li>コメントの削除</li>
        <li>受付中・終了の切り替え</li>
      </ul>
      <h3 className="mt-2">寄付（お金のヘルプ）機能</h3>

      <h2 className="mt-5 text-lg">実装できた機能</h2>
      <ul>
        <li>
          おゆずりアイテムの削除・クローズボタン
        </li>
        <li>
          <Link href={"/second-hand"} className="underline">
            おゆずり機能！
          </Link>
        </li>
        <li>
          <Link href={"/direct-message"} className="underline">
            DM機能！
          </Link>
        </li>
        <li>アイコンの編集機能</li>
        <li>Guchiのリアクションスタンプ</li>
        <li>自分以外の方のプロフィールページ</li>
        <li>登録したニックネームの表示</li>
        <li>ユーザのプロフィールページへのリンク</li>
        <li>プロフィールページとプロフィール編集</li>
        <li>返信の数のデバッグ</li>
        <li>投稿と返信の削除機能</li>
        <li>Postのハートリアクション機能</li>
        <li>平田駿輔の自己紹介ページ</li>
      </ul>
    </div>
  );
}
