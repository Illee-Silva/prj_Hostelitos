# Hostelitos 🏨

> Sistema gerenciador de hoteis.



## Links Importantes

[Trello](https://trello.com/b/KVB79Jln/tarefas)

[Documentação](https://discord.gg/8aCdQ4Pd) #Nécessario Cargo para Visualizar, Mencione um membro da equipe e aguarde.


## Instruções
==Siga Todos os Passos Para Evitar Problemas==

- Crie o Arquivo .env dentro da pasta Backend, lembre-se de adicionar o arquivo ao GITIGNORE, caso contrario você irá vazar a Key da API publicamente.

- Para Criar o Venv use:  
    >`python -m venv .nomeLegalDoEnv`  
    > Por favor Criar com um "." antes do nome

    > Todos os Comandos envolvendo o projeto devem ser executados com o Vitrual Envirioment(Venv) **Ativo!**  

    > Inicie O VEnv que é o nosso ambiente de Desenvolvimento:  
    Linux: source .nomeLegalDoEnv/bin/activate  
    Windows: .nomeLegalDoEnv/Scripts/Activate


- Instale as dependências do projeto

### **Requer:**
>   Python 3.11  
    Node  
    React  
    Vite  
    Flask
   

**Dependêndias BackEnd**

>   `pip install -r requirements.txt`  
    **Navegue até a pasta que contém o arquivo antes**
    
>   **Mantenha sempre atualizado ao adicionar novas dependências:** `pip freeze > requirements.txt`
---
**Dependências FrontEnd**

>    O arquivo package.json na pasta frontend contém as dependências do projeto, apenas coloqueo na pasta front end e execute: `npm install`

>    **Mantenha sempre atualizado ao adicionar novas dependências:** `npm update`


### Execução

 
> Navegue até a pasta Backend e execute:  
`python -m flask run`

> Navegue até a pasta frontend(Em outro terminal não feche o terminal do Backend) e execute:  
`npm run dev`

### Após isso entre no website, Endereço padrão: http://localhost:5173