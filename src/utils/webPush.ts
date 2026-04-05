import { createClient } from '@/lib/supabase/client';

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};


export async function subscribeToPushNotifications(userId: string) {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return false;

    const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!publicVapidKey) throw new Error('VAPID public key is missing in .env');

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    const subJson = subscription.toJSON();
    const supabase = createClient();

    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({
        userId: userId,
        endpoint: subJson.endpoint,
        auth_key: subJson.keys?.auth,
        p256dh_key: subJson.keys?.p256dh,
        updatedAt: new Date().toISOString(),
      }, { onConflict: "userId" });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Push subscription failed:', error);
    return false;
  }
}