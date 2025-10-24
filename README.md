🛰️ HighTech — Backend

Este é o backend do sistema HighTech, responsável por gerenciar as conexões com o banco de dados Supabase e disponibilizar rotas RESTful para comunicação com o frontend.

🚀 Tecnologias utilizadas

Node.js — Ambiente de execução JavaScript

Express.js — Framework para criação das rotas e API

Supabase — Banco de dados e autenticação

dotenv — Gerenciamento de variáveis de ambiente

⚙️ Configuração do ambiente

Clone o repositório

git clone https://github.com/EliasMDJunior/hightech-backend.git
cd hightech-backend


Instale as dependências

npm install


Crie o arquivo .env na raiz do projeto com as variáveis do Supabase:

SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=seu_token_aqui
PORT=3000

🧠 Execução do projeto

Para rodar o backend localmente:

node index.js


O servidor será iniciado e estará disponível em:
👉 http://localhost:3000

🧩 Endpoints principais
Método	Rota	Descrição


(Os endpoints variam conforme o módulo implementado.)

Desenvolvido por Elias Jr.
