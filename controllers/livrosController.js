const Livros = require('../models/livrosModel');

exports.getAll = (req, res) => {
  Livros.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  Livros.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Livro não encontrado');
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  Livros.create(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.update = (req, res) => {
  Livros.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.send('Livro atualizado com sucesso');
  });
};

exports.delete = (req, res) => {
  Livros.delete(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.send('Livro excluído com sucesso');
  });
};
