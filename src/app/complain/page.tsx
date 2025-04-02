import React, { Suspense } from "react"
import ComplainCardList from "./ComplainCardList"
import ComplainPostForm from "./ComplainPostForm"

const Complain = () => {
  return (
    <div className="">
      <Suspense fallback={<p>Loading form...</p>}>
        <ComplainPostForm />
      </Suspense>
      <div className="mt-6">
        <Suspense fallback={<p>Loading posts...</p>}>
          <ComplainCardList />
        </Suspense>
      </div>
    </div>
  )
}

export default Complain
