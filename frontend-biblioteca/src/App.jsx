import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LivrosList from './pages/LivrosList';
import LivrosForm from './pages/LivrosForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LivrosList />} />
        <Route path="/novo" element={<LivrosForm />} />
        <Route path="/editar/:id" element={<LivrosForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
