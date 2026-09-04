package com.gomoku.coreapi.service;

import com.gomoku.coreapi.dto.game.GameDto;
import com.gomoku.coreapi.dto.game.MoveDto;
import com.gomoku.coreapi.entity.UserEntity;
import com.gomoku.coreapi.entity.game.GameEntity;
import com.gomoku.coreapi.entity.game.GamePlayerEntity;
import com.gomoku.coreapi.entity.game.GameTurnEntity;
import com.gomoku.coreapi.enums.GameStatus;
import com.gomoku.coreapi.enums.PlayerType;
import com.gomoku.coreapi.enums.StoneColor;
import com.gomoku.coreapi.mapper.GameMapper;
import com.gomoku.coreapi.model.MoveModel;
import com.gomoku.coreapi.repository.GameRepository;
import com.gomoku.coreapi.security.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GameTurnService {

	private final GameRepository gameRepository;
	private final CurrentUserService currentUserService;
	private final GameMapper gameMapper;

	@Transactional
	public GameDto createTurn(final UUID gameUuid, final MoveDto move) {
		GameEntity game = gameRepository
				.findByUuid(gameUuid)
				.orElseThrow(() -> new IllegalArgumentException("Game not found: " + gameUuid));

		validateGameCanPlay(game);
		validatePositionIsAvailable(game, move);

		GamePlayerEntity gamePlayer = getCurrentGamePlayer(game);
		validateCurrentPlayer(gamePlayer);

		GameTurnEntity turn = new GameTurnEntity();
		turn.setGamePlayer(gamePlayer);
		turn.setTurnNumber(getNextTurnNumber(game));
		turn.setPlayedMove(new MoveModel(move.x(), move.y()));

		game.addTurn(turn);
		game.setStatus(GameStatus.IN_PROGRESS);
		game.setCurrentTurn(getNextColor(gamePlayer.getColor()));

		return gameMapper.entityToDto(gameRepository.save(game));
	}

	private void validateGameCanPlay(final GameEntity game) {
		if (game.getCurrentTurn() == null) {
			throw new IllegalStateException("Game has not started yet");
		}

		switch (game.getStatus()) {
			case WAITING -> throw new IllegalStateException("Game is waiting for another player");
			case BLACK_WINS, WHITE_WINS, DRAW, CANCELLED ->
					throw new IllegalStateException("Game is already finished");
			default -> {
			}
		}
	}

	private void validatePositionIsAvailable(final GameEntity game, final MoveDto move) {
		boolean occupied = game.getTurns()
				.stream()
				.map(GameTurnEntity::getPlayedMove)
				.filter(Objects::nonNull)
				.anyMatch(playedMove ->
						Objects.equals(playedMove.getX(), move.x())
								&& Objects.equals(playedMove.getY(), move.y())
				);

		if (occupied) {
			throw new IllegalStateException("Position is already occupied");
		}
	}

	private GamePlayerEntity getCurrentGamePlayer(final GameEntity game) {
		return game.getGamePlayers()
				.stream()
				.filter(gamePlayer -> gamePlayer.getColor() == game.getCurrentTurn())
				.findFirst()
				.orElseThrow(() -> new IllegalStateException(
						"No player found for color: " + game.getCurrentTurn()
				));
	}

	private void validateCurrentPlayer(final GamePlayerEntity gamePlayer) {
		if (gamePlayer.getPlayer().getType() == PlayerType.AI) {
			throw new IllegalStateException("An AI turn cannot be played from this endpoint");
		}

		UUID playerUserUuid = gamePlayer.getPlayer().getUserUuid();

		if (playerUserUuid == null) {
			return;
		}

		Optional<UserEntity> currentUser = currentUserService.getCurrentUser();

		if (currentUser.isEmpty() || !playerUserUuid.equals(currentUser.get().getUuid())) {
			throw new IllegalStateException("Current user cannot play this turn");
		}
	}

	private int getNextTurnNumber(final GameEntity game) {
		return game.getTurns()
				.stream()
				.mapToInt(GameTurnEntity::getTurnNumber)
				.max()
				.orElse(0) + 1;
	}

	private StoneColor getNextColor(final StoneColor color) {
		return color == StoneColor.BLACK
				? StoneColor.WHITE
				: StoneColor.BLACK;
	}
}
