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
  const complain2 : ComplainType = {
    id: "2",
    createdAt: "2023-10-02T12:00:00Z",
    postedBy: "Jane Smith",
    complain: "This is another sample complain text.",
    tears: 3,
    good: 8,
    cheer: 1,
    bad: 0,
  }
  const complain3 : ComplainType = {
    id: "3",
    createdAt: "2023-10-03T12:00:00Z",
    postedBy: "Alice Johnson",
    complain: "This is yet another sample complain text.",
    tears: 2,
    good: 5,
    cheer: 0,
    bad: 2,
  }
  const complain4 : ComplainType = {
    id: "4",
    createdAt: "2023-10-04T12:00:00Z",
    postedBy: "Bob Brown",
    complain: "This is a different sample complain text.",
    tears: 1,
    good: 7,
    cheer: 3,
    bad: 1,
  }

  return (
    <div>
      <ComplainCard complain={complain}/>
      <ComplainCard complain={complain2}/>
      <ComplainCard complain={complain3}/>
      <ComplainCard complain={complain4}/>
    </div>
  )
}

export default ComplainCardList