import { Suspense } from "react"
import DirectMessagePage from "./DirectMessagePage";

export default async function Page({
  params,
}: {
  params: Promise<{ channelId: string }>
}) {
  const { channelId } = await params;

  return (
    <div>
      <Suspense fallback={<p>表示しています・・・</p>}>
        <DirectMessagePage channelId={channelId} />
      </Suspense>
    </div>
  )
}
