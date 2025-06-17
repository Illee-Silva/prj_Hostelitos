# Hostelitos 🏨

> Sistema gerenciador de hoteis.



## Requisitos

Antes de iniciar, instale em sua máquina:

- **Python 3.11 ou superior**  
  [Download Python](https://www.python.org/downloads/)

- **Node.js (recomendado versão LTS)**  
  [Download Node.js](https://nodejs.org/)

- **npm** (já incluso ao instalar o Node.js)

- **Vite**  
  Será instalado automaticamente com as dependências do frontend.

- **Flask**  
  Será instalado automaticamente com as dependências do backend (`requirements.txt`).

---

## Links Importantes

[Trello](https://trello.com/b/KVB79Jln/tarefas)

[Documentação](https://discord.gg/8aCdQ4Pd) #Nécessario Cargo para Visualizar, Mencione um membro da equipe e aguarde.


## Instruções
***Siga todos os passos para evitar problemas***

1. **Crie os arquivos `.env`**  
   - Um dentro da pasta `backend`  
   - Um dentro da pasta `frontend`  
   - Adicione ambos ao `.gitignore` para não vazar informações sensíveis.

   **O arquivo `.env` do backend deve conter:**  
   - MONGO_URI

   **O arquivo `.env` do frontend deve conter:**  
   - VITE_FIREBASE_API_KEY  
   - VITE_FIREBASE_AUTH_DOMAIN  
   - VITE_FIREBASE_PROJECT_ID  
   - VITE_FIREBASE_STORAGE_BUCKET  
   - VITE_FIREBASE_MESSAGING_SENDER_ID  
   - VITE_FIREBASE_APP_ID  
   - VITE_FIREBASE_MEASUREMENT_ID

2. **Crie e ative o ambiente virtual (venv) do Python**  
   - No terminal, navegue até a pasta `backend`.
   - Crie o venv:  
     `python -m venv .nomeDoEnv`
   - Ative o venv:  
     - **Windows:** `.nomeDoEnv\Scripts\Activate`  
     - **Linux:** `source .nomeDoEnv/bin/activate`
   - **Sempre execute comandos Python com o venv ativo!**

3. **Instale as dependências do backend**  
   - Com o venv ativo e dentro da pasta `backend`:  
     `pip install -r requirements.txt`
   - Ao adicionar novas dependências, atualize:  
     `pip freeze > requirements.txt`

4. **Instale as dependências do frontend**  
   - No terminal, navegue até a pasta `frontend`.
   - Execute:  
     `npm install`
   - Para atualizar dependências:  
     `npm update`

---

## Execução Local

1. **Inicie o backend**
   - No terminal, dentro da pasta `backend` e com o venv ativo:  
     `python -m flask run`

2. **Inicie o frontend**
   - Em outro terminal, navegue até a pasta `frontend`:  
     `npm run dev`

3. **Acesse o sistema**
   - Abra o navegador em: [http://localhost:5173](http://localhost:5173)

## Instruções para Variáveis de Ambiente da API

- Para rodar localmente, defina no arquivo `frontend/.env`:
  ```
  VITE_API_URL=http://localhost:5000
  ```
- Para produção (ex: Railway), defina:
  ```
  VITE_API_URL=https://seu-backend-production.up.railway.app
  ```
  Substitua pela URL gerada pelo Railway após o deploy do backend.

## Rodando Localmente

1. Certifique-se de que o backend está rodando em `http://localhost:5000`.
2. No frontend, mantenha `VITE_API_URL=http://localhost:5000` no `.env`.
3. Execute normalmente:
   - Backend: `python -m flask run`
   - Frontend: `npm run dev`

## Rodando em Produção

1. Faça o deploy do backend (ex: Railway) e obtenha a URL pública.
2. No frontend, altere o `.env` para:
   ```
   VITE_API_URL=https://seu-backend-production.up.railway.app
   ```
3. Faça o build do frontend:
   ```
   npm run build
   ```
4. Faça o deploy do frontend (ex: Vercel, Netlify) usando o `.env` de produção.
