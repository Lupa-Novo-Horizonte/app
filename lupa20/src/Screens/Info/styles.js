import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-Color: #fff;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 15px;
`;

//margin-top: 22px;
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
    align-items: center;
    flex: 1;
    flex-direction: row;
    justify-content: center;
`;

export const InfoArea = styled.View`
    flex: 7;
    padding: 12px;
`;

export const TitleArea = styled.Text`
    color: #092654;
    font-size: 15px;
`;

export const SubTitleArea = styled.Text`
    font-size: 13px;
    color: #707070;
`;

export const ViewStyle = styled.View`
    align-items: center;
    flex: 2;
`;