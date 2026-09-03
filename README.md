# Gomoku

A modular full-stack implementation of **Gomoku**, designed around a central REST API capable of supporting multiple clients and interchangeable AI engines.

The project is being developed as more than a standalone game: the goal is to provide a reusable game server that can be consumed by different interfaces such as a web application, terminal client, Minecraft integration, or other external applications.

---

## Overview

The architecture is built around a **Spring Boot core API** responsible for managing the game state, players, authentication, rules and interactions with AI engines.

The Angular application is currently the main client, but it is intentionally kept independent from the game engine.

```text
                        ┌─────────────────────┐
                        │   Angular Web App   │
                        │      :4200          │
                        └──────────┬──────────┘
                                   │
                                   │ REST
                                   ▼
┌──────────────────┐     ┌─────────────────────┐     ┌──────────────────┐
│ Future Clients   │────▶│   Gomoku Core API   │◀───▶│    AI Agents     │
│                  │     │      :8081          │     │                  │
│ CLI              │     │                     │     │ Minimax / other  │
│ Minecraft        │     │ Spring Boot / Java  │     │ implementations  │
│ Other frontends  │     └──────────┬──────────┘     └──────────────────┘
└──────────────────┘                │
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     PostgreSQL      │
                         │       :5432         │
                         └─────────────────────┘
```

The core API acts as the **source of truth**. Clients and AI implementations should not contain authoritative game logic.

---

## Current Status

The project is currently under active development.

### Implemented

* Docker-based development environment
* Spring Boot REST API
* Angular web application
* PostgreSQL database
* Liquibase database migrations
* User registration and login
* JWT authentication
* Password hashing with Spring Security
* Game creation
* Game retrieval
* Game listing
* Player joining
* Game startup
* Multiple game types:

    * Player vs Player
    * Player vs AI
    * AI vs AI
* Swagger / OpenAPI documentation
* Initial game and board models
* Angular game creation interface

### In Progress / Planned

* Persistent game storage
* Complete Gomoku game engine
* Move validation
* Board interactions
* Turn management
* Win detection
* Capture rules
* Double-three detection
* Complete game history
* Spectator mode
* AI service integration
* AI vs AI matches
* Match replay
* Game statistics
* Additional clients

---

## Tech Stack

### Backend

* **Java 21**
* **Spring Boot 4**
* Spring MVC
* Spring Data JPA
* Spring Security
* OAuth2 Resource Server / JWT
* Hibernate
* Liquibase
* MapStruct
* Lombok
* SpringDoc OpenAPI

### Frontend

* **Angular 21**
* TypeScript
* SCSS
* RxJS
* Angular Router
* Angular Signals

### Database

* **PostgreSQL 17**
* Liquibase migrations

### Infrastructure

* Docker
* Docker Compose
* Make

---

## Repository Structure

```text
Gomoku/
│
├── README.md
├── Makefile
├── docker-compose.yml
├── Gomoku
│
├── docs/
│   ├── architecture.md
│   └── roadmap.md
│
├── gomoku-core-api/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/
│       │   └── resources/
│       └── test/
│
├── gomoku-web-ang/
│   ├── Dockerfile
│   ├── Dockerfile.prod
│   ├── package.json
│   ├── angular.json
│   ├── nginx.conf
│   └── src/
│
└── gomoku-ai-agent/
    ├── Dockerfile
    └── README.md
```

### `gomoku-core-api`

Central game server.

Its responsibilities include:

* authentication
* users
* game lifecycle
* players
* boards
* game rules
* move validation
* game history
* communication with AI engines

### `gomoku-web-ang`

Angular client for the game.

The frontend communicates exclusively with the core API and is not responsible for authoritative game logic.

### `gomoku-ai-agent`

Reserved for independent AI implementations.

AI engines are intended to communicate with the core API through a defined contract, allowing different algorithms or implementations to be used without changing the rest of the application.

---

# Running the Project

## Requirements

The recommended development environment is **Linux or WSL**.

You need:

* Docker
* Docker Compose
* Make

