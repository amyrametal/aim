import { useState } from 'react';

type Props = { onLocation: (lat: number, lng: number, acc: number) => void };

export default function GpsButton({ onLocation }: Props) {
  const [fetching, setFetching] = useState(false);

  const get = () => {
    if (!navigator.geolocation) return alert('GPS not available');
    setFetching(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        onLocation(latitude, longitude, accuracy);
        setFetching(false);
      },
      (err) => {
        alert('GPS error: ' + err.message);
        setFetching(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  };

  return (
    <button type="button" disabled={fetching} onClick={get}>
      {fetching ? 'Getting GPS…' : '📍 Get location'}
    </button>
  );
}
