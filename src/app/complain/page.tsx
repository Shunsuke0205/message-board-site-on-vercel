import { Suspense } from "react"
import ComplainCardList from "./ComplainCardList"
import ComplainPostForm from "./ComplainPostForm"

const Complain = () => {
  return (
    <div className="">
      <Suspense fallback={<p>表示しています・・・</p>}>
        <ComplainPostForm />
      </Suspense>
      <div className="mt-6">
        <Suspense fallback={<p>表示しています・・・</p>}>
          <ComplainCardList />
        </Suspense>
      </div>
    </div>
  )
}

export default Complain
