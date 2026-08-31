package com.gomoku.coreapi.mapper;

import com.gomoku.coreapi.dto.UserDto;
import com.gomoku.coreapi.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toDto(User user);
}