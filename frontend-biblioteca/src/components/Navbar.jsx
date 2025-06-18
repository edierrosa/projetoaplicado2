import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#f4f4f4' }}>
      <Link to="/">Livros</Link> |{' '}
      <Link to="/livros/novo">Novo Livro</Link> |{' '}
      <Link to="/usuarios">Usuários</Link> |{' '}
      <Link to="/usuarios/novo">Novo Usuário</Link>
    </nav>
  );
}
