import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClaimQr from './pages/ClaimQr';
import AnimalForm from './pages/AnimalForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClaimQr />} />
        <Route path="/animal/new" element={<AnimalForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