Check your installation with:

```bash
docker --version
docker compose version
make --version
```

If Docker requires `sudo` on Linux, you can add your user to the Docker group:

```bash
sudo usermod -aG docker $USER
```

Log out and back in for the change to take effect.

---

## Start Everything

From the repository root:

```bash
make
```

or:

```bash
make all
```

This will build and start the Docker environment.

Equivalent command:

```bash
docker compose up --build -d
```

---

## Services

| Service         | Address                                     |
| --------------- | ------------------------------------------- |
| Angular Web App | http://localhost:4200                       |
| Core REST API   | http://localhost:8081                       |
| Swagger UI      | http://localhost:8081/swagger-ui/index.html |
| PostgreSQL      | localhost:5432                              |

Docker internally exposes the Spring Boot application on port `8080`, mapped to port `8081` on the host.

---

# Configuration

Docker Compose provides development defaults for the application.

The following environment variables can be overridden:

```env
POSTGRES_DB=gomoku
POSTGRES_USER=gomoku
POSTGRES_PASSWORD=gomoku

JWT_SECRET=your-secret-key
```

For example, they can be defined in a `.env` file at the repository root.

> The default credentials and JWT secret are intended for local development only. Production environments should always provide secure values.

---

# Database

PostgreSQL runs inside Docker and stores its data in the volume:

```text
gomoku-postgres-data
```

Database schema changes are managed with **Liquibase**.

The master changelog is located at:

```text
gomoku-core-api/src/main/resources/db/changelog/db.changelog-master.xml
```

Liquibase migrations are automatically executed when the Spring Boot application starts.

Currently, persistent storage is primarily used for user accounts. Game persistence is still under development.

---

# Authentication

The API supports account creation and authentication using JWT access tokens.

Available authentication endpoints:

```text
POST /auth/register
POST /auth/login
```

Successful authentication returns an access token along with information about the authenticated user.

Protected API requests use:

```http
Authorization: Bearer <access-token>
```

JWT tokens currently expire after:

```text
3600 seconds
```

---

# Game API

The initial game lifecycle API is available under:

```text
/games
```

### List games

```http
GET /games
```

Returns the UUIDs of currently available games.

### Create a game

```http
POST /games?gameType=PLAYER_VS_PLAYER
```

Supported types:

```text
PLAYER_VS_PLAYER
PLAYER_VS_AI
AI_VS_AI
```

### Get a game

```http
GET /games/{gameUuid}
```

### Join a game

```http
POST /games/{gameUuid}/join
```

### Start a game

```http
POST /games/{gameUuid}/start
```

The game API is still evolving and additional endpoints will be introduced as the game engine is implemented.

---

# Game Architecture

A game currently contains the main concepts required by the future engine:

```text
Game
├── UUID
├── Status
├── Game Type
├── Board
├── Players
├── Current Turn
├── Black Captures
└── White Captures
```

Supported game modes:

```text
PLAYER_VS_PLAYER
PLAYER_VS_AI
AI_VS_AI
```

Game states include:

```text
WAITING
CREATED
IN_PROGRESS
BLACK_TO_MOVE
WHITE_TO_MOVE
BLACK_WINS
WHITE_WINS
DRAW
CANCELLED
```

The objective is to keep all game state transitions and rule validation inside the core API.

---

# AI Architecture

AI engines are intentionally separated from the main application.

The target architecture is:

```text
Core API
   │
   ├── Game state
   ├── Rules
   ├── Move validation
   │
   └──── AI request
           │
           ▼
      AI Agent
           │
           ├── Board analysis
           ├── Move generation
           ├── Minimax / Negamax
           ├── Alpha-Beta pruning
           ├── Heuristics
           └── Best move
           │
           ▼
      Core API validation
```

The API remains responsible for validating every move returned by an AI.

This makes it possible to implement several independent AI engines as long as they respect the same communication contract.

Potential implementations may include:

* Minimax
* Negamax
* Alpha-Beta pruning
* heuristic-based engines
* experimental algorithms
* external AI services

