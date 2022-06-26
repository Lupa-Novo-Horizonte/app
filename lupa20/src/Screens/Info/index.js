import React from 'react';
import { Text, View, Image } from 'react-native';
import { 
    Container,
    HeaderSubTitle,
    Scroller,
    Area,
    InfoArea,
    TitleArea,
    SubTitleArea,
    ViewStyle
} from './styles';

import TopBar from '../../Components/CustomTopBar';
import HorizontalBar from '../../Components/HorizontalBar';

export default () => {
    return (
        <Container>
            <TopBar title="INFO"/>

            <Scroller>
                <HeaderSubTitle>Como usar este aplicativo?</HeaderSubTitle>

                <Area>
                    <View style={{ViewStyle}}>
                        <Image style={{width:60, height:60}} source={require('../../Assets/NumberOneIcon.png')} />
                    </View>                        
                    <InfoArea>
                        <TitleArea>Ligue o GPS e a internet</TitleArea>
                        <HorizontalBar />
                        <SubTitleArea>Para o Lupa funcionar corretamente é necessário que esteja conectado a internet e com o GPS ligado.</SubTitleArea>
                    </InfoArea>
                </Area>
                
                <Area>
                    <View style={{ViewStyle}}>
                        <Image style={{width:60, height:60}} source={require('../../Assets/NumberTwoIcon.png')} />
                    </View>                        
                    <InfoArea>
                        <TitleArea>Confirme sua geolocalização</TitleArea>
                        <HorizontalBar />
                        <SubTitleArea>Posicione o seu celular o mais próximo possível do problema que você irá relatar e clique em verificar a sua localização.</SubTitleArea>
                    </InfoArea>
                </Area>

                <Area>
                    <View style={{ViewStyle}}>
                        <Image style={{width:60, height:60}} source={require('../../Assets/NumberThreeIcon.png')} />
                    </View>                        
                    <InfoArea>
                        <TitleArea>Envie as informações</TitleArea>
                        <HorizontalBar />
                        <SubTitleArea>Confirme o preenchimento correto de todas as informações e aperte enviar.</SubTitleArea>
                    </InfoArea>
                </Area>
                
                <Text>{"\n"}</Text>
            </Scroller>
        </Container>
    );
}