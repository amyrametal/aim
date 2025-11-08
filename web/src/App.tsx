import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClaimQr from './pages/ClaimQr';
import AnimalForm from './pages/AnimalForm';
import VaccineManager from './pages/VaccineManager';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClaimQr />} />
        <Route path="/animal/new" element={<AnimalForm />} />
        <Route path="/animal/:animalId/vaccines" element={<VaccineManager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
