package com.gomoku.coreapi.service;

import com.gomoku.coreapi.enums.GameStatus;
import com.gomoku.coreapi.enums.GameType;
import com.gomoku.coreapi.enums.PlayerType;
import com.gomoku.coreapi.enums.StoneColor;
import com.gomoku.coreapi.model.Board;
import com.gomoku.coreapi.model.Game;
import com.gomoku.coreapi.model.Player;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class GameService {

    private final Map<UUID, Game> games = new ConcurrentHashMap<>();

    public Game createGame(final GameType gameType) {
        Game game = new Game();

        game.setUuid(UUID.randomUUID());
        game.setBoard(new Board());
        game.setStatus(GameStatus.CREATED);
        game.setBlackCaptures(0);
        game.setWhiteCaptures(0);
        game.setGameType(gameType);

        switch (gameType) {
            case PLAYER_VS_PLAYER -> playerVersusPlayer(game);
            case PLAYER_VS_AI -> playerVersusAi(game);
            case AI_VS_AI -> aiVersusAi(game);
            default -> throw new IllegalArgumentException("Unsupported game type");
        }

        games.put(game.getUuid(), game);

        return game;
    }

    public Game joinGame(final UUID gameUuid) {
        Game game = getGame(gameUuid);

        if (game.getStatus() != GameStatus.WAITING) {
            throw new IllegalStateException("Game is not waiting for a player");
        }

        Player opponent = createPlayer(PlayerType.REAL, StoneColor.WHITE, "Player 2");
        game.getPlayers().add(opponent);

        game.setStatus(GameStatus.CREATED);
        game.setCurrentTurn(StoneColor.BLACK);

        return game;
    }

    public void startGame(final UUID gameUuid) {
        Game game = getGame(gameUuid);

        game.setStatus(GameStatus.IN_PROGRESS);
        game.setCurrentTurn(StoneColor.BLACK);
    }

    public List<UUID> getGamesUuids() {
        return games.values()
                .stream()
                .map(Game::getUuid)
                .collect(Collectors.toList());
    }

    public Game getGame(final UUID gameUuid) {
        Game game = games.get(gameUuid);

        if (game == null) {
            throw new IllegalArgumentException("Game not found");
        }

        return game;
    }

    private void playerVersusPlayer(final Game game) {
        Player creator = createPlayer(PlayerType.REAL, StoneColor.BLACK, "Player 1");

        game.setPlayers(new ArrayList<>());
        game.getPlayers().add(creator);

        game.setStatus(GameStatus.WAITING);
    }

    private void playerVersusAi(final Game game) {
        Player creator = createPlayer(PlayerType.REAL, StoneColor.BLACK, "Player");
        Player opponent = createPlayer(PlayerType.AI, StoneColor.WHITE, "AI");

        game.setPlayers(List.of(creator, opponent));
    }

    private void aiVersusAi(final Game game) {
        Player firstAi = createPlayer(PlayerType.AI, StoneColor.BLACK, "AI 1");
        Player secondAi = createPlayer(PlayerType.AI, StoneColor.WHITE, "AI 2");

        game.setPlayers(List.of(firstAi, secondAi));
    }

    private Player createPlayer(final PlayerType type, final StoneColor color, final String name) {
        Player player = new Player();

        player.setType(type);
        player.setColor(color);
        player.setName(name);

        return player;
    }
}