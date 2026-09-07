package com.gomoku.coreapi.service;

import com.gomoku.coreapi.dto.game.GameDto;
import com.gomoku.coreapi.dto.game.GameEventDto;
import com.gomoku.coreapi.enums.GameEventType;
import com.gomoku.coreapi.websocket.GameWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Service
@RequiredArgsConstructor
public class GameEventService {

	private final GameWebSocketHandler gameWebSocketHandler;

	public void publish(final GameEventType type, final GameDto game) {
		GameEventDto event = new GameEventDto(type, game);

		if (!TransactionSynchronizationManager.isActualTransactionActive()
				|| !TransactionSynchronizationManager.isSynchronizationActive()) {
			gameWebSocketHandler.broadcast(game.uuid(), event);
			return;
		}

		TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
			@Override
			public void afterCommit() {
				gameWebSocketHandler.broadcast(game.uuid(), event);
			}
		});
	}
}
