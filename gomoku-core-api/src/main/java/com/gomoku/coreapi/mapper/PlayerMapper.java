package com.gomoku.coreapi.mapper;

import com.gomoku.coreapi.dto.PlayerDto;
import com.gomoku.coreapi.entity.game.PlayerEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PlayerMapper {

    PlayerDto entityToDto(PlayerEntity entity);
}