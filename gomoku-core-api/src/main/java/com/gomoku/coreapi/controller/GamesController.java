package com.gomoku.coreapi.controller;

import com.gomoku.coreapi.dto.GamesUuidsDto;
import com.gomoku.coreapi.enums.GameType;
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

    @GetMapping
    public GamesUuidsDto getAllGamesId(){
        GamesUuidsDto gamesUuidsDto = new GamesUuidsDto();
        gamesUuidsDto.setUuids(gameService.getGamesIds());
        return gamesUuidsDto;
    }

    @PostMapping
    public Game createGame(@RequestParam(value = "gameType", defaultValue = "PLAYER_VS_PLAYER") final GameType gameType) {
        return gameService.createGame(gameType);
    }

    @GetMapping("/{gameId}")
    public Game getGame(@PathVariable final UUID gameId) {
        return gameService.getGame(gameId);
    }

    @PostMapping("/{gameId}/join")
    public Game joinGame(@PathVariable final UUID gameId) {
        return gameService.joinGame(gameId);
    }

}
