package com.gomoku.coreapi.model;

import com.gomoku.coreapi.constant.GameConstant;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class Board {
    /**
     * Board ID.
     */
    private UUID uuid;

    /**
     * Game board matrix.
     */
    private int[][] grid;

    /**
     * Board constructor.
     */
    public Board() {
        this.grid = new int[GameConstant.BOARD_SIZE][GameConstant.BOARD_SIZE];
    }

    /**
     * Retrieve the value of a specific cell.
     *
     * @param x X-coordinate of the cell
     * @param y Y-coordinate of the cell
     * @return The value stored in the cell
     */
    public int getCell(final int x, final int y) {
        return grid[y][x];
    }

    /**
     * Unique identifier of the board
     */
    public void set(final int x, final int y, final int value) {
        grid[y][x] = value;
    }

    /**
     * Check if the given coordinates are within the board.
     *
     * @param x X-coordinate
     * @param y Y-coordinate
     * @return True if the coordinates are inside the board
     */
    public boolean isInside(final int x, final int y) {
        return x >= 0 && x < GameConstant.BOARD_SIZE
                && y >= 0 && y < GameConstant.BOARD_SIZE;
    }

    /**
     * Check if the cell at (x, y) is empty.
     *
     * @param x x-coordinate of the cell
     * @param y y-coordinate of the cell
     * @return true if the cell is empty, false otherwise
     */
    public boolean isEmpty(final int x, final int y) {
        return isInside(x, y) && getCell(x, y) == 0;
    }
}
