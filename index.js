const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Dados em memória para simplificação
const processos = [
    {
        id: '1',
        numero: '12345',
        descricao: 'Ação de indenização por danos morais.',
        data_abertura: '2024-01-15',
        status: 'Aberto',
        cliente_id: '1',
        advogado_id: '1'
    },
    {
        id: '2',
        numero: '67890',
        descricao: 'Divórcio consensual.',
        data_abertura: '2024-03-22',
        status: 'Em Andamento',
        cliente_id: '2',
        advogado_id: '2'
    }
];

const advogados = [
    {
        id: '1',
        nome: 'Dr. João Silva',
        oab: '123456',
        telefone: '11987654321',
        email: 'joao.silva@advogado.com'
    },
    {
        id: '2',
        nome: 'Dra. Maria Oliveira',
        oab: '654321',
        telefone: '11912345678',
        email: 'maria.oliveira@advogado.com'
    }
];

const clientes = [
    {
        id: '1',
        nome: 'Carlos Pereira',
        cpf: '12345678900',
        telefone: '11911112222',
        email: 'carlos.pereira@cliente.com'
    },
    {
        id: '2',
        nome: 'Ana Souza',
        cpf: '09876543211',
        telefone: '11933334444',
        email: 'ana.souza@cliente.com'
    }
];

const audiencias = [
    {
        id: '1',
        data: '2024-02-20',
        hora: '09:00',
        local: 'Tribunal Central',
        processo_id: '1'
    },
    {
        id: '2',
        data: '2024-04-10',
        hora: '14:00',
        local: 'Sala 3B',
        processo_id: '2'
    }
];


// Rotas Processos

/**
 * @swagger
 * /processos:
 *   post:
 *     summary: Cria um novo processo
 *     tags: [Processos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Processo'
 *     responses:
 *       201:
 *         description: O processo foi criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Processo'
 */
app.post('/processos', (req, res) => {
    const { numero, descricao, data_abertura, status, cliente_id, advogado_id } = req.body;
    const id = uuidv4();
    const novoProcesso = { id, numero, descricao, data_abertura, status, cliente_id, advogado_id };
    processos.push(novoProcesso);
    res.status(201).json(novoProcesso);
});


/**
 * @swagger
 * /processos:
 *   get:
 *     summary: Retorna todos os processos
 *     tags: [Processos]
 *     responses:
 *       200:
 *         description: A lista de processos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Processo'
 */
app.get('/processos', (req, res) => {
    res.json(processos);
});


/**
 * @swagger
 * /processos/{id}:
 *   get:
 *     summary: Retorna um processo específico pelo ID
 *     tags: [Processos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do processo
 *     responses:
 *       200:
 *         description: O processo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Processo'
 *       404:
 *         description: Processo não encontrado
 */
app.get('/processos/:id', (req, res) => {
    const processo = processos.find(p => p.id === req.params.id);
    if (!processo) return res.status(404).json({ message: 'Processo não encontrado' });
    res.json(processo);
});


/**
 * @swagger
 * /processos/{id}:
 *   put:
 *     summary: Atualiza um processo específico pelo ID
 *     tags: [Processos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do processo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Processo'
 *     responses:
 *       200:
 *         description: O processo foi atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Processo'
 *       404:
 *         description: Processo não encontrado
 */
app.put('/processos/:id', (req, res) => {
    const index = processos.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Processo não encontrado' });
    const { numero, descricao, data_abertura, status, cliente_id, advogado_id } = req.body;
    processos[index] = { id: req.params.id, numero, descricao, data_abertura, status, cliente_id, advogado_id };
    res.json(processos[index]);
});

app.patch('/processos/:id', (req, res) => { 
    const index = processos.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Processo não encontrado' });
    const { status, descricao } = req.body;
    if (status !== undefined) {
        processos[index].status = status;
    }   
    if (descricao !== undefined) {
        processos[index].descricao = descricao;
    }
    res.json(processos[index]);
});

app.delete('/processos/:id', (req, res) => {
    const index = processos.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Processo não encontrado' });
    processos.splice(index, 1);
    res.json({ message: 'Processo excluído com sucesso' });
});

// Rotas Advogados
app.post('/advogados', (req, res) => {
    const { nome, oab, telefone, email } = req.body;
    const id = uuidv4();
    const novoAdvogado = { id, nome, oab, telefone, email };
    advogados.push(novoAdvogado);
    res.status(201).json(novoAdvogado);
});

app.get('/advogados/:id', (req, res) => {
    const advogado = advogados.find(a => a.id === req.params.id);
    if (!advogado) return res.status(404).json({ message: 'Advogado não encontrado' });
    res.json(advogado);
});

app.put('/advogados/:id', (req, res) => {
    const index = advogados.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Advogado não encontrado' });
    const { nome, oab, telefone, email } = req.body;
    advogados[index] = { id: req.params.id, nome, oab, telefone, email };
    res.json(advogados[index]);
});


app.delete('/advogados/:id', (req, res) => {
    const index = advogados.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Advogado não encontrado' });
    advogados.splice(index, 1);
    res.json({ message: 'Advogado excluído com sucesso' });
});

// Rotas Clientes
app.post('/clientes', (req, res) => {
    const { nome, cpf, telefone, email } = req.body;
    const id = uuidv4();
    const novoCliente = { id, nome, cpf, telefone, email };
    clientes.push(novoCliente);
    res.status(201).json(novoCliente);
});

app.get('/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(cliente);
});

app.put('/clientes/:id', (req, res) => {
    const index = clientes.findIndex(c => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Cliente não encontrado' });
    const { nome, cpf, telefone, email } = req.body;
    clientes[index] = { id: req.params.id, nome, cpf, telefone, email };
    res.json(clientes[index]);
});

app.delete('/clientes/:id', (req, res) => {
    const index = clientes.findIndex(c => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Cliente não encontrado' });
    clientes.splice(index, 1);
    res.json({ message: 'Cliente excluído com sucesso' });
});

// Rotas Audiências
app.post('/audiencias', (req, res) => {
    const { data, hora, local, processo_id } = req.body;
    const id = uuidv4();
    const novaAudiencia = { id, data, hora, local, processo_id };
    audiencias.push(novaAudiencia);
    res.status(201).json(novaAudiencia);
});

app.get('/audiencias/:id', (req, res) => {
    const audiencia = audiencias.find(a => a.id === req.params.id);
    if (!audiencia) return res.status(404).json({ message: 'Audiência não encontrada' });
    res.json(audiencia);
});

app.put('/audiencias/:id', (req, res) => {
    const index = audiencias.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Audiência não encontrada' });
    const { data, hora, local, processo_id } = req.body;
    audiencias[index] = { id: req.params.id, data, hora, local, processo_id };
    res.json(audiencias[index]);
});

app.delete('/audiencias/:id', (req, res) => {
    const index = audiencias.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Audiência não encontrada' });
    audiencias.splice(index, 1);
    res.json({ message: 'Audiência excluída com sucesso' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
