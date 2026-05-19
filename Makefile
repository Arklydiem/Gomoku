NAME = gomoku

DOCKER_COMPOSE = docker compose

all:
	$(DOCKER_COMPOSE) up --build -d

$(NAME): all

clean:
	$(DOCKER_COMPOSE) down

fclean:
	$(DOCKER_COMPOSE) down -v --rmi all

re: fclean all

logs:
	$(DOCKER_COMPOSE) logs -f

ps:
	$(DOCKER_COMPOSE) ps

backend:
	$(DOCKER_COMPOSE) up --build -d gomoku-core-api

frontend:
	$(DOCKER_COMPOSE) up --build -d gomoku-web-ang

logs:
	$(DOCKER_COMPOSE) logs -f

.PHONY: all clean fclean re logs ps backend frontend