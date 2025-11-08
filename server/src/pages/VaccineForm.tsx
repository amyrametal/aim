import { useState } from 'react';
import api from '../services/api';

type Props = {
  animalId: string;
  existing?: any;
  onDone: () => void;
};

export default function VaccineForm({ animalId, existing, onDone }: Props) {
  const [form, setForm] = useState({
    vaccineType: existing?.vaccineType || '',
    brand: existing?.brand || '',
    dueDate: existing?.dueDate || '',
    givenDate: existing?.givenDate || '',
    notes: existing?.notes || '',
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = existing ? `/vaccines/${existing.id}` : `/vaccines/animal/${animalId}`;
    const method = existing ? 'patch' : 'post';
    await api[method](url, form);
    onDone();
  };

  return (
    <form onSubmit={submit} style={{ marginTop: 12, border: '1px solid #ccc', padding: 12 }}>
      <input
        placeholder="Vaccine type (e.g. Anti-Rabies)"
        required
        value={form.vaccineType}
        onChange={(e) => setForm({ ...form, vaccineType: e.target.value })}
      />
      <input
        placeholder="Brand"
        value={form.brand}
        onChange={(e) => setForm({ ...form, brand: e.target.value })}
      />
      <label>
        Due date
        <input
          type="date"
          required
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
      </label>
      <label>
        Given date (leave empty if not yet)
        <input
          type="date"
          value={form.givenDate}
          onChange={(e) => setForm({ ...form, givenDate: e.target.value })}
        />
      </label>
      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        rows={2}
      />
      <button type="submit">Save vaccine</button>
      <button type="button" onClick={onDone}>Cancel</button>
    </form>
  );
}
