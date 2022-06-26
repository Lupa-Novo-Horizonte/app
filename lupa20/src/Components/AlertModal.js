import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    flex:1;
    padding: 15px;
    background-Color: #fff;    
    align-items:center;
    margin-top: 50%;
    margin-bottom: 80%;
    margin-left: 10%;
    margin-right: 10%;
    border-color: #092654;
    border-width: 1px;
    border-radius: 10px;
`;

const Area = styled.View`
    padding: 5px;
    margin-top: 20px;
    align-items: center;
    flex: 1;
    flex-direction: row;
    justify-content: center;
`;

const Message = styled.Text`
    font-size: 13px;
    color: #707070;
`;

const FecharArea = styled.TouchableOpacity`
    height: 60px;
    background-color: #00a5fe;
    border-radius: 15px;
    width:100px;
    justify-content: center;
    align-items: center;
`;

const FecharText = styled.Text`
    color: #fff;
    font-size: 15px;
    font-weight: bold;
`;

export default (props) => {

    closeModal = (bool) => {
        props.changeModalVisible(bool);
    }

    return (       
        <Container disabled={true}>
        
           <Area>
            <Message>{props.msg}</Message>
           </Area>

            <FecharArea onPress={() => closeModal(false)}>
                <FecharText>Fechar</FecharText>
            </FecharArea>

        </Container>
    );
}