package com.gomoku.coreapi.dto.game;

import java.util.UUID;

public record BoardDto(
        UUID uuid,
        int[][] grid
) {}
