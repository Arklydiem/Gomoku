package com.gomoku.coreapi.dto.game;

import java.util.List;
import java.util.UUID;

public record GamesUuidsDto(
        List<UUID> uuids
) {}
