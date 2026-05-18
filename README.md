# Gomoku

## Run with Docker Compose on GNOME / Linux

### Requirements

Make sure Docker and Docker Compose are installed:

```bash
docker --version
docker compose version
```

If Docker requires sudo, add your user to the Docker group:

```bash
sudo usermod -aG docker $USER
```

Then log out and log back in.

---

## Start the project

From the repository root:

```bash
docker compose up --build
```

This will start the available services:

- `gomoku-core-api` — Spring Boot backend
- `gomoku-web-ang` — Angular frontend

---

## Access the application

Angular frontend:

```text
http://localhost:4200
```

Spring Boot Swagger:

```text
http://localhost:8081/swagger-ui/index.html
```

---

## Stop the project

```bash
docker compose down
```

---

## Rebuild everything

```bash
docker compose build --no-cache
docker compose up
```

---

## Useful commands

Show running containers:

```bash
docker ps
```

Show logs:

```bash
docker compose logs -f
```

Show logs for one service:

```bash
docker compose logs -f gomoku-core-api
docker compose logs -f gomoku-web-ang
```

Restart one service:

```bash
docker compose restart gomoku-core-api
docker compose restart gomoku-web-ang
```

---

## Development notes

The Angular frontend is mounted as a Docker volume, so changes are reflected automatically with hot reload.

The Spring Boot API is rebuilt when the Docker image is rebuilt.
