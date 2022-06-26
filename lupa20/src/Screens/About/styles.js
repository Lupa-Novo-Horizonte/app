import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 15px;
`;

export const HeaderSubTitle = styled.Text`
    
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: bold;
    color: #092654;
    text-align: center;
`;

export const Area = styled.View`
    padding: 5px;
    margin-top: 20px;
    flex-direction: row;
`;

export const BodyText = styled.Text`
    font-size: 13px;
    color: #707070;
    margin-top: -20px;
`;

export const SmallBodyText = styled.Text`
    font-size: 11px;
    color: #707070;
    margin-top: -20px;
`;

export const StatusTitle = styled.Text`
    color: #092654;
    font-size: 15px;
    font-weight: bold;
    margin-top: -15px;
`;

export const BulletArea = styled.View`
    margin-top: -20px;
    display: flex;
`;

export const BulletText = styled.Text`
    color: #00a5fe;
    font-size: 15px;
    flex: 5;
`;

export const MoreInfoText = styled.Text`
    color: #092654;
    font-size: 15px;
    font-weight: bold;
    margin-top: -20px;
`;

export const LinkText = styled.Text`
    font-size: 13px;
    color: #00a5fe;
    text-decoration-line: underline;
    margin-top: -20px;
`;

export const SmallLinkText = styled.Text`
    font-size: 11px;
    color: #00a5fe;
    text-decoration-line: underline;
`;

export const ImageArea = styled.Text`
    flex: 4;
`;

export const ClickableArea = styled.TouchableOpacity``;

export const PasswordLink = styled.Text`
    font-size: 13px;
    color: #00a5fe;
    text-decoration-line: underline;
    margin-top: -10px;
`;