# Documento de Requisitos do Sistema Jurídico

## 1. Visão Geral

O sistema jurídico é uma plataforma para gerenciar processos jurídicos, advogados, clientes e audiências. O sistema oferece funcionalidades CRUD (Criar, Ler, Atualizar, Excluir) para cada uma dessas entidades, além de autenticação via JSON Web Token (JWT).

## 2. Requisitos Funcionais

### 2.1 Autenticação

- **Endpoint para Login**
  - **Método**: POST
  - **URL**: `/login`
  - **Descrição**: Autentica o usuário e retorna um token JWT para acesso às APIs protegidas.
  - **Corpo da Requisição**:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Resposta**:
    ```json
    {
      "token": "string"
    }
    ```

### 2.2 Processos

- **Criar Processo**
  - **Método**: POST
  - **URL**: `/processos`
  - **Descrição**: Cria um novo processo.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Corpo da Requisição**:
    ```json
    {
      "numero": "string",
      "descricao": "string",
      "data_abertura": "string",
      "status": "string",
      "cliente_id": "string",
      "advogado_id": "string"
    }
    ```
  - **Resposta**:
    ```json
    {
      "id": "string",
      "numero": "string",
      "descricao": "string",
      "data_abertura": "string",
      "status": "string",
      "cliente_id": "string",
      "advogado_id": "string"
    }
    ```

- **Consultar Processo**
  - **Método**: GET
  - **URL**: `/processos/{id}`
  - **Descrição**: Retorna um processo pelo ID.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Resposta**:
    ```json
    {
      "id": "string",
      "numero": "string",
      "descricao": "string",
      "data_abertura": "string",
      "status": "string",
      "cliente_id": "string",
      "advogado_id": "string"
    }
    ```

- **Atualizar Processo**
  - **Método**: PUT
  - **URL**: `/processos/{id}`
  - **Descrição**: Atualiza um processo existente.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Corpo da Requisição**:
    ```json
    {
      "numero": "string",
      "descricao": "string",
      "data_abertura": "string",
      "status": "string",
      "cliente_id": "string",
      "advogado_id": "string"
    }
    ```
  - **Resposta**:
    ```json
    {
      "id": "string",
      "numero": "string",
      "descricao": "string",
      "data_abertura": "string",
      "status": "string",
      "cliente_id": "string",
      "advogado_id": "string"
    }
    ```

- **Excluir Processo**
  - **Método**: DELETE
  - **URL**: `/processos/{id}`
  - **Descrição**: Exclui um processo pelo ID.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Resposta**:
    ```json
    {
      "message": "Processo excluído com sucesso"
    }
    ```

### 2.3 Advogados

- **Criar Advogado**
  - **Método**: POST
  - **URL**: `/advogados`
  - **Descrição**: Cria um novo advogado.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Corpo da Requisição**:
    ```json
    {
      "nome": "string",
      "oab": "string",
      "telefone": "string",
      "email": "string"
    }
    ```
  - **Resposta**:
    ```json
    {
      "id": "string",
      "nome": "string",
      "oab": "string",
      "telefone": "string",
      "email": "string"
    }
    ```

- **Consultar Advogado**
  - **Método**: GET
  - **URL**: `/advogados/{id}`
  - **Descrição**: Retorna um advogado pelo ID.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Resposta**:
    ```json
    {
      "id": "string",
      "nome": "string",
      "oab": "string",
      "telefone": "string",
      "email": "string"
    }
    ```

- **Atualizar Advogado**
  - **Método**: PUT
  - **URL**: `/advogados/{id}`
  - **Descrição**: Atualiza um advogado existente.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Corpo da Requisição**:
    ```json
    {
      "nome": "string",
      "oab": "string",
      "telefone": "string",
      "email": "string"
    }
    ```
  - **Resposta**:
    ```json
    {
      "id": "string",
      "nome": "string",
      "oab": "string",
      "telefone": "string",
      "email": "string"
    }
    ```

- **Excluir Advogado**
  - **Método**: DELETE
  - **URL**: `/advogados/{id}`
  - **Descrição**: Exclui um advogado pelo ID.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Resposta**:
    ```json
    {
      "message": "Advogado excluído com sucesso"
    }
    ```

### 2.4 Clientes

- **Criar Cliente**
  - **Método**: POST
  - **URL**: `/clientes`
  - **Descrição**: Cria um novo cliente.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Corpo da Requisição**:
    ```json
    {
      "nome": "string",
      "cpf": "string",
      "telefone": "string",
      "email": "string"
    }
    ```
  - **Resposta**:
    ```json
    {
      "id": "string",
      "nome": "string",
      "cpf": "string",
      "telefone": "string",
      "email": "string"
    }
    ```

- **Consultar Cliente**
  - **Método**: GET
  - **URL**: `/clientes/{id}`
  - **Descrição**: Retorna um cliente pelo ID.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Resposta**:
    ```json
    {
      "id": "string",
      "nome": "string",
      "cpf": "string",
      "telefone": "string",
      "email": "string"
    }
    ```

- **Atualizar Cliente**
  - **Método**: PUT
  - **URL**: `/clientes/{id}`
  - **Descrição**: Atualiza um cliente existente.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Corpo da Requisição**:
    ```json
    {
      "nome": "string",
      "cpf": "string",
      "telefone": "string",
      "email": "string"
    }
    ```
  - **Resposta**:
    ```json
    {
      "id": "string",
      "nome": "string",
      "cpf": "string",
      "telefone": "string",
      "email": "string"
    }
    ```

- **Excluir Cliente**
  - **Método**: DELETE
  - **URL**: `/clientes/{id}`
  - **Descrição**: Exclui um cliente pelo ID.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Resposta**:
    ```json
    {
      "message": "Cliente excluído com sucesso"
    }
    ```

### 2.5 Audiências

- **Criar Audiência**
  - **Método**: POST
  - **URL**: `/audiencias`
  - **Descrição**: Cria uma nova audiência.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Corpo da Requisição**:
    ```json
    {
      "data": "string",
      "hora": "string",
      "local": "string",
      "processo_id": "string"
    }
    ```
  - **Resposta**:
    ```json
    {
      "id": "string",
      "data": "string",
      "hora

": "string",
      "local": "string",
      "processo_id": "string"
    }
    ```

- **Consultar Audiência**
  - **Método**: GET
  - **URL**: `/audiencias/{id}`
  - **Descrição**: Retorna uma audiência pelo ID.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Resposta**:
    ```json
    {
      "id": "string",
      "data": "string",
      "hora": "string",
      "local": "string",
      "processo_id": "string"
    }
    ```

- **Atualizar Audiência**
  - **Método**: PUT
  - **URL**: `/audiencias/{id}`
  - **Descrição**: Atualiza uma audiência existente.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Corpo da Requisição**:
    ```json
    {
      "data": "string",
      "hora": "string",
      "local": "string",
      "processo_id": "string"
    }
    ```
  - **Resposta**:
    ```json
    {
      "id": "string",
      "data": "string",
      "hora": "string",
      "local": "string",
      "processo_id": "string"
    }
    ```

- **Excluir Audiência**
  - **Método**: DELETE
  - **URL**: `/audiencias/{id}`
  - **Descrição**: Exclui uma audiência pelo ID.
  - **Cabeçalho**:
    - `Authorization: Bearer <token>`
  - **Resposta**:
    ```json
    {
      "message": "Audiência excluída com sucesso"
    }
    ```

## 3. Regras de Negócio

1. **Autenticação e Autorização**
   - Todos os endpoints que manipulam dados sensíveis requerem um token JWT válido no cabeçalho da requisição (`Authorization: Bearer <token>`).
   - O token JWT é gerado através do endpoint `/login` e deve ser incluído em todas as requisições para endpoints protegidos.

2. **Validação de Dados**
   - Todos os dados recebidos e enviados pelas APIs devem ser validados para garantir integridade e consistência.

