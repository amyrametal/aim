import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import VaccineForm from './VaccineForm';

interface Vaccine {
  id: string;
  vaccineType: string;
  brand?: string;
  dueDate: string;
  givenDate?: string;
}

export default function VaccineManager() {
  const { animalId } = useParams() as { animalId: string };
  const nav = useNavigate();
  const [rows, setRows] = useState<Vaccine[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState<Vaccine | null>(null);

  const load = async () => {
    const { data } = await api.get(`/vaccines/animal/${animalId}`);
    setRows(data);
  };
  useEffect(() => { load(); }, [animalId]);

  const markGiven = async (ids: string[]) => {
    await api.post('/vaccines/batch-given', { ids });
    load();
  };

  const del = async (id: string) => {
    if (!confirm('Delete?')) return;
    await api.delete(`/vaccines/${id}`);
    load();
  };

  const upcoming = rows.filter(v => !v.givenDate && new Date(v.dueDate) <= new Date(Date.now() + 7 * 24 * 36e5));

  return (
    <div style={{ padding: 24 }}>
      <h2>Vaccine records</h2>
      {upcoming.length > 0 && (
        <div style={{ background: '#ff9800', color: '#fff', padding: 8, marginBottom: 12 }}>
          ⚠️ {upcoming.length} vaccine(s) due within 7 days
        </div>
      )}

      <button onClick={() => { setEdit(null); setShowForm(true); }}>+ Add vaccine</button>
      {showForm && <VaccineForm animalId={animalId} existing={edit} onDone={() => { setShowForm(false); load(); }} />}

      <table style={{ width: '100%', marginTop: 16 }}>
        <thead>
          <tr>
            <th>Type</th><th>Brand</th><th>Due</th><th>Given</th><th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((v) => (
            <tr key={v.id}>
              <td>{v.vaccineType}</td>
              <td>{v.brand || '-'}</td>
              <td>{v.dueDate}</td>
              <td>{v.givenDate || '-'}</td>
              <td>
                {!v.givenDate && (
                  <button onClick={() => markGiven([v.id])}>Mark given</button>
                )}
                <button onClick={() => { setEdit(v); setShowForm(true); }}>Edit</button>
                <button onClick={() => del(v.id)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={() => nav(-1)}>Back</button>
    </div>
  );
}
