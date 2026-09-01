package com.gomoku.coreapi.repository;

import com.gomoku.coreapi.entity.game.GameEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface GameRepository
        extends JpaRepository<GameEntity, Long> {

    Optional<GameEntity> findByUuid(UUID uuid);
}