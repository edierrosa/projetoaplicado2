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
  Usuarios.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuário atualizado com sucesso' });
  });
};

exports.delete = (req, res) => {
  Usuarios.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuário excluído com sucesso' });
  });
};