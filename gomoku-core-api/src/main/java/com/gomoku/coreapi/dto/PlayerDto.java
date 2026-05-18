package com.gomoku.coreapi.dto;

import com.gomoku.coreapi.enums.PlayerType;
import com.gomoku.coreapi.enums.StoneColor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

public record PlayerDto(
        UUID uuid,
        String name,
        PlayerType type,
        StoneColor color
) {}
