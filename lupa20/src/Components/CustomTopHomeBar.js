import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';

const TopBar = styled.View`
    background-color: #092654;
    flex-direction: row;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
`;

export default () => {

    return (
        <TopBar>
                <Image style={{width:110, height:35, flex:2, resizeMode:'center'}} source={require('../Assets/bannerSmall.png')} />
        </TopBar>
    );
}