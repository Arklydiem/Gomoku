package com.gomoku.coreapi.controller;

import com.gomoku.coreapi.dto.game.GameDto;
import com.gomoku.coreapi.dto.game.GameVisibilityDto;
import com.gomoku.coreapi.enums.GameType;
import com.gomoku.coreapi.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
public class GameController {

	private final GameService gameService;

	@GetMapping
	public ResponseEntity<List<GameDto>> getGames() {
		return ResponseEntity.ok(gameService.getGames());
	}

	@GetMapping("/public")
	public ResponseEntity<List<GameDto>> getPublicGames() {
		return ResponseEntity.ok(gameService.getPublicGames());
	}

	@GetMapping("/user-uuid/{userUuid}")
	public ResponseEntity<List<GameDto>> getGamesByUserUuid(@PathVariable final UUID userUuid) {
		return ResponseEntity.ok(gameService.getGamesByCreatorUuid(userUuid));
	}

	@GetMapping("/created-by-me")
	public ResponseEntity<List<GameDto>> getGamesCreatedByMe() {
		return ResponseEntity.ok(gameService.getGamesCreatedByMe());
	}

	@GetMapping("/created-by/{userUuid}")
	public ResponseEntity<List<GameDto>> getGamesCreatedByUserUuid(@PathVariable final UUID userUuid) {
		return ResponseEntity.ok(gameService.getGamesCreatedByUserUUID(userUuid));
	}

	@PostMapping
	public ResponseEntity<GameDto> createGame(@RequestParam final GameType gameType) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(gameService.createGame(gameType));
	}

	@GetMapping("/{gameUuid}")
	public ResponseEntity<GameDto> getGame(@PathVariable final UUID gameUuid) {
		return ResponseEntity.ok(gameService.getGame(gameUuid));
	}

	@PostMapping("/{gameUuid}/join")
	public ResponseEntity<GameDto> joinGame(@PathVariable final UUID gameUuid) {
		return ResponseEntity.ok(gameService.joinGame(gameUuid));
	}

	@PatchMapping("/{gameUuid}/visibility")
	public ResponseEntity<GameDto> updateVisibility(
			@PathVariable final UUID gameUuid,
			@RequestBody final GameVisibilityDto visibility
	) {
		return ResponseEntity.ok(gameService.updateVisibility(gameUuid, visibility.publicGame()));
	}

	@PostMapping("/{gameUuid}/start")
	public ResponseEntity<GameDto> startGame(@PathVariable final UUID gameUuid) {
		return ResponseEntity.ok(gameService.startGame(gameUuid));
	}
}
