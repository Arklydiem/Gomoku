package com.gomoku.coreapi.model;

import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.util.Objects;

@Embeddable
@Getter
public class MoveModel {

    private Integer x;

    private Integer y;

    protected MoveModel() {
        // JPA
    }

    public MoveModel(final Integer x, final Integer y) {
        this.x = x;
        this.y = y;
    }

    public Integer getX() {
        return x;
    }

    public Integer getY() {
        return y;
    }

    @Override
    public boolean equals(final Object object) {
        if (this == object) {
            return true;
        }

        if (!(object instanceof MoveModel move)) {
            return false;
        }

        return Objects.equals(x, move.x)
                && Objects.equals(y, move.y);
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }
}