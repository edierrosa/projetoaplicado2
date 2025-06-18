const Usuarios = require('../models/usuarioModel');

exports.getAll = (req, res) => {
  Usuarios.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.create = (req, res) => {
  Usuarios.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json(result);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Usuarios.update(id, data, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuário atualizado com sucesso' });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Usuarios.delete(id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuário excluído com sucesso' });
  });
};