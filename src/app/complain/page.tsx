import React, { Suspense } from "react"
import ComplainCardList from "./ComplainCardList"
import ComplainPostForm from "./ComplainPostForm"

const Complain = () => {
  return (
    <div className="flex flex-col items-start">
      <Suspense fallback={<p>Loading form...</p>}>
        <ComplainPostForm />
      </Suspense>
      <Suspense fallback={<p>Loading posts...</p>}>
        <ComplainCardList />
      </Suspense>
    </div>
  )
}

export default Complain
