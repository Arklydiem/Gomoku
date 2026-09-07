package com.gomoku.coreapi.configuration;

import com.gomoku.coreapi.websocket.GameWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class GameWebSocketConfiguration implements WebSocketConfigurer {

	private final GameWebSocketHandler gameWebSocketHandler;

	@Override
	public void registerWebSocketHandlers(final WebSocketHandlerRegistry registry) {
		registry
				.addHandler(gameWebSocketHandler, "/ws/games/*")
				.setAllowedOriginPatterns("*");
	}
}
