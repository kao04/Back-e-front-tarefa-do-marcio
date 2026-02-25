# Back-e-front-tarefa-do-marcio

Projeto acadêmico de cadastro de Filmes com Node.js (backend) e HTML/JavaScript (frontend).

## Estrutura
```
/
├── backend/
│   ├── server.js       # Servidor Express com rotas GET e POST
│   └── db.js           # Conexão com MySQL
├── frontend/
│   ├── index.html      # Página de listagem de filmes
│   └── cadastro.html   # Página de cadastro de filmes
├── database.sql        # Script SQL para criar a tabela
├── .env.example        # Exemplo de variáveis de ambiente
└── .gitignore
```

## Como rodar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   cd backend
   npm install
   ```
3. Copie `.env.example` para `.env` e preencha com suas credenciais
4. Crie a tabela no banco usando `database.sql`
5. Inicie o servidor:
   ```bash
   npm start
   ```
6. Acesse `http://localhost:3000` no navegador
