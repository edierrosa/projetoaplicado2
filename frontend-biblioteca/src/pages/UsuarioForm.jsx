import { useState } from 'react';
import api from '../services/api';

export default function UsuarioForm() {
  const [form, setForm] = useState({
    usuario: {
      nome_completo: '',
      data_nasc: '',
      data_cadastro: new Date().toISOString().split('T')[0]
    },
    endereco: {
      logradouro: '', numero: '', complemento: '', bairro: '', cep: '', cidade: '', estado: ''
    },
    contato: { telefone: '', email: '' },
    vinculo: { tipo_vinculo: '', instituicao: '', matricula: '' }
  });

  const handleChange = (group, field, value) => {
    setForm(prev => ({
      ...prev,
      [group]: { ...prev[group], [field]: value }
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/usuarios', form)
      .then(() => alert('Usuário cadastrado!'))
      .catch(() => alert('Erro ao cadastrar usuário'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Usuário</h2>
      <label>Nome completo:</label>
      <input value={form.usuario.nome_completo} onChange={e => handleChange('usuario', 'nome_completo', e.target.value)} required />
      <label>Data de nascimento:</label>
      <input type="date" value={form.usuario.data_nasc} onChange={e => handleChange('usuario', 'data_nasc', e.target.value)} required />

      <h3>Endereço</h3>
      <input placeholder="Logradouro" onChange={e => handleChange('endereco', 'logradouro', e.target.value)} />
      <input placeholder="Número" onChange={e => handleChange('endereco', 'numero', e.target.value)} />
      <input placeholder="Complemento" onChange={e => handleChange('endereco', 'complemento', e.target.value)} />
      <input placeholder="Bairro" onChange={e => handleChange('endereco', 'bairro', e.target.value)} />
      <input placeholder="CEP" onChange={e => handleChange('endereco', 'cep', e.target.value)} />
      <input placeholder="Cidade" onChange={e => handleChange('endereco', 'cidade', e.target.value)} />
      <input placeholder="Estado (UF)" maxLength={2} onChange={e => handleChange('endereco', 'estado', e.target.value.toUpperCase())} />

      <h3>Contato</h3>
      <input placeholder="Telefone" onChange={e => handleChange('contato', 'telefone', e.target.value)} />
      <input placeholder="Email" onChange={e => handleChange('contato', 'email', e.target.value)} required />

      <h3>Vínculo</h3>
      <input placeholder="Tipo de vínculo" onChange={e => handleChange('vinculo', 'tipo_vinculo', e.target.value)} />
      <input placeholder="Instituição" onChange={e => handleChange('vinculo', 'instituicao', e.target.value)} />
      <input placeholder="Matrícula" onChange={e => handleChange('vinculo', 'matricula', e.target.value)} />

      <button type="submit">Cadastrar</button>
    </form>
  );
}
