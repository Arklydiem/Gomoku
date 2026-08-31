package com.gomoku.coreapi.dto.auth;

import com.gomoku.coreapi.dto.UserDto;

public record AuthResponse(
        String accessToken,
        UserDto user
) {
}