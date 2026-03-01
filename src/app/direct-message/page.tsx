import Link from "next/link";
import { Suspense } from "react"
import AllDMList from "./AllDMList";

const DM_List = async () => {
  return (
    <div>
      <h1 className="font-bold text-2xl my-2">
        ダイレクトメッセージの送り方
      </h1>
      <p>
        まず
        <Link 
          href="/posts" 
          className="underline text-blue-500 hover:text-blue-700"
        >Post</Link>
        の投稿リストから、メッセージを送りたい相手のアイコンを押してその方のプロフィールを開いてください。
      </p>
      <p>
        すると、プロフィールページの上部にDMを送るボタンがあるので、そこを押していただくとその方とのDMのページに遷移します。
        DMのページに遷移しますので、メッセージを入力して送信してください。
      </p>

      <h1 className="font-bold text-2xl my-2">
        DM一覧
      </h1>

     <Suspense fallback={<p>表示しています・・・</p>}>
        <AllDMList />
      </Suspense>
    </div>
  )
}

export default DM_List
