package com.gomoku.coreapi.repository;

import com.gomoku.coreapi.entity.game.GamePlayerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GamePlayerRepository extends JpaRepository<GamePlayerEntity, Long> {

    List<GamePlayerEntity> findAllByGame_Uuid(UUID gameUuid);

    List<GamePlayerEntity> findAllByPlayer_Uuid(UUID playerUuid);
}
