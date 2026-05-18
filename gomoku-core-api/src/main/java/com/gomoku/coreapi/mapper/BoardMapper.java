package com.gomoku.coreapi.mapper;

import com.gomoku.coreapi.dto.BoardDto;
import com.gomoku.coreapi.model.Board;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BoardMapper {

    BoardDto entityToDto(Board entity);

    Board dtoToEntity(BoardDto dto);
}
