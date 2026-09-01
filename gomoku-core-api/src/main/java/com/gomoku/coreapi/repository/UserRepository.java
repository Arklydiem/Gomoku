package com.gomoku.coreapi.repository;

import com.gomoku.coreapi.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUuid(UUID uuid);

    Optional<UserEntity> findByUsernameIgnoreCase(String username);

    Optional<UserEntity> findByEmailIgnoreCase(String email);

    Optional<UserEntity> findByUsernameIgnoreCaseOrEmailIgnoreCase(String username, String email);

    boolean existsByUsernameIgnoreCase(String username);

    boolean existsByEmailIgnoreCase(String email);
}