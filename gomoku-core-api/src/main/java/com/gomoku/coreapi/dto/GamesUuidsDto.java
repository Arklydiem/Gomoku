package com.gomoku.coreapi.dto;

import java.util.List;
import java.util.UUID;

public record GamesUuidsDto(
        List<UUID> uuids
) {}
