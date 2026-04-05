import { Suspense } from "react"
import DirectMessagePage from "./DirectMessagePage";
import NotificationCleaner from "@/utils/NotificationCleaner";

export default async function Page({
  params,
}: {
  params: Promise<{ channelId: string }>
}) {
  const { channelId } = await params;

  return (
    <div>
      <NotificationCleaner tag="dm-notification" />
      <Suspense fallback={<p>表示しています・・・</p>}>
        <DirectMessagePage channelId={channelId} />
      </Suspense>
    </div>
  )
}
