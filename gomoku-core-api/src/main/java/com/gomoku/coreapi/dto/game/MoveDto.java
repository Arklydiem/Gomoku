package com.gomoku.coreapi.dto.game;

import com.gomoku.coreapi.constant.GameConstant;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record MoveDto(
		@Min(0) @Max(GameConstant.BOARD_SIZE - 1) int x,
		@Min(0) @Max(GameConstant.BOARD_SIZE - 1) int y
) { }
