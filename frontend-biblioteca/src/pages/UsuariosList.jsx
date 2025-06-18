import { useEffect, useState } from 'react';
import api from '../services/api';

export default function UsuariosList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api.get('/usuarios').then(res => setUsuarios(res.data));
  }, []);

  return (
    <div>
      <h1>Usuários Cadastrados</h1>
      <ul>
        {usuarios.map((u, index) => (
          <li key={index}>
            {u.nome_completo} - {u.email || 'sem e-mail'}
          </li>
        ))}
      </ul>
    </div>
  );
}
