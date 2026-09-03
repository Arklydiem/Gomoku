NAME = Gomoku

DOCKER_COMPOSE = docker compose
CORE_API = gomoku-core-api
WEB_ANG = gomoku-web-ang

all:
	chmod +x $(NAME)
	./$(NAME)

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
	$(DOCKER_COMPOSE) up --build -d $(CORE_API)

backend-re:
	$(DOCKER_COMPOSE) stop $(CORE_API)
	$(DOCKER_COMPOSE) rm -f $(CORE_API)
	$(MAKE) backend

frontend:
	$(DOCKER_COMPOSE) up --build -d $(WEB_ANG)

.PHONY: all clean fclean re logs ps backend backend-re frontend