import React, {useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { request, PERMISSIONS} from 'react-native-permissions';

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

    useEffect(() => {
        const fetchData = async () => {
            let result = await request(
                Platform.OS === 'ios' ?
                    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                    :
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            );
            if(result == 'granted'){
                console.log('GPS permission granted');
                await AsyncStorage.setItem('gps', 'granted');
            }
            else{
                console.log('GPS permission denied');
                await AsyncStorage.setItem('gps', 'denied');
            }
        }
        fetchData();
    }, [])

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
                      <SubTitletText>Você pode ajudar apontando os problemas nas áreas indicadas abaixo:</SubTitletText>
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