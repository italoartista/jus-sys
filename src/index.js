// src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const setupSwagger = require('./swagger');
const verifyToken = require('./middleware/auth');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
// Configurar Swagger
setupSwagger(app);

// Chave secreta para JWT
const secretKey = 'secreta'; // Substitua por uma chave secreta segura e configure isso em um arquivo de ambiente

// Mock de dados e usuários
const processos = [];
const advogados = [];
const clientes = [];
const audiencias = [];
const users = [
    {
        id: '1',
        username: 'user',
        password: '$2a$10$D9UIsmR29q7pDk/UhPzPmeXtt7l1vO9n.kpd2jJ7Z/Ji3SE5bBO5K' // 'password' criptografada
    }
];

// Endpoint de Login
/**
 * @openapi
 * /login:
 *   post:
 *     summary: Autentica o usuário e retorna um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Token JWT gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    console.log(user)
   if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) { 
            console.log(err);
            console.log(result);
            return res.status(401).json({ message: 'Credenciais inválidas!' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    });
});
// Middleware
app.use(bodyParser.json());


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
app.post('/processos', verifyToken, (req, res) => {
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
