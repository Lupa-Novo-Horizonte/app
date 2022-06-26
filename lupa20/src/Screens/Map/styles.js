import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-Color: #fff;
`;

export const MapStyle = styled.View`
    flex: 1;
    min-height: 200px;
`;

export const Scroller = styled.ScrollView`
    margin: 10px;
`;

export const Area = styled.TouchableOpacity`
    padding: 5px;
    margin-top: 10px;
    align-items: center;
    flex: 1;
    flex-direction: row;
    justify-content: center;
`;

export const TitleText = styled.Text`
    font-size: 15px;    
    color: #092654;
    margin-bottom: -10px;
`;

export const BodyText = styled.Text`
    font-size: 13px;
    color: #707070;
    margin-top: -10px;
`;

export const ButtonStyle = styled.View`
    font-size: 13px;

`;