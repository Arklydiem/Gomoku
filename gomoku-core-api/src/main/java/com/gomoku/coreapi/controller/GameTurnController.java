package com.gomoku.coreapi.controller;

import com.gomoku.coreapi.dto.game.GameDto;
import com.gomoku.coreapi.dto.game.MoveDto;
import com.gomoku.coreapi.service.GameTurnService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/games/{gameUuid}/turns")
@RequiredArgsConstructor
public class GameTurnController {

	private final GameTurnService gameTurnService;

	@PostMapping
	public ResponseEntity<GameDto> createTurn(
			@PathVariable final UUID gameUuid,
			@Valid @RequestBody final MoveDto move
	) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(gameTurnService.createTurn(gameUuid, move));
	}
}
