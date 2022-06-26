import React from  'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
    width: 100%;
    height: 60px;
    border-color: #707070;
    border-width: 1px;
    flex-direction: row;
    border-radius: 15px;
    padding-left: 15px;
    align-items: center;
    mergin-bottom: 15px;
    margin-bottom: 15px;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size:16px;
    color: #000;
    margin-left: 10px;
`;

export default ({IconSvg, placeholder, value, onChangeText, password}) => {
    return (
        <InputArea>
            <Input
                placeholder={placeholder}
                placeholderTextColor="#707070"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
            ></Input>
        </InputArea>
    );
}