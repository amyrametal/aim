import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

interface Animal {
  id: string;
  nanoid: string;
  name: string;
  species: 'dog' | 'cow';
  status: string;
  pictureUrl?: string;
  qrCodes: Array<{ code: string }>;
}

export default function AnimalList() {
  const nav = useNavigate();
  const [rows, setRows] = useState<Animal[]>([]);
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState<'dog' | 'cow' | ''>('');
  const [status, setStatus] = useState<string>('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const load = async () => {
    const { data } = await api.get('/animals', {
      params: { page, search, species, status },
    });
    setRows(data.items);
    setPages(data.pages);
  };
  useEffect(() => { load(); }, [search, species, status, page]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Animals</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          placeholder="Search name / QR code"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select
          value={species}
          onChange={(e) => { setSpecies(e.target.value); setPage(1); }}
        >
          <option value="">All species</option>
          <option value="dog">Dog</option>
          <option value="cow">Cow</option>
        </select>
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
        >
          <option value="">All status</option>
          <option value="active">Active</option>
          <option value="lost">Lost</option>
          <option value="dead">Dead</option>
        </select>
        <button onClick={() => nav('/'}>Claim QR</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Species</th>
            <th>QR code</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => (
            <tr key={a.id} style={{ borderTop: '1px solid #ddd' }}>
              <td>
                {a.pictureUrl ? (
                  <img src={a.pictureUrl} alt="" style={{ width: 48, height: 48, objectFit: 'cover' }} />
                ) : (
                  '-'
                )}
              </td>
              <td>{a.name}</td>
              <td>{a.species}</td>
              <td>{a.qrCodes[0]?.code || '-'}</td>
              <td>{a.status}</td>
              <td>
                <Link to={`/animal/${a.nanoid}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 12 }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span style={{ margin: '0 8px' }}>Page {page} / {pages}</span>
        <button disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
