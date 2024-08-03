# Documento de Requisitos do Sistema Jurídico

## Índice
1. [Visão Geral](#visão-geral)
2. [Modelos de Dados](#modelos-de-dados)
3. [CRUD das Operações Básicas](#crud-das-operações-básicas)
4. [Rotas/Endpoints](#rotasendpoints)
5. [Regras de Negócio](#regras-de-negócio)

---

## Visão Geral

O sistema jurídico visa gerenciar processos legais, advogados, clientes e audiências. As funcionalidades principais incluem a criação, leitura, atualização e exclusão de processos, advogados, clientes e audiências. 

---

## Modelos de Dados

### Processo
- `id`: Identificador único do processo (UUID)
- `numero`: Número do processo (string)
- `descricao`: Descrição do processo (texto)
- `data_abertura`: Data de abertura (data)
- `status`: Status do processo (enum: 'Aberto', 'Em Andamento', 'Encerrado')
- `cliente_id`: Referência ao cliente (UUID)
- `advogado_id`: Referência ao advogado responsável (UUID)

### Advogado
- `id`: Identificador único do advogado (UUID)
- `nome`: Nome do advogado (string)
- `oab`: Número da OAB (string)
- `telefone`: Telefone de contato (string)
- `email`: E-mail (string)

### Cliente
- `id`: Identificador único do cliente (UUID)
- `nome`: Nome do cliente (string)
- `cpf`: CPF do cliente (string)
- `telefone`: Telefone de contato (string)
- `email`: E-mail (string)

### Audiência
- `id`: Identificador único da audiência (UUID)
- `data`: Data da audiência (data)
- `hora`: Hora da audiência (hora)
- `local`: Local da audiência (string)
- `processo_id`: Referência ao processo associado (UUID)

---

## CRUD das Operações Básicas

### Processo

- **Create (POST)**: `/processos`
  - **Payload**: `{"numero": "12345", "descricao": "Descrição do processo", "data_abertura": "2024-08-01", "status": "Aberto", "cliente_id": "UUID", "advogado_id": "UUID"}`
  - **Resposta**: `{"id": "UUID", "numero": "12345", "descricao": "Descrição do processo", "data_abertura": "2024-08-01", "status": "Aberto", "cliente_id": "UUID", "advogado_id": "UUID"}`

- **Read (GET)**: `/processos/{id}`
  - **Resposta**: `{"id": "UUID", "numero": "12345", "descricao": "Descrição do processo", "data_abertura": "2024-08-01", "status": "Aberto", "cliente_id": "UUID", "advogado_id": "UUID"}`

- **Update (PUT)**: `/processos/{id}`
  - **Payload**: `{"numero": "12345", "descricao": "Descrição atualizada", "data_abertura": "2024-08-01", "status": "Em Andamento", "cliente_id": "UUID", "advogado_id": "UUID"}`
  - **Resposta**: `{"id": "UUID", "numero": "12345", "descricao": "Descrição atualizada", "data_abertura": "2024-08-01", "status": "Em Andamento", "cliente_id": "UUID", "advogado_id": "UUID"}`

- **Delete (DELETE)**: `/processos/{id}`
  - **Resposta**: `{"message": "Processo excluído com sucesso"}`

### Advogado

- **Create (POST)**: `/advogados`
  - **Payload**: `{"nome": "Nome do Advogado", "oab": "123456", "telefone": "123456789", "email": "email@dominio.com"}`
  - **Resposta**: `{"id": "UUID", "nome": "Nome do Advogado", "oab": "123456", "telefone": "123456789", "email": "email@dominio.com"}`

- **Read (GET)**: `/advogados/{id}`
  - **Resposta**: `{"id": "UUID", "nome": "Nome do Advogado", "oab": "123456", "telefone": "123456789", "email": "email@dominio.com"}`

- **Update (PUT)**: `/advogados/{id}`
  - **Payload**: `{"nome": "Nome Atualizado", "oab": "654321", "telefone": "987654321", "email": "novoemail@dominio.com"}`
  - **Resposta**: `{"id": "UUID", "nome": "Nome Atualizado", "oab": "654321", "telefone": "987654321", "email": "novoemail@dominio.com"}`

- **Delete (DELETE)**: `/advogados/{id}`
  - **Resposta**: `{"message": "Advogado excluído com sucesso"}`

### Cliente

- **Create (POST)**: `/clientes`
  - **Payload**: `{"nome": "Nome do Cliente", "cpf": "12345678900", "telefone": "123456789", "email": "email@dominio.com"}`
  - **Resposta**: `{"id": "UUID", "nome": "Nome do Cliente", "cpf": "12345678900", "telefone": "123456789", "email": "email@dominio.com"}`

- **Read (GET)**: `/clientes/{id}`
  - **Resposta**: `{"id": "UUID", "nome": "Nome do Cliente", "cpf": "12345678900", "telefone": "123456789", "email": "email@dominio.com"}`

- **Update (PUT)**: `/clientes/{id}`
  - **Payload**: `{"nome": "Nome Atualizado", "cpf": "09876543210", "telefone": "987654321", "email": "novomail@dominio.com"}`
  - **Resposta**: `{"id": "UUID", "nome": "Nome Atualizado", "cpf": "09876543210", "telefone": "987654321", "email": "novomail@dominio.com"}`

- **Delete (DELETE)**: `/clientes/{id}`
  - **Resposta**: `{"message": "Cliente excluído com sucesso"}`

### Audiência

- **Create (POST)**: `/audiencias`
  - **Payload**: `{"data": "2024-08-10", "hora": "14:00", "local": "Tribunal", "processo_id": "UUID"}`
  - **Resposta**: `{"id": "UUID", "data": "2024-08-10", "hora": "14:00", "local": "Tribunal", "processo_id": "UUID"}`

- **Read (GET)**: `/audiencias/{id}`
  - **Resposta**: `{"id": "UUID", "data": "2024-08-10", "hora": "14:00", "local": "Tribunal", "processo_id": "UUID"}`

- **Update (PUT)**: `/audiencias/{id}`
  - **Payload**: `{"data": "2024-08-15", "hora": "16:00", "local": "Sala 2", "processo_id": "UUID"}`
  - **Resposta**: `{"id": "UUID", "data": "2024-08-15", "hora": "16:00", "local": "Sala 2", "processo_id": "UUID"}`

- **Delete (DELETE)**: `/audiencias/{id}`
  - **Resposta**: `{"message": "Audiência excluída com sucesso"}`

---

## Regras de Negócio

1. **Validação de Dados**
   - CPF deve ser único para cada cliente.
   - Número da OAB deve ser único para cada advogado.
   - A data da audiência não pode ser anterior à data de abertura do processo.

2. **Gerenciamento de Processos**
   - O status do processo pode ser alterado apenas para "Em Andamento" ou "Encerrado" se o processo já estiver aberto.
   - Um processo deve ter um cliente e um advogado associados.

3. **Audiências**
   - Não é permitido agendar múltiplas audiências para o mesmo processo na mesma data e hora.

4. **Controle de Acesso**
   - Apenas advogados podem ser associados a processos.
   - Somente administradores podem excluir clientes, advogados ou processos.

---