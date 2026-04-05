self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();

    const promises = [];

    if (data.badgeCount && 'setAppBadge' in self.navigator) {
      promises.push(self.navigator.setAppBadge(data.badgeCount));
    }

    const options = {
      body: data.body,
      icon: data.icon || '/product_icon.png',
      badge: '/product_icon.png',
      data: {
        url: data.data?.url ? `${data.data.url}?from=push` : '/?from=push',
      },
    };
    promises.push(self.registration.showNotification(data.title, options));

    event.waitUntil(Promise.all(promises));
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
