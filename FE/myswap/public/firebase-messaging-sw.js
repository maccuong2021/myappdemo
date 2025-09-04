importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyA0uMmygsU6Ub1KfbL3Bf5WZBYNcrZ3MlI",
  authDomain: "myapp-d6063.firebaseapp.com",
  projectId: "myapp-d6063",
  storageBucket: "myapp-d6063.appspot.com",
  messagingSenderId: "538373405807",
  appId: "1:538373405807:web:00bf1c1d7c414ddd74219a",
  measurementId: "G-KJS1HS5E6H"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message', payload);

  let notificationTitle = payload.notification?.title || 'New Document';
  let notificationOptions = {
    body: payload.data?.msg || payload.notification?.body || '',
    icon: '/firebase-logo.png',
    data: {
      msg: payload.data?.msg || payload.notification?.body || ''
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification click received', event);
  event.notification.close();

  const payloadMsg = event.notification.data?.msg;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      if (clientList.length > 0) {
        clientList[0].postMessage({ msg: payloadMsg });
        return clientList[0].focus();
      }
      const url = payloadMsg ? '/?payload=' + encodeURIComponent(payloadMsg) : '/';
      return clients.openWindow(url);
    })
  );
});