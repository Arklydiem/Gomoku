package com.gomoku.coreapi.websocket;

import com.gomoku.coreapi.dto.game.GameEventDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.json.JsonMapper;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Component
@RequiredArgsConstructor
public class GameWebSocketHandler extends TextWebSocketHandler {

    private final JsonMapper jsonMapper;
    private final ConcurrentMap<UUID, Set<WebSocketSession>> sessionsByGame = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(final WebSocketSession session) throws Exception {
        Optional<UUID> gameUuid = resolveGameUuid(session);

        if (gameUuid.isEmpty()) {
            session.close(CloseStatus.BAD_DATA);
            return;
        }

        sessionsByGame
                .computeIfAbsent(gameUuid.get(), ignored -> ConcurrentHashMap.newKeySet())
                .add(session);
    }

    @Override
    public void afterConnectionClosed(final WebSocketSession session, final CloseStatus status) {
        resolveGameUuid(session).ifPresent(gameUuid -> {
            Set<WebSocketSession> sessions = sessionsByGame.get(gameUuid);

            if (sessions == null) {
                return;
            }

            sessions.remove(session);

            if (sessions.isEmpty()) {
                sessionsByGame.remove(gameUuid);
            }
        });
    }

    public void broadcast(final UUID gameUuid, final GameEventDto event) {
        Set<WebSocketSession> sessions = sessionsByGame.get(gameUuid);

        if (sessions == null || sessions.isEmpty()) {
            return;
        }

        String payload;

        try {
            payload = jsonMapper.writeValueAsString(event);
        } catch (JacksonException exception) {
            throw new IllegalStateException("Unable to serialize game event", exception);
        }

        TextMessage message = new TextMessage(payload);

        for (WebSocketSession session : sessions) {
            if (!session.isOpen()) {
                continue;
            }

            try {
                synchronized (session) {
                    session.sendMessage(message);
                }
            } catch (IOException ignored) {
                // A disconnected client will be removed by afterConnectionClosed.
            }
        }
    }

    private Optional<UUID> resolveGameUuid(final WebSocketSession session) {
        URI uri = session.getUri();

        if (uri == null) {
            return Optional.empty();
        }

        String path = uri.getPath();
        int lastSlash = path.lastIndexOf('/');

        if (lastSlash < 0 || lastSlash == path.length() - 1) {
            return Optional.empty();
        }

        try {
            return Optional.of(UUID.fromString(path.substring(lastSlash + 1)));
        } catch (IllegalArgumentException exception) {
            return Optional.empty();
        }
    }
}