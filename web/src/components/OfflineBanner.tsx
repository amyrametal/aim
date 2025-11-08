import { useEffect, useState } from 'react';

export default function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine);
  useEffect(() => {
    const toggle = () => setOffline(!navigator.onLine);
    window.addEventListener('online', toggle);
    window.addEventListener('offline', toggle);
    return () => {
      window.removeEventListener('online', toggle);
      window.removeEventListener('offline', toggle);
    };
  }, []);
  if (!offline) return null;
  return <div style={{ background: '#ff9800', color: '#fff', padding: 6 }}>You are offline – data will sync when connection returns.</div>;
}
