# Projet Structure idea:
```
Gomoku/
├── README.md
├── Makefile
├── docker-compose.yml
│
├── docs/
│   ├── architecture.md
│   ├── api-contracts.md
│   └── roadmap.md
│
├── gomoku-core-api/
│   ├── Dockerfile
│   ├── build.gradle
│   ├── settings.gradle
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/gomoku/core/
│   │   │   │       ├── controller/
│   │   │   │       ├── service/
│   │   │   │       ├── rules/
│   │   │   │       ├── model/
│   │   │   │       ├── ai/
│   │   │   │       └── config/
│   │   │   └── resources/
│   │   └── test/
│   └── .dockerignore
│
├── gomoku-ai-agent/
│   ├── Dockerfile
│   ├── go.mod
│   ├── cmd/
│   │   └── server/
│   │       └── main.go
│   ├── internal/
│   │   ├── api/
│   │   ├── board/
│   │   ├── rules/
│   │   ├── minimax/
│   │   ├── heuristic/
│   │   └── evaluation/
│   ├── tests/
│   └── .dockerignore
│
└── gomoku-web-ang/
    ├── Dockerfile
    ├── package.json
    ├── angular.json
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── services/
    │   │   ├── models/
    │   │   └── core/
    │   ├── assets/
    │   └── environments/
    └── .dockerignore
```