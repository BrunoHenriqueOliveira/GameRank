# 🎮 GameRank

GameRank é uma plataforma full-stack para **avaliação e recomendação de jogos eletrônicos**, construída com arquitetura de microsserviços.

O projeto permite que usuários registrem avaliações de jogos e utiliza um **microserviço em Python** para processar dados e fornecer recomendações.

Este projeto foi desenvolvido como parte de um **portfólio de engenharia de software**, demonstrando integração entre múltiplas tecnologias modernas.

---

# 🏗️ Arquitetura do Projeto

A aplicação segue uma arquitetura baseada em microsserviços:

GameRank

├── gamerank-frontend

├── gamerank-backend

├── recommender-python

├── docker-compose.yml

└── README.md

---

# 🚀 Como executar o projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/gamerank.git
cd gamerank
```
### 2️⃣ Subir os containers
O projeto utiliza Docker Compose para subir todos os serviços automaticamente.

```bash
docker compose up --build
```
Ou em modo background:
```bash
docker compose up -d --build
```
### 3️⃣ Serviços disponíveis

Após iniciar os containers, os serviços estarão disponíveis nos seguintes endereços:

Serviço	URL

Frontend http://localhost:4200

Backend API	http://localhost:8080

Recommendation API	http://localhost:5000

MongoDB	localhost:27017

---

### 📚 Funcionalidades

✅ Listagem de jogos cadastrados  
✅ Sistema de avaliações de jogos  
✅ API REST para gerenciamento de dados  
✅ Microserviço de recomendação em Python  
✅ Comunicação entre serviços via HTTP  
✅ Containerização completa com Docker  
✅ Estrutura baseada em microsserviços  

---

## 🛠️Tecnologias Utilizadas

- **Angular**: Desenvolvimento do front-end da aplicação
- **Java + Spring Boot**: API principal responsável pela lógica do sistema
- **Python + Flask**: Microserviço responsável pelas recomendações
- **MongoDB**: Banco de dados NoSQL para armazenamento das informações
- **Docker**: Containerização dos serviços
- **Docker Compose**: Orquestração dos containers

---

### 👨‍💻 Autor

Bruno Henrique
Software Developer

## Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.