package com.gomoku.coreapi.service;

import com.gomoku.coreapi.dto.game.GameDto;
import com.gomoku.coreapi.entity.UserEntity;
import com.gomoku.coreapi.entity.game.GameEntity;
import com.gomoku.coreapi.entity.game.GamePlayerEntity;
import com.gomoku.coreapi.entity.game.PlayerEntity;
import com.gomoku.coreapi.enums.GameStatus;
import com.gomoku.coreapi.enums.GameType;
import com.gomoku.coreapi.enums.StoneColor;
import com.gomoku.coreapi.mapper.GameMapper;
import com.gomoku.coreapi.repository.GameRepository;
import com.gomoku.coreapi.security.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public GameDto createGame(final GameType gameType) {
        UserEntity creator = currentUserService
                .getCurrentUser()
                .orElse(null);

        GameEntity game = new GameEntity();
        game.setGameType(gameType);
        game.setStatus(GameStatus.CREATED);
        game.setCreatedBy(creator);

        configureGamePlayers(game, gameType, creator);

        GameEntity savedGame = gameRepository.save(game);

        return gameMapper.entityToDto(savedGame);
    }

    @Transactional(readOnly = true)
    public GameDto getGame(final UUID gameUuid) {
        GameEntity game = gameRepository
                .findByUuid(gameUuid)
                .orElseThrow(() -> new IllegalArgumentException("Game not found: " + gameUuid));

        return gameMapper.entityToDto(game);
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
    public List<GameDto> getGamesByCreatorUuid(final UUID userUuid) {
        return gameRepository
                .findGamesByUserUuid(userUuid)
                .stream()
                .map(gameMapper::entityToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<GameDto> getGamesCreatedByMe() {

        UserEntity creator = currentUserService
                .getCurrentUser()
                .orElse(null);

        if (creator == null) {
            return getGames();
        }

        return gameRepository
                .findAllByCreatedBy_Uuid(creator.getUuid())
                .stream()
                .map(gameMapper::entityToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<GameDto> getGamesCreatedByUserUUID(final UUID userUuid) {
        return gameRepository
                .findAllByCreatedBy_Uuid(userUuid)
                .stream()
                .map(gameMapper::entityToDto)
                .toList();
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
