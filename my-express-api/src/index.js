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
    console.log(`Servidor rodando em http://localhost:`);
});
