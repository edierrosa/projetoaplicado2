import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LivrosList from './pages/LivrosList';
import LivrosForm from './pages/LivrosForm';
import UsuarioForm from './pages/UsuarioForm';
import UsuariosList from './pages/UsuariosList';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LivrosList />} />
        <Route path="/livros/novo" element={<LivrosForm />} />
        <Route path="/livros/editar/:id" element={<LivrosForm />} />
        <Route path="/usuarios" element={<UsuariosList />} />
        <Route path="/usuarios/novo" element={<UsuarioForm />} />
        {/* <Route path="/usuarios/editar/:id" element={<UsuarioForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
