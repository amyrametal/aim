import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import CameraCapture from '../components/CameraCapture';
import GpsButton from '../components/GpsButton';
import OfflineBanner from '../components/OfflineBanner';

export default function AnimalForm() {
  const { state } = useLocation();
  const nav = useNavigate();
  const [file, setFile] = useState<File>();
  const [loc, setLoc] = useState<{ lat: number; lng: number; acc: number }>();
  const [form, setForm] = useState({
    name: '',
    species: 'dog' as 'dog' | 'cow',
    ageMonths: '',
    gender: '',
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append('picture', file);
    if (loc) {
      fd.append('lat', String(loc.lat));
      fd.append('lng', String(loc.lng));
      fd.append('accuracy', String(loc.acc));
    }
    try {
      await api.post(`/animals?code=${state.code}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Saved!');
      nav('/');
    } catch {
      alert('Save failed – try again');
    }
  };

  return (
    <>
      <OfflineBanner />
      <form onSubmit={submit} style={{ padding: 24 }}>
        <h2>Add animal for code {state.code}</h2>
        <input
          placeholder="Name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <select
          required
          value={form.species}
          onChange={(e) => setForm({ ...form, species: e.target.value as any })}
        >
          <option value="dog">Dog</option>
          <option value="cow">Cow</option>
        </select>
        <input
          type="number"
          placeholder="Age (months)"
          onChange={(e) => setForm({ ...form, ageMonths: e.target.value })}
        />
        <select onChange={(e) => setForm({ ...form, gender: e.target.value })}>
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <CameraCapture onCapture={setFile} />
        <GpsButton onLocation={(lat, lng, acc) => setLoc({ lat, lng, acc })} />
        {loc && <p>Accurate to {Math.round(loc.acc)} m</p>}

        <button type="submit">Save animal</button>
      </form>
    </>
  );
}
