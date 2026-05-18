package com.gomoku.coreapi.mapper;

import com.gomoku.coreapi.dto.PlayerDto;
import com.gomoku.coreapi.model.Player;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PlayerMapper {

    PlayerDto entityToDto(Player entity);

    Player dtoToEntity(PlayerDto dto);
}
