import React from "react"
import ComplainCard, { ComplainType } from "./ComplainCard"

const ComplainCardList = () => {
  const complain : ComplainType = {
    id: "1",
    createdAt: "2023-10-01T12:00:00Z",
    postedBy: "John Doe",
    complain: "This is a sample complain text.",
    tears: 5,
    good: 10,
    cheer: 2,
    bad: 1,
  }

  return (
    <div>
      <ComplainCard complain={complain}/>
    </div>
  )
}

export default ComplainCardList