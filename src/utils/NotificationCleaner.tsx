"use client";

import { useEffect } from "react";

export const clearNotificationsByTag = async (tag: string) => {
  if (!('serviceWorker' in navigator)) return;
  const registration = await navigator.serviceWorker.ready;
  const notifications = await registration.getNotifications();

  notifications.forEach(n => {
    if (n.tag === tag) n.close();
  });

  const remaining = await registration.getNotifications();
  if ('setAppBadge' in navigator) {
    if (remaining.length > 0) {
       (navigator as any).setAppBadge(remaining.length);
    } else {
       (navigator as any).clearAppBadge();
    }
  }
};

export default function NotificationCleaner({ tag }: { tag: string }) {
  useEffect(() => {
    clearNotificationsByTag(tag);
  }, [tag]);

  return null;
};
