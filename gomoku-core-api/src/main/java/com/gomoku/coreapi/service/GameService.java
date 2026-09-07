package com.gomoku.coreapi.service;

import com.gomoku.coreapi.dto.game.GameDto;
import com.gomoku.coreapi.entity.UserEntity;
import com.gomoku.coreapi.entity.game.GameEntity;
import com.gomoku.coreapi.entity.game.GamePlayerEntity;
import com.gomoku.coreapi.entity.game.PlayerEntity;
import com.gomoku.coreapi.enums.GameEventType;
import com.gomoku.coreapi.enums.GameStatus;
import com.gomoku.coreapi.enums.GameType;
import com.gomoku.coreapi.enums.StoneColor;
import com.gomoku.coreapi.mapper.GameMapper;
import com.gomoku.coreapi.repository.GameRepository;
import com.gomoku.coreapi.security.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GameService {

    private static final String DEFAULT_AI_NAME = "Gomoku AI";
    private static final String BLACK_AI_NAME = "Gomoku AI Black";
    private static final String WHITE_AI_NAME = "Gomoku AI White";

    private final GameRepository gameRepository;
    private final PlayerService playerService;
    private final CurrentUserService currentUserService;
    private final GameMapper gameMapper;
    private final GameEventService gameEventService;

    @Transactional
    public GameDto createGame(final GameType gameType) {

        UserEntity currentUser = currentUserService.getCurrentUser().orElse(null);

        if (gameType != GameType.SOLO && currentUser == null) {
            throw new AccessDeniedException("Authentication is required for this game type");
        }

        UserEntity creator = currentUserService
                .getCurrentUser()
                .orElse(null);

        GameEntity game = new GameEntity();
        game.setGameType(gameType);
        game.setCreatedBy(creator);
        game.setPublicGame(false);

        configureGamePlayers(game, gameType, creator);
        game.setStatus(getInitialStatus(gameType));

        return gameMapper.entityToDto(gameRepository.save(game));
    }

    @Transactional(readOnly = true)
    public GameDto getGame(final UUID gameUuid) {
        return gameMapper.entityToDto(getGameEntity(gameUuid));
    }

    @Transactional(readOnly = true)
    public List<GameDto> getGames() {
        return gameRepository
                .findAll()
                .stream()
                .map(gameMapper::entityToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<GameDto> getPublicGames() {
        return gameRepository
                .findAllByPublicGameTrueAndGameTypeAndStatus(GameType.PLAYER_VS_PLAYER, GameStatus.WAITING)
                .stream()
                .map(gameMapper::entityToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<GameDto> getGamesByCreatorUuid(final UUID userUuid) {
        return gameRepository
                .findGamesByUserUuid(userUuid)
                .stream()
                .map(gameMapper::entityToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<GameDto> getGamesCreatedByMe() {
        return currentUserService
                .getCurrentUser()
                .map(user -> gameRepository
                        .findAllByCreatedBy_Uuid(user.getUuid())
                        .stream()
                        .map(gameMapper::entityToDto)
                        .toList())
                .orElseGet(List::of);
    }

    @Transactional(readOnly = true)
    public List<GameDto> getGamesCreatedByUserUUID(final UUID userUuid) {
        return gameRepository
                .findAllByCreatedBy_Uuid(userUuid)
                .stream()
                .map(gameMapper::entityToDto)
                .toList();
    }

    @Transactional
    public GameDto joinGame(final UUID gameUuid) {
        GameEntity game = getGameEntity(gameUuid);

        if (game.getGameType() != GameType.PLAYER_VS_PLAYER) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This game cannot be joined");
        }

        if (game.getStatus() != GameStatus.WAITING) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This game is not waiting for a player");
        }

        UserEntity user = currentUserService
                .getCurrentUser()
                .orElse(null);

        if (user != null && isUserAlreadyPlaying(game, user.getUuid())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Current user is already in this game");
        }

        PlayerEntity player = getOrCreateHumanPlayer(user);
        addGamePlayer(game, player, StoneColor.WHITE);
        game.setStatus(GameStatus.READY);

        GameDto updatedGame = gameMapper.entityToDto(gameRepository.save(game));
        gameEventService.publish(GameEventType.PLAYER_JOINED, updatedGame);

        return updatedGame;
    }

    @Transactional
    public GameDto updateVisibility(final UUID gameUuid, final boolean publicGame) {
        GameEntity game = getGameEntity(gameUuid);

        validateCreator(game);

        if (game.getGameType() != GameType.PLAYER_VS_PLAYER) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Only multiplayer rooms can be public");
        }

        if (game.getStatus() != GameStatus.WAITING && game.getStatus() != GameStatus.READY) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Game visibility can no longer be changed");
        }

        game.setPublicGame(publicGame);

        GameDto updatedGame = gameMapper.entityToDto(gameRepository.save(game));
        gameEventService.publish(GameEventType.VISIBILITY_CHANGED, updatedGame);

        return updatedGame;
    }

    @Transactional
    public GameDto startGame(final UUID gameUuid) {
        GameEntity game = getGameEntity(gameUuid);

        validateCreator(game);

        if (game.getStatus() != GameStatus.READY) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Game is not ready to start");
        }

        validateBothColorsAreAssigned(game);

        game.setStatus(GameStatus.IN_PROGRESS);
        game.setCurrentTurn(StoneColor.BLACK);

        GameDto updatedGame = gameMapper.entityToDto(gameRepository.save(game));
        gameEventService.publish(GameEventType.GAME_STARTED, updatedGame);

        return updatedGame;
    }

    private GameEntity getGameEntity(final UUID gameUuid) {
        return gameRepository
                .findByUuid(gameUuid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Game not found: " + gameUuid));
    }

    private GameStatus getInitialStatus(final GameType gameType) {
        return gameType == GameType.PLAYER_VS_PLAYER
                ? GameStatus.WAITING
                : GameStatus.READY;
    }

    private void validateCreator(final GameEntity game) {
        if (game.getCreatedBy() == null) {
            return;
        }

        UserEntity currentUser = currentUserService
                .getCurrentUser()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Only the room creator can do this"));

        if (!game.getCreatedBy().getUuid().equals(currentUser.getUuid())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only the room creator can do this");
        }
    }

    private void validateBothColorsAreAssigned(final GameEntity game) {
        boolean blackAssigned = game.getGamePlayers()
                .stream()
                .anyMatch(gamePlayer -> gamePlayer.getColor() == StoneColor.BLACK);
        boolean whiteAssigned = game.getGamePlayers()
                .stream()
                .anyMatch(gamePlayer -> gamePlayer.getColor() == StoneColor.WHITE);

        if (!blackAssigned || !whiteAssigned) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Both colors must be assigned before starting");
        }
    }

    private boolean isUserAlreadyPlaying(final GameEntity game, final UUID userUuid) {
        return game.getGamePlayers()
                .stream()
                .map(GamePlayerEntity::getPlayer)
                .anyMatch(player -> userUuid.equals(player.getUserUuid()));
    }

    private void configureGamePlayers(final GameEntity game, final GameType gameType, final UserEntity creator) {
        switch (gameType) {
            case SOLO -> configureSoloPlayers(game, creator);
            case PLAYER_VS_PLAYER -> configurePlayerVsPlayerPlayers(game, creator);
            case PLAYER_VS_AI -> configurePlayerVsAiPlayers(game, creator);
            case AI_VS_AI -> configureAiVsAiPlayers(game);
        }
    }

    private void configureSoloPlayers(final GameEntity game, final UserEntity creator) {
        PlayerEntity player = getOrCreateHumanPlayer(creator);

        addGamePlayer(game, player, StoneColor.BLACK);
        addGamePlayer(game, player, StoneColor.WHITE);
    }

    private void configurePlayerVsPlayerPlayers(final GameEntity game, final UserEntity creator) {
        PlayerEntity player = getOrCreateHumanPlayer(creator);
        addGamePlayer(game, player, StoneColor.BLACK);
    }

    private void configurePlayerVsAiPlayers(final GameEntity game, final UserEntity creator) {
        PlayerEntity player = getOrCreateHumanPlayer(creator);
        PlayerEntity aiPlayer = playerService.createAiPlayer(DEFAULT_AI_NAME);

        addGamePlayer(game, player, StoneColor.BLACK);
        addGamePlayer(game, aiPlayer, StoneColor.WHITE);
    }

    private PlayerEntity getOrCreateHumanPlayer(final UserEntity creator) {
        if (creator == null) {
            return playerService.createGuestPlayer();
        }

        return playerService.createRealPlayer(creator);
    }

    private void configureAiVsAiPlayers(final GameEntity game) {
        PlayerEntity blackAi = playerService.createAiPlayer(BLACK_AI_NAME);
        PlayerEntity whiteAi = playerService.createAiPlayer(WHITE_AI_NAME);

        addGamePlayer(game, blackAi, StoneColor.BLACK);
        addGamePlayer(game, whiteAi, StoneColor.WHITE);
    }

    private void addGamePlayer(final GameEntity game, final PlayerEntity player, final StoneColor color) {
        GamePlayerEntity gamePlayer = new GamePlayerEntity();
        gamePlayer.setPlayer(player);
        gamePlayer.setColor(color);

        game.addGamePlayer(gamePlayer);
    }
}
