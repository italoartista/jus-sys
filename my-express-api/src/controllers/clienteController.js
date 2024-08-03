const { v4: uuidv4 } = require('uuid');
const clientes = [];

const createCliente = (req, res) => {
    const { nome, cpf, telefone, email } = req.body;
    const id = uuidv4();
    const novoCliente = { id, nome, cpf, telefone, email };
    clientes.push(novoCliente);
    res.status(201).json(novoCliente);
};

const getClienteById = (req, res) => {
    const cliente = clientes.find(c => c.id === req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(cliente);
};

const updateClienteById = (req, res) => {
    const index = clientes.findIndex(c => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Cliente não encontrado' });
    const { nome, cpf, telefone, email } = req.body;
    clientes[index] = { id: req.params.id, nome, cpf, telefone, email };
    res.json(clientes[index]);
};

const deleteClienteById = (req, res) => {
    const index = clientes.findIndex(c => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Cliente não encontrado' });
    clientes.splice(index, 1);
    res.json({ message: 'Cliente excluído com sucesso' });
};

module.exports = { createCliente, getClienteById, updateClienteById, deleteClienteById };
