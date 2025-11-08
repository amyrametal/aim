import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClaimQr from './pages/ClaimQr';
import AnimalForm from './pages/AnimalForm';
import AnimalList from './pages/AnimalList';
import AnimalDetail from './pages/AnimalDetail';
import VaccineManager from './pages/VaccineManager';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClaimQr />} />
        <Route path="/animal/new" element={<AnimalForm />} />
        <Route path="/animal/:animalId/vaccines" element={<VaccineManager />} />
        <Route path="/animals" element={<AnimalList />} />
        <Route path="/animal/:nanoid" element={<AnimalDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
