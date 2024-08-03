const { v4: uuidv4 } = require('uuid');
const advogados = [];

const createAdvogado = (req, res) => {
    const { nome, oab, telefone, email } = req.body;
    const id = uuidv4();
    const novoAdvogado = { id, nome, oab, telefone, email };
    advogados.push(novoAdvogado);
    res.status(201).json(novoAdvogado);
};

const getAdvogadoById = (req, res) => {
    const advogado = advogados.find(a => a.id === req.params.id);
    if (!advogado) return res.status(404).json({ message: 'Advogado não encontrado' });
    res.json(advogado);
};

const updateAdvogadoById = (req, res) => {
    const index = advogados.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Advogado não encontrado' });
    const { nome, oab, telefone, email } = req.body;
    advogados[index] = { id: req.params.id, nome, oab, telefone, email };
    res.json(advogados[index]);
};

const deleteAdvogadoById = (req, res) => {
    const index = advogados.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Advogado não encontrado' });
    advogados.splice(index, 1);
    res.json({ message: 'Advogado excluído com sucesso' });
};

module.exports = { createAdvogado, getAdvogadoById, updateAdvogadoById, deleteAdvogadoById };
