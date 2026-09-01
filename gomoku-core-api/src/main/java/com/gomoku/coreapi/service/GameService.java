package com.gomoku.coreapi.service;

import com.gomoku.coreapi.dto.GameDto;
import com.gomoku.coreapi.entity.game.GameEntity;
import com.gomoku.coreapi.enums.GameStatus;
import com.gomoku.coreapi.enums.GameType;
import com.gomoku.coreapi.mapper.GameMapper;
import com.gomoku.coreapi.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final GameMapper gameMapper;

    @Transactional
    public GameDto createGame(final GameType gameType) {

        GameEntity game = new GameEntity();

        game.setGameType(gameType);
        game.setStatus(GameStatus.CREATED);

        GameEntity savedGame =
                gameRepository.save(game);

        return gameMapper.entityToDto(savedGame);
    }

    @Transactional(readOnly = true)
    public GameDto getGame(final UUID gameUuid) {

        GameEntity game = gameRepository
                .findByUuid(gameUuid)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Game not found: " + gameUuid
                        )
                );

        return gameMapper.entityToDto(game);
    }

    @Transactional(readOnly = true)
    public List<GameDto> getGames() {

        List<GameEntity> games = gameRepository.findAll();
        List<GameDto> gamesDtos = games.stream()
                .map(gameMapper::entityToDto)
                .toList();

        return gamesDtos;
    }
}
