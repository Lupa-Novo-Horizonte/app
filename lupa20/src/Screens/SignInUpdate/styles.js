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

// Body
export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #00a5fe;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;

export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #707070;
`;

export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #707070;
    font-weight: bold;
    margin-left: 5px;
`;

export const TitleMessageText = styled.Text`
    font-size: 20px;
    color: #092654;
    font-weight: bold;
`;

export const SubTitleMessageText = styled.Text`
    font-size: 16px;
    color: #707070;
    text-align: center;
`;

export const FooterText = styled.Text`
    margin-left: 29px;
    margin-right: 29px;
    font-size: 11px;
    color: #fff;
    text-align: center;
`;

export const Link = styled.Text`
    text-decoration-line: underline;
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

export const Modal = styled.Modal``;