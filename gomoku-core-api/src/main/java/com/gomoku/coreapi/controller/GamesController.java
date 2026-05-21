package com.gomoku.coreapi.controller;

import com.gomoku.coreapi.dto.GameDto;
import com.gomoku.coreapi.dto.GamesUuidsDto;
import com.gomoku.coreapi.enums.GameType;
import com.gomoku.coreapi.mapper.GameMapper;
import com.gomoku.coreapi.model.Game;
import com.gomoku.coreapi.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
public class GamesController {

    private final GameService gameService;

    private final GameMapper gameMapper;

    @GetMapping
    public GamesUuidsDto getAllGamesUuid(){
        return new GamesUuidsDto(gameService.getGamesUuids());
    }

    @PostMapping
    public GameDto createGame(@RequestParam(value = "gameType", defaultValue = "PLAYER_VS_PLAYER") final GameType gameType) {
        Game game = gameService.createGame(gameType);
        return gameMapper.entityToDto(game);
    }

    @GetMapping("/{gameUuid}")
    public GameDto getGame(@PathVariable final UUID gameUuid) {
        Game game = gameService.getGame(gameUuid);
        return gameMapper.entityToDto(game);
    }

    @PostMapping("/{gameUuid}/join")
    public GameDto joinGame(@PathVariable final UUID gameUuid) {
        Game game = gameService.joinGame(gameUuid);
        return gameMapper.entityToDto(game);
    }

    @PostMapping("/{gameUuid}/start")
    public void startGame(@PathVariable final UUID gameUuid) {
        gameService.startGame(gameUuid);
    }

}
