package com.gomoku.coreapi.dto.game;

import com.gomoku.coreapi.enums.StoneColor;

import java.util.UUID;

public record GameTurnDto(
		UUID uuid,
		int turnNumber,
		UUID playerUuid,
		StoneColor color,
		MoveDto suggestedMove,
		MoveDto playedMove,
		Long aiComputationTimeMs
) { }
