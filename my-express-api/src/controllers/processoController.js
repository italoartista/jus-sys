const { v4: uuidv4 } = require('uuid');
const processos = [];

const createProcesso = (req, res) => {
    const { numero, descricao, data_abertura, status, cliente_id, advogado_id } = req.body;
    const id = uuidv4();
    const novoProcesso = { id, numero, descricao, data_abertura, status, cliente_id, advogado_id };
    processos.push(novoProcesso);
    res.status(201).json(novoProcesso);
};

const getAllProcessos = (req, res) => {
    res.json(processos);
};

const getProcessoById = (req, res) => {
    const processo = processos.find(p => p.id === req.params.id);
    if (!processo) return res.status(404).json({ message: 'Processo não encontrado' });
    res.json(processo);
};

const updateProcessoById = (req, res) => {
    const index = processos.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Processo não encontrado' });
    const { numero, descricao, data_abertura, status, cliente_id, advogado_id } = req.body;
    processos[index] = { id: req.params.id, numero, descricao, data_abertura, status, cliente_id, advogado_id };
    res.json(processos[index]);
};

const partialUpdateProcesso = (req, res) => {
    const index = processos.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Processo não encontrado' });
    const { status, descricao } = req.body;
    if (status !== undefined) processos[index].status = status;
    if (descricao !== undefined) processos[index].descricao = descricao;
    res.json(processos[index]);
};

const deleteProcessoById = (req, res) => {
    const index = processos.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Processo não encontrado' });
    processos.splice(index, 1);
    res.json({ message: 'Processo excluído com sucesso' });
};

module.exports = { createProcesso, getAllProcessos, getProcessoById, updateProcessoById, partialUpdateProcesso, deleteProcessoById };
