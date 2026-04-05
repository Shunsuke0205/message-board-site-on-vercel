self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();

    const promises = [];

    if (data.badgeCount) {
      const badgePromise = navigator.setAppBadge
        ? navigator.setAppBadge(data.badgeCount).catch(error => console.error("Badge update failed:", error))
        : Promise.resolve();
      promises.push(badgePromise);
    }

    const options = {
      body: data.body,
      icon: data.icon || '/product_icon.png',
      badge: '/product_icon.png',
      data: {
        url: data.data?.url ? `${data.data.url}?from=push` : '/?from=push',
      },
      tag: "en-notification",
    };
    promises.push(self.registration.showNotification(data.title, options));

    event.waitUntil(Promise.all(promises));
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  
  const targetUrl = event.notification.data?.url || '/';

  const clearBadgePromise = navigator.clearAppBadge
    ? navigator.clearAppBadge().catch(e => console.error(e))
    : Promise.resolve();

  const windowPromise = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then((clientList) => {
    for (const client of clientList) {
      if (client.url.includes(targetUrl) && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow(targetUrl);
    }
  });

  event.waitUntil(Promise.all([clearBadgePromise, windowPromise]));
});
