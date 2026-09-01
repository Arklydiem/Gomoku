package com.gomoku.coreapi.dto;

import java.util.UUID;

public record GameTurnDto(
        UUID uuid,
        int turnNumber,
        UUID playerUuid,
        MoveDto suggestedMove,
        MoveDto playedMove,
        Long aiComputationTimeMs
) {
}