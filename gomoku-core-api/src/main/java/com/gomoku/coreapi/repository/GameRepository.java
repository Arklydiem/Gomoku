package com.gomoku.coreapi.repository;

import com.gomoku.coreapi.entity.game.GameEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GameRepository extends JpaRepository<GameEntity, Long> {

    Optional<GameEntity> findByUuid(UUID uuid);

    @Query("""
            SELECT DISTINCT game
            FROM GameEntity game
            JOIN game.gamePlayers gamePlayer
            JOIN gamePlayer.player player
            WHERE player.userUuid = :userUuid
            """)
    List<GameEntity> findGamesByUserUuid(@Param("userUuid") UUID userUuid);
}
