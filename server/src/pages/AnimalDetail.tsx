import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

interface Animal {
  id: string;
  name: string;
  species: 'dog' | 'cow';
  ageMonths?: number;
  gender?: string;
  status: string;
  pictureUrl?: string;
  lat?: number;
  lng?: number;
  accuracy?: number;
}

export default function AnimalDetail() {
  const { nanoid } = useParams() as { nanoid: string };
  const [a, setA] = useState<Animal | null>(null);

  useEffect(() => {
    api.get(`/animals/public/${nanoid}`).then((res) => setA(res.data));
  }, [nanoid]);

  if (!a) return <p>Loading…</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>{a.name}</h2>
      {a.pictureUrl && <img src={a.pictureUrl} alt={a.name} style={{ maxWidth: 320 }} />}
      <p>Species: {a.species}</p>
      <p>Gender: {a.gender || '-'}</p>
      <p>Age (months): {a.ageMonths || '-'}</p>
      <p>Status: {a.status}</p>
      {a.lat && (
        <p>
          Last location: {a.lat.toFixed(5)}, {a.lng!.toFixed(5)} (±{Math.round(a.accuracy!)} m)
        </p>
      )}

      <div style={{ marginTop: 16 }}>
        <Link to={`/animal/${nanoid}/vaccines`}>
          <button>Manage vaccines</button>
        </Link>
        <button onClick={() => window.history.back()}>Back</button>
      </div>
    </div>
  );
}
