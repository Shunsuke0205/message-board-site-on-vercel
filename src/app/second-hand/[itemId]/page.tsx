import React from "react"

export default async function SecondHandItem({
  params,
} : {
  params: Promise<{ itemId: string }>
}) {
  const { itemId } = await params;

  return (
    <div>
      {itemId}
    </div>
  )
};
