import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

import {
    Container,
    Scroller,
    HeaderTitle,
    Area,
    SubTitleArea,
    SubTitletText,
    HeaderAreaTitle,
    ImageTouchable
} from './styles';

import TopBar from '../../Components/CustomTopHomeBar';

export default () => {

    const navigation = useNavigation();
    
    const redirectTrash = () =>{
        navigation.reset({
            routes:[{ name:'Trash'}]
        });
    }
    const redirectAsphalt = () =>{
        navigation.reset({
            routes:[{ name:'Asphalt'}]
        });
    }
    const redirectWater = () =>{
        navigation.reset({
            routes:[{ name:'Water'}]
        });
    }
    const redirectSewer = () =>{
        navigation.reset({
            routes:[{ name:'Sewer'}]
        });
    }
    const redirectCollect = () =>{
        navigation.reset({
            routes:[{ name:'Collect'}]
        });
    }
    const redirectLight = () =>{
        navigation.reset({
            routes:[{ name:'Light'}]
        });
    }

    return (
        <Container>
            <TopBar />
            <Scroller>
                <Area>
                    <HeaderAreaTitle>
                        <HeaderTitle>APONTE PROBLEMAS</HeaderTitle>
                    </HeaderAreaTitle>
                </Area>

                <Area>
                    <SubTitleArea>
                      <SubTitletText>Você pode ajudar apontando os problemas nas areas indicadas abaixo:</SubTitletText>
                    </SubTitleArea>
                </Area>

                <Area>
                    <ImageTouchable onPress={redirectLight}><Image style={{width:160, height:143}} source={require('../../Assets/light.png')} /></ImageTouchable>
                    <ImageTouchable onPress={redirectWater}><Image style={{width:160, height:143}} source={require('../../Assets/water.png')} /></ImageTouchable>
                </Area>

                <Area>
                    <ImageTouchable onPress={redirectTrash}><Image style={{width:160, height:143}} source={require('../../Assets/trash.png')} /></ImageTouchable>
                    <ImageTouchable onPress={redirectSewer}><Image style={{width:160, height:143}} source={require('../../Assets/sewer.png')} /></ImageTouchable>
                </Area>
                
                <Area>
                    <ImageTouchable onPress={redirectAsphalt}><Image style={{width:160, height:143}} source={require('../../Assets/asphalt.png')} /></ImageTouchable>
                    <ImageTouchable onPress={redirectCollect}><Image style={{width:160, height:143}} source={require('../../Assets/coleta.png')} /></ImageTouchable>
                </Area>

            </Scroller>

        </Container>
    ); 
}