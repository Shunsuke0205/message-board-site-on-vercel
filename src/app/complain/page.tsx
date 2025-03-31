import React from "react"
import ComplainCardList from "./ComplainCardList"
import ComplainPostForm from "./ComplainPostForm"

const Complain = () => {
  return (
    <div className="flex flex-col items-start">
      <ComplainPostForm />
      <ComplainCardList />
    </div>
  )
}

export default Complain
