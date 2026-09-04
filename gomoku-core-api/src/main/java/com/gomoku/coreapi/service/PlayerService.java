package com.gomoku.coreapi.service;

import com.gomoku.coreapi.entity.UserEntity;
import com.gomoku.coreapi.entity.game.PlayerEntity;
import com.gomoku.coreapi.enums.PlayerType;
import com.gomoku.coreapi.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Transactional
    public PlayerEntity createRealPlayer(final UserEntity user) {
        return playerRepository.findByUserUuid(user.getUuid()).orElseGet(() -> {
            PlayerEntity player = new PlayerEntity();
            player.setUserUuid(user.getUuid());
            player.setName(user.getUsername());
            player.setType(PlayerType.REAL);

            return playerRepository.save(player);
        });
    }

    @Transactional
    public PlayerEntity createAiPlayer(final String name) {
        PlayerEntity player = new PlayerEntity();
        player.setName(name);
        player.setType(PlayerType.AI);

        return playerRepository.save(player);
    }

    @Transactional(readOnly = true)
    public PlayerEntity getPlayer(final UUID playerUuid) {
        return playerRepository
                .findByUuid(playerUuid)
                .orElseThrow(() -> new IllegalArgumentException("Player not found: " + playerUuid));
    }

    @Transactional(readOnly = true)
    public PlayerEntity getPlayerByUserUuid(final UUID userUuid) {
        return playerRepository
                .findByUserUuid(userUuid)
                .orElseThrow(() -> new IllegalArgumentException("Player not found for user: " + userUuid));
    }
}
