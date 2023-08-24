import styled from 'styled-components/native';

// Base
export const Container = styled.SafeAreaView`
    flex: 1;
    background-Color: #fff;
`;

export const Scroller = styled.ScrollView`
    padding: 15px;
`;

export const Area = styled.View`
    flex-direction: row;
    padding: 5px;
`;

export const ReportArea = styled.View`
    padding-left: 5px;
`;

export const ReportText = styled.Text`
    font-size: 13px;
    color: #707070;
    padding-bottom: 5px;
`;

export const ReportBoldText = styled.Text`
    font-size: 13px;
    color: #707070;
    padding-bottom: 5px;
    font-weight: bold;
`;

export const AvatarArea = styled.View`
    align-items: center;
    width: 100%;
    
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

export const PasswordLink = styled.Text`
    font-size: 13px;
    color: #00a5fe;
    text-decoration-line: underline;
    margin-top: -10px;
`;

export const LogoutText = styled.Text`
    font-size: 13px;
    color: #00a5fe;
    text-decoration-line: underline;
`;

export const MoreInfoText = styled.Text`
    color: #092654;
    font-size: 15px;
    margin-top: -10px;
    font-weight: bold;
`;

export const ClickableArea = styled.TouchableOpacity``;