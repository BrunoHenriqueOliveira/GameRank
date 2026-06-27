# GameRank

Plataforma full-stack de **avaliação e recomendação de jogos eletrônicos**, desenvolvida como projeto de portfólio com arquitetura de microsserviços.

O usuário pode navegar pelo catálogo de jogos, visualizar detalhes, ler e escrever avaliações, e receber recomendações processadas por um microserviço independente em Python.

---

## Demonstração

| Tela | Descrição |
|---|---|
| Catálogo | Listagem de jogos com cards e informações rápidas |
| Detalhes do jogo | Página completa com reviews e rating médio |
| Avaliações | Modal para criar uma nova avaliação |
| Sobre | Página informativa sobre o projeto |

---

## Arquitetura

Quatro serviços orquestrados via **Docker Compose**, sem acoplamento direto entre eles:

```
GameRank
├── gamerank-frontend     → Angular 19 (SPA)
├── gamerank-backend      → Java 21 + Spring Boot (API REST)
├── recommender-python    → Python + Flask (microserviço de recomendação)
└── docker-compose.yml    → Orquestração completa
```

```
[Browser] ──► [Angular :4200]
                   │
                   ▼
            [Spring Boot :8080] ──► [MongoDB :27017]
                   │
                   ▼
            [Flask/Python :5000] ──► [MongoDB :27017]
```

---

## Tecnologias

**Frontend**
- Angular 19 com componentes standalone
- TypeScript
- SCSS

**Backend**
- Java 21
- Spring Boot 3
- Spring Data MongoDB
- API REST (CRUD completo)

**Microserviço de Recomendação**
- Python
- Flask

**Infraestrutura**
- MongoDB (banco de dados NoSQL)
- Docker e Docker Compose

---

## Funcionalidades

- Listagem de jogos com cards e informações resumidas
- Página de detalhes por jogo
- Sistema de avaliações com nota e comentário
- Cálculo e exibição de rating médio
- Integração com microserviço de recomendação
- Comunicação inter-serviços via HTTP
- Containerização completa — sobe tudo com um único comando

---

## Como executar

**Pré-requisito:** Docker e Docker Compose instalados.

```bash
# 1. Clone o repositório
git clone https://github.com/BrunoHenriqueOliveira/GameRank.git
cd GameRank

# 2. Suba todos os serviços
docker compose up --build
```

Após a inicialização, acesse:

| Serviço | URL |
|---|---|
| Frontend | http://localhost:4200 |
| Backend API | http://localhost:8080 |
| Recommendation API | http://localhost:5000 |

---

## Endpoints da API

A documentação interativa completa está disponível via Swagger UI após subir o projeto:

**http://localhost:8080/swagger-ui/index.html**

```
GET    /games                        → Lista todos os jogos
POST   /games                        → Cadastra um jogo
GET    /games/{id}                   → Busca jogo por ID
PUT    /games/{id}                   → Atualiza jogo
DELETE /games/{id}                   → Remove jogo
POST   /games/{gameId}/reviews       → Adiciona avaliação
GET    /games/{gameId}/reviews       → Lista avaliações do jogo
PUT    /games/reviews/{reviewId}     → Atualiza avaliação
DELETE /games/reviews/{reviewId}     → Remove avaliação
POST   /games/recommend              → Solicita recomendações (via Python)
```

---

## Estrutura do projeto

```
gamerank-frontend/
└── src/app/
    ├── features/
    │   ├── games/          → game-list, game-card, game-detail, game-reviews, review-form-modal
    │   ├── about/          → página sobre o projeto
    │   └── recommendations/
    ├── services/           → comunicação com a API
    ├── models/             → interfaces TypeScript (Game, Review)
    ├── core/
    └── shared/

gamerank-backend/
└── src/main/java/com/BrunoDev/
    └── (controllers, services, repositories, models)

recommender-python/
└── recommender.py          → microserviço Flask
```

---

## Autor

**Bruno Henrique Oliveira**
Software Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bruno-henrique-da-silva-oliveira-dev/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/BrunoHenriqueOliveira)

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
