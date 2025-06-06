# Case Backend - Anka Tech

Este repositório contém o código-fonte do backend da aplicação de gerenciamento de clientes e suas alocações de ativos. A aplicação foi desenvolvida como um case técnico para a Anka Tech. 

O backend é construído com Node.js, Fastify e Prisma, e é totalmente containerizado com Docker Compose, incluindo um serviço de banco de dados MySQL. 

**Este é o repositório principal para a configuração do ambiente completo.**

## Tecnologias Utilizadas
* **Backend:** Node.js, Fastify, Prisma, TypeScript, Zod 
* **Banco de Dados:** MySQL 
* **Ambiente:** Docker, Docker Compose 

## Pré-requisitos
* **Docker** e **Docker Compose**
* **Node.js** e **npm** (para executar o projeto frontend)

## 🚀 Guia de Execução da Aplicação Completa

### 1. Clone os Repositórios
Primeiro, clone este repositório do backend. Em seguida, em uma pasta separada, clone o repositório do frontend.

```bash
# Clone o backend
git clone https://github.com/ferreiraashi/case-backend-anka-tech.git

# Em outro local, clone o frontend
git clone https://github.com/ferreiraashi/case-frontend-anka-tech.git
```

### 2. Configure o Backend
Este repositório já contém o `docker-compose.yml`. Você só precisa criar o arquivo de variáveis de ambiente.

```bash
# Estando na pasta do backend crie um arquivo chamado .env e cole o conteudo dentro do .env.example
cp .env.example .env
```
_**Nota:** O arquivo `.env` já vem pré-configurado e não necessita de alterações para o ambiente Docker padrão._

### 3. Inicie o Backend e o Banco de Dados
Use o Docker Compose para construir e iniciar os serviços.

```bash
# Estando na pasta do backend
docker-compose up --build -d
```

### 4. Configure o Banco de Dados
Com os contêineres em execução, aplique as migrações do Prisma para criar a estrutura das tabelas e popule o banco com os dados iniciais de ativos.

```bash
# Aplica as migrações existentes de forma segura
docker-compose exec backend_anka npx prisma migrate deploy

# Popula a tabela de ativos com dados iniciais
docker-compose exec backend_anka npx prisma db seed
```

### 5. Inicie o Frontend
Em um **novo terminal**, navegue até a pasta do frontend que você clonou e inicie o servidor de desenvolvimento.

```bash
# Navegue até a pasta do frontend
cd CAMINHO/PARA/SEU-REPO-FRONTEND

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### 6. Acesse a Aplicação
Tudo pronto! A aplicação está disponível nos seguintes endereços:

* **Aplicação Frontend:** [http://localhost:3000](http://localhost:3000)
* **API Backend:** [http://localhost:3001](http://localhost:3001)

## Para Parar a Aplicação
Para parar os contêineres do Docker (backend e db), execute o seguinte comando na pasta do backend:
```bash
docker-compose down
```
