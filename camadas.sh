#!/bin/bash

# Definir o nome do projeto
PROJECT_NAME="my-express-api"

# Criar diretório do projeto e mudar para ele
mkdir $PROJECT_NAME
cd $PROJECT_NAME

# Inicializar o projeto Node.js
npm init -y

# Instalar as dependências necessárias
npm install express body-parser cors jsonwebtoken bcryptjs swagger-jsdoc swagger-ui-express

# Criar a estrutura de diretórios
mkdir -p src/controllers src/middleware src/swagger src/utils

# Criar o arquivo index.js
cat <<EOL > src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const setupSwagger = require('./swagger/swagger');
const verifyToken = require('./middleware/auth');

// Importar controladores
const authController = require('./controllers/authController');
const processoController = require('./controllers/processoController');
const advogadoController = require('./controllers/advogadoController');
const clienteController = require('./controllers/clienteController');
const audienciaController = require('./controllers/audienciaController');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Configurar Swagger
setupSwagger(app);

// Rotas de autenticação
app.post('/login', authController.login);

// Rotas de processos
app.post('/processos', verifyToken, processoController.createProcesso);
app.get('/processos', processoController.getAllProcessos);
app.get('/processos/:id', processoController.getProcessoById);
app.put('/processos/:id', processoController.updateProcessoById);
app.patch('/processos/:id', processoController.partialUpdateProcesso);
app.delete('/processos/:id', processoController.deleteProcessoById);

// Rotas de advogados
app.post('/advogados', advogadoController.createAdvogado);
app.get('/advogados/:id', advogadoController.getAdvogadoById);
app.put('/advogados/:id', advogadoController.updateAdvogadoById);
app.delete('/advogados/:id', advogadoController.deleteAdvogadoById);

// Rotas de clientes
app.post('/clientes', clienteController.createCliente);
app.get('/clientes/:id', clienteController.getClienteById);
app.put('/clientes/:id', clienteController.updateClienteById);
app.delete('/clientes/:id', clienteController.deleteClienteById);

// Rotas de audiências
app.post('/audiencias', audienciaController.createAudiencia);
app.get('/audiencias/:id', audienciaController.getAudienciaById);
app.put('/audiencias/:id', audienciaController.updateAudienciaById);
app.delete('/audiencias/:id', audienciaController.deleteAudienciaById);

app.listen(port, () => {
    console.log(\`Servidor rodando em http://localhost:${port}\`);
});
EOL

# Criar o arquivo authController.js
cat <<EOL > src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = 'secreta'; // Substitua por uma chave secreta segura

// Mock de usuários
const users = [
    {
        id: '1',
        username: 'user',
        password: '$2a$10$D9UIsmR29q7pDk/UhPzPmeXtt7l1vO9n.kpd2jJ7Z/Ji3SE5bBO5K' // 'password' criptografada
    }
];

const login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            console.log('Erro na comparação ou senha incorreta:', err);
            return res.status(401).json({ message: 'Credenciais inválidas!' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    });
};

module.exports = { login };
EOL

# Criar o arquivo processoController.js
cat <<EOL > src/controllers/processoController.js
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
EOL

# Criar o arquivo advogadoController.js
cat <<EOL > src/controllers/advogadoController.js
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
EOL

# Criar o arquivo clienteController.js
cat <<EOL > src/controllers/clienteController.js
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
EOL

# Criar o arquivo audienciaController.js
cat <<EOL > src/controllers/audienciaController.js
const { v4: uuidv4 } = require('uuid');
const audiencias = [];

const createAudiencia = (req, res) => {
    const { data, hora, local, processo_id } = req.body;
    const id = uuidv4();
    const novaAudiencia = { id, data, hora, local, processo_id };
    audiencias.push(novaAudiencia);
    res.status(201).json(novaAudiencia);
};

const getAudienciaById = (req, res) => {
    const audiencia = audiencias.find(a => a.id === req.params.id);
    if (!audiencia) return res.status(404).json({ message: 'Audiência não encontrada' });
    res.json(audiencia);
};

const updateAudienciaById = (req, res) => {
    const index = audiencias.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Audiência não encontrada' });
    const { data, hora, local, processo_id } = req.body;
    audiencias[index] = { id: req.params.id, data, hora, local, processo_id };
    res.json(audiencias[index]);
};

const deleteAudienciaById = (req, res) => {
    const index = audiencias.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Audiência não encontrada' });
    audiencias.splice(index, 1);
    res.json({ message: 'Audiência excluída com sucesso' });
};

module.exports = { createAudiencia, getAudienciaById, updateAudienciaById, deleteAudienciaById };
EOL

# Criar o arquivo auth.js
cat <<EOL > src/middleware/auth.js
const jwt = require('jsonwebtoken');
const secretKey = 'secreta'; // Substitua por uma chave secreta segura

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = verifyToken;
EOL

# Criar o arquivo swagger.js
cat <<EOL > src/swagger/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Sistema Jurídico API',
        version: '1.0.0',
        description: 'Documentação da API para o sistema jurídico.'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor local'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [
        {
            bearerAuth: []
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./src/controllers/*.js'] // Inclua todos os controladores para que o Swagger possa documentar
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
EOL

# Rodar o servidor
node src/index.js
