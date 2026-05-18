package com.gomoku.coreapi.dto;

import java.util.UUID;

public record BoardDto(
        UUID uuid,
        int[][] grid
) {}
