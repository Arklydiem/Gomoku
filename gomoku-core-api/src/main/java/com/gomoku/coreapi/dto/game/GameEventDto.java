package com.gomoku.coreapi.dto.game;

import com.gomoku.coreapi.enums.GameEventType;

public record GameEventDto(
		GameEventType type,
		GameDto game
) { }
