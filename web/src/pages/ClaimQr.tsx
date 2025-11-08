import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import OfflineBanner from '../components/OfflineBanner';

export default function ClaimQr() {
  const [code, setCode] = useState('');
  const nav = useNavigate();

  const check = async () => {
    try {
      const { data } = await api.get(`/qr-codes/${code}/status`);
      if (!data.exists) return alert('Code not found');
      if (data.status !== 'unassigned') return alert('Already assigned');
      nav('/animal/new', { state: { code } });
    } catch (e: any) {
      alert('Network error – try again');
    }
  };

  return (
    <>
      <OfflineBanner />
      <div style={{ padding: 24 }}>
        <h1>Claim Steel QR</h1>
        <input
          placeholder="Enter code on collar"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />
        <button onClick={check}>Next</button>
      </div>
    </>
  );
}