---

# Multiple Clients

Because the game is exposed through a REST API, the Angular frontend is only one possible interface.

The architecture is intended to eventually support clients such as:

```text
Angular Web App
       │
       ├──────┐
       │      │
CLI ───┤      │
       │      ▼
Minecraft ─▶ REST API ─▶ Game Engine
       │
Other ─┘
```

Each client can therefore display and interact with the same game server without reimplementing the game logic.

---

# Development Commands

## Start all services

```bash
make
```

or:

```bash
make all
```

---

## Stop containers

```bash
make clean
```

Equivalent to:

```bash
docker compose down
```

---

## Completely rebuild the environment

```bash
make re
```

This removes the existing environment and rebuilds it from scratch.

---

## Remove containers, volumes and images

```bash
make fclean
```

Equivalent to:

```bash
docker compose down -v --rmi all
```

> This command also deletes the PostgreSQL Docker volume and therefore removes local database data.

---

## Show running services

```bash
make ps
```

---

## Follow logs

```bash
make logs
```

---

## Start the backend

```bash
make backend
```

---

## Start the frontend

```bash
make frontend
```

---

# Development

## Angular

The Angular source directory is mounted into its Docker container.

Changes made to the frontend are therefore automatically detected by the Angular development server.

```text
gomoku-web-ang/
        │
        ▼
Docker volume
        │
        ▼
Angular dev server
```

The development frontend proxies `/api` requests to the Spring Boot container.

---

## Spring Boot

The backend Docker image is built using Maven and Java 21.

After backend source changes, rebuild it with:

```bash
make backend
```

or rebuild the complete environment:

```bash
make re
```

---

# API Documentation

When the backend is running, Swagger UI is available at:

```text
http://localhost:8081/swagger-ui/index.html
```

It can be used to inspect and test the REST API directly.

---

# Roadmap

The main development milestones are:

### 1. Platform Foundation

* [x] Docker environment
* [x] Spring Boot API
* [x] Angular frontend
* [x] PostgreSQL
* [x] Liquibase migrations
* [x] REST communication
* [x] Swagger / OpenAPI

### 2. Authentication

* [x] User entity
* [x] Registration
* [x] Login
* [x] Password hashing
* [x] JWT generation
* [ ] Complete frontend authentication integration
* [ ] Route protection

### 3. Game Lifecycle

* [ ] Game creation
* [x] Game types
* [ ] Game listing
* [ ] Game retrieval
* [ ] Player joining
* [ ] Game startup
* [ ] Persistent game storage
* [ ] Complete game synchronization

### 4. Gomoku Engine

* [ ] Stone placement
* [ ] Move validation
* [ ] Turn management
* [ ] Five-in-a-row detection
* [ ] Capture detection
* [ ] Double-three rule
* [ ] Victory conditions
* [ ] Draw detection
* [ ] Game history

### 5. Web Game

* [ ] Interactive Goban
* [ ] Player interactions
* [ ] Live board updates
* [ ] Current player display
* [ ] Capture display
* [ ] Game joining
* [ ] Spectator mode
* [ ] Move history
* [ ] Game restart

### 6. AI

* [ ] AI communication contract
* [ ] AI service
* [ ] Legal move generation
* [ ] Board evaluation
* [ ] Minimax / Negamax
* [ ] Alpha-Beta pruning
* [ ] Move ordering
* [ ] Iterative deepening
* [ ] Performance optimizations

### 7. Additional Clients

* [ ] CLI client
* [ ] Minecraft integration
* [ ] External client API documentation

---

# Project Philosophy

The project follows a few core principles:

* **The API owns the game state.**
* **Clients display the game but do not define its rules.**
* **AI engines propose moves, while the API validates them.**
* **Clients should be replaceable without modifying the game engine.**
* **AI implementations should be replaceable without modifying clients.**
* **Infrastructure should remain reproducible through Docker.**

This separation makes Gomoku both a game project and an experimentation platform for software architecture, APIs and artificial intelligence.
