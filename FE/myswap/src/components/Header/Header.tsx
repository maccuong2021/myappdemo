import { AppBar, Toolbar, Typography, Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect, useState } from 'react';
import { messaging, requestFirebaseNotificationPermission, onMessage } from '../firebaseutil/firebase';

interface DocumentPayload {
  Id: string;
  Title: string;
  Content: string;
}

export default function Header() {
  const [notificationCount, setNotificationCount] = useState(0);
  const [lastDocument, setLastDocument] = useState<DocumentPayload | null>(null);
  const [rawMessage, setRawMessage] = useState<string | null>(null);

  useEffect(() => {
    const initNotifications = async () => {
      const token = await requestFirebaseNotificationPermission();
      if (token) {
        await fetch('http://localhost:3000/api/register-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
      }
    };
    initNotifications();

    const unsubscribe = onMessage(messaging, (payload) => {
      if (payload.data?.msg) {
        setRawMessage(payload.data.msg);
        try {
          const parsed = JSON.parse(payload.data.msg);
          if (parsed?.Id && parsed?.Title && parsed?.Content) {
            setLastDocument(parsed);
            setNotificationCount(prev => prev + 1);
          }
        } catch (err) {
          console.error('Failed to parse document data', err);
        }
      }
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.msg) {
        setRawMessage(event.data.msg);
        try {
          const doc: DocumentPayload = JSON.parse(event.data.msg);
          setLastDocument(doc);
          setNotificationCount(prev => prev + 1);
        } catch (err) {
          console.error('Failed to parse document from SW', err);
        }
      }
    });

    const params = new URLSearchParams(window.location.search);
    const payload = params.get('payload');
    if (payload) {
      try {
        const doc: DocumentPayload = JSON.parse(payload);
        setLastDocument(doc);
        setNotificationCount(prev => prev + 1);
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (err) {
        console.error('Failed to parse document from URL', err);
      }
    }

    return () => unsubscribe();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Swap currency
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={notificationCount} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {lastDocument ? (
        <div style={{ padding: '10px', backgroundColor: '#f1f1f1' }}>
          <strong>New Document Notification:</strong>
          <div>Id: {lastDocument.Id}</div>
          <div>Title: {lastDocument.Title}</div>
          <div>Content: {lastDocument.Content}</div>
        </div>
      ) : rawMessage ? (
        <div style={{ padding: '10px', backgroundColor: '#ffe0e0' }}>
          <strong>Raw Notification:</strong> {rawMessage}
        </div>
      ) : null}
    </>
  );
}

