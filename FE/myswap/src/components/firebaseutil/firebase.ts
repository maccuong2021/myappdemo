import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage as onMessageFirebase } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyA0uMmygsU6Ub1KfbL3Bf5WZBYNcrZ3MlI",
  authDomain: "myapp-d6063.firebaseapp.com",
  projectId: "myapp-d6063",
  storageBucket: "myapp-d6063.appspot.com",
  messagingSenderId: "538373405807",
  appId: "1:538373405807:web:00bf1c1d7c414ddd74219a",
  measurementId: "G-KJS1HS5E6H"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestFirebaseNotificationPermission = async (): Promise<string | undefined> => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BKRav73FNWvW6Z0TbmqNbB-A7yo4hcUx0nrgkH8St_k_bLPte4jsqi_fKGQrM2SgES9TBkC7zhI_08fsrvccs0I',
      });
      console.log('FCM token:', token);
      return token;
    }
  } catch (err) {
    console.error('Unable to get permission to notify.', err);
  }
};
export const onMessage = onMessageFirebase;