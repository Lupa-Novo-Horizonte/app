import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-Color: #fff;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 15px;
`;

//Title
export const HeaderArea = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const HeaderAreaTitle = styled.View`
    height: 40px;
    background-color: red;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
`;

export const HeaderTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #fff;
`;

// Body
export const Area = styled.View`
    margin-top: 10px;
    justify-content: center;
    flex-direction: row;
`;

export const SubTitleArea = styled.View `
    flex:1;
    padding-left:10%;
    padding-right:10%;
`;    

export const SubTitletText = styled.Text `    
    font-size: 16px;
    color: #707070;
    text-align: center;
`;  

export const Modal = styled.Modal``;

export const ImageTouchable = styled.TouchableOpacity``;