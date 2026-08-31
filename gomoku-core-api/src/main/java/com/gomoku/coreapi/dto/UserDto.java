package com.gomoku.coreapi.dto;

import java.util.UUID;

public record UserDto(
        UUID uuid,
        String username,
        String email
) {
}