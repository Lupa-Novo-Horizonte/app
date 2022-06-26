import React from 'react';
import { Dimensions, Text, View, Image, StyleSheet } from 'react-native';
import TopBar from './CustomTopBarWithBack';
import HorizontalBar from './HorizontalBar';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    flex:1;
    padding: 15px;
    background-Color: #fff;    
    align-items:center;
    margin-top: 40px;
    margin-bottom: 80px;
    margin-left: 10px;
    margin-right: 10px;
    border-color: #092654;
    border-width: 1px;
    border-radius: 10px;
`;

const Scroller = styled.ScrollView`
    flex: 1;
    width:100%;
    height:100%;
`;

const HeaderSubTitle = styled.Text`
    
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: bold;
    color: #092654;
    text-align: center;
`;

const Area = styled.View`
    padding: 5px;
    margin-top: 20px;
    align-items: center;
    flex: 1;
    flex-direction: row;
    justify-content: center;
`;

const InfoArea = styled.View`
    flex: 7;
    padding: 12px;
`;

const TitleArea = styled.Text`
    color: #092654;
    font-size: 15px;
`;

const SubTitleArea = styled.Text`
    font-size: 13px;
    color: #707070;
`;

const ViewStyle = styled.View`
    align-items: center;
    flex: 2;
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
        
            <Scroller>
                <HeaderSubTitle>Como usar este aplicativo?</HeaderSubTitle>

                <Area>
                    <View style={{ViewStyle}}>
                        <Image style={{width:60, height:60}} source={require('../Assets/NumberOneIcon.png')} />
                    </View>                        
                    <InfoArea>
                        <TitleArea>Ligue o GPS e a internet</TitleArea>
                        <HorizontalBar />
                        <SubTitleArea>Para o Lupa funcionar corretamente é necessário que esteja conectado a internet e com o GPS ligado.</SubTitleArea>
                    </InfoArea>
                </Area>
                
                <Area>
                    <View style={{ViewStyle}}>
                        <Image style={{width:60, height:60}} source={require('../Assets/NumberTwoIcon.png')} />
                    </View>                        
                    <InfoArea>
                        <TitleArea>Confirme sua geolocalização</TitleArea>
                        <HorizontalBar />
                        <SubTitleArea>Posicione o seu celular o mais próximo possível do problema que você irá relatar e clique em verificar a sua localização.</SubTitleArea>
                    </InfoArea>
                </Area>

                <Area>
                    <View style={{ViewStyle}}>
                        <Image style={{width:60, height:60}} source={require('../Assets/NumberThreeIcon.png')} />
                    </View>                        
                    <InfoArea>
                        <TitleArea>Envie as informações</TitleArea>
                        <HorizontalBar />
                        <SubTitleArea>Confirme o preenchimento correto de todas as informações e aperte enviar.</SubTitleArea>
                    </InfoArea>
                </Area>
                
                <Text>{"\n"}</Text>
            </Scroller>

            <FecharArea onPress={() => closeModal(false)}>
                <FecharText>Fechar</FecharText>
            </FecharArea>

        </Container>
    );
}