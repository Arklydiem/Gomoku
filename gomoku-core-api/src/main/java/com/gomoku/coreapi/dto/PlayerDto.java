package com.gomoku.coreapi.dto;

import com.gomoku.coreapi.enums.PlayerType;
import com.gomoku.coreapi.enums.StoneColor;

import java.util.UUID;

public record PlayerDto(
        UUID uuid,
        UUID userUuid,
        String name,
        PlayerType type,
        StoneColor color
) {
}