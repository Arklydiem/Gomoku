package com.gomoku.coreapi.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    public User() {
        this.uuid = UUID.randomUUID();
        this.createdAt = Instant.now();
    }

    /**
     * Internal database ID.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    /**
     * Public user identifier.
     */
    @Column(nullable = false, unique = true, updatable = false)
    @Setter(AccessLevel.NONE)
    private UUID uuid;

    /**
     * Username.
     */
    @Column(nullable = false, unique = true, length = 50)
    private String username;

    /**
     * User email.
     */
    @Column(nullable = false, unique = true, length = 320)
    private String email;

    /**
     * User hashed password.
     */
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    /**
     * User creation date.
     */
    @Column(name = "created_at", nullable = false, updatable = false)
    @Setter(AccessLevel.NONE)
    private Instant createdAt;
}