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
make
```

or:

```bash
make all
```

This will:

- Build the Docker images
- Start all services in detached mode

---

## Available services

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
make clean
```

---

## Rebuild everything

```bash
make re
```

---

## Remove everything

```bash
make fclean
```

This removes:

- Containers
- Volumes
- Docker images

---

## Useful commands

Show running containers:

```bash
make ps
```

Show logs:

```bash
make logs
```

Start backend only:

```bash
make backend
```

Start frontend only:

```bash
make frontend
```

---

## Development notes

The Angular frontend is mounted as a Docker volume, so changes are reflected automatically with hot reload.

The Spring Boot API is rebuilt when the Docker image is rebuilt.
