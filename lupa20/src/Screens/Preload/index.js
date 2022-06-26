import React, { useEffect, useContext } from 'react';
import { Container, LoadingIcon } from './styles';
import Background from '../../Assets/preloader.svg';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import { UserContext } from '../../Contexts/UserContext';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token){
                let res = await Api.checkToken(token);
                if(res){
                    //await AsyncStorage.setItem('token', res.token);
                    navigation.reset({
                        routes:[{ name:'MainTab'}]
                    });
                } else {
                    navigation.navigate('SignIn');
                }
            } 
            else {
                navigation.navigate('SignIn');
            }
        }
        checkToken();
    },[]);

    return (
        <Container>
            <Background width="100%" ></Background>          
        </Container>
    );
}
//<LoadingIcon size="large" color="#FFFFFF"></LoadingIcon>