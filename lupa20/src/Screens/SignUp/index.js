import React, { useState } from 'react';
import { View, Image, Linking, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  AsyncStorage from '@react-native-community/async-storage';
import RadioForm from 'react-native-simple-radio-button';

import { 
    Scroller,
    InputArea,
    FooterText,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    Link,
    Modal,
    TextMessage
 } from "./styles";

import SharedStyles from '../../Screens/sharedStyles';
import SignInput from '../../Components/SignInput';
import EmailIcon from '../../Assets/check.svg';
import LockIcon from '../../Assets/lock.svg';
import Api from '../../Api';
import AlertModal from '../../Components/AlertModal';
import Global from '../sharedVariable';

export default () => {

    const navigation = useNavigation();
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [confirmPasswordField, setConfirmPasswordField] = useState('');
    
    // Redirect
    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name:'SignIn'}]
        });
    }
    
    const CallExternalPolitica = () => {
        Linking.openURL(Global.lupa_politica, '_blank');
    }

    const CallExternalTermoDeUso = () => {
        Linking.openURL(Global.lupa_termo, '_blank');
    }

    const CallExternalTcle = () => {
        Linking.openURL(Global.lupa_tcle, '_blank');
    }

    const CallExternalTale = () => {
        Linking.openURL(Global.lupa_tale, '_blank');
    }

    // Save
    const handleRegisterClick = async () => {
        if (emailField == '' || passwordField == '' || confirmPasswordField == '')
        {
            changeModalVisible(true);
            setMessage('Preenchas todos os campos.');
        }
        else if(passwordField != confirmPasswordField)
        {
            changeModalVisible(true);
            setMessage('Ambos os campos de senha devem ser iguais.');
        }
        else if(passwordField.length < 4)
        {
            changeModalVisible(true);
            setMessage('Tamanho mínimo para senha deve ser 4 dígitos.');
        }
        else if(emailField.length < 3 || !emailField.includes('@'))
        {
            changeModalVisible(true);
            setMessage('Formato do e-mail não é válido.');
        }
        else
        {
            let res = await Api.signUp(emailField, passwordField);
            if(res.token)
            {
                await AsyncStorage.setItem('token', res.token);
                await AsyncStorage.setItem('username', res.username);
                await AsyncStorage.setItem('id', res.id.toString());
                navigation.reset({
                    routes:[{ name:'MainTab'}]
                });
            } 
            else 
            {
                changeModalVisible(true);
                setMessage('Falha ao realizar o login. Tente mais tarde.');
            }
        }
    }

    // Modal
    const [isModalVisible, setisModalVisible] = useState(false);
    const [message, setMessage] = useState('Empty');
        
    const changeModalVisible = (bool) => {
        setisModalVisible(bool);
    }

    // Radio button
    const [radioValue, setRadioValuw] = useState(-1);
    var radio_props = [
        {label: 'Maior ou igual a 18  ', value: 0 },
        {label: 'Menor de 18', value: 1 }
      ]; 

    const radionPress = async (value) => {
        if(value == 1){
            setRadioValuw(1);
        }
        else{
            setRadioValuw(0);
        }
    }


    return (

        <View style={{flex: 1}}>
            <View style={SharedStyles.viewTop}>
                <Image style={SharedStyles.banner} source={require('../../Assets/banner.png')} />
            </View>
            <View style={SharedStyles.viewMiddle}>
            <Scroller>
                <InputArea>
                    <SignInput 
                        IconSvg={EmailIcon}
                        placeholder="E-mail"
                        value={emailField}
                        onChangeText={t=>setEmailField(t)}
                        ></SignInput>
                    <SignInput 
                        IconSvg={LockIcon}
                        placeholder="Senha"
                        value={passwordField}
                        onChangeText={t=>setPasswordField(t)}
                        password={true}
                        ></SignInput>
                    <SignInput 
                        IconSvg={LockIcon}
                        placeholder="Confirmar senha"
                        value={confirmPasswordField}
                        onChangeText={t=>setConfirmPasswordField(t)}
                        password={true}
                        ></SignInput>
                    <RadioForm
                            radio_props={radio_props}
                            initial={-1}
                            buttonSize={10}
                            buttonOuterSize={20}
                            formHorizontal={true}
                            style={SharedStyles.radioFormText}
                            onPress={(value) => { radionPress(value) }}
                        />
                    
                    {
                        radioValue == 0 &&
                        <TextMessage>Ao se registrar, você concorda que leu e está de acordo com o <Link onPress={CallExternalTcle}>Registro de Consentimento Livre e Esclarecido para Pesquisas Em Ambiente Virtual</Link></TextMessage>
                    }
                    {
                        radioValue == 1 &&
                        <TextMessage>Ao se registrar, você concorda que leu e está de acordo com o <Link onPress={CallExternalTale}>Termo de Assentimento Livre e Esclarecido</Link></TextMessage>
                    }
                    <CustomButton onPress={handleRegisterClick}>
                        <CustomButtonText>REGISTRE-SE</CustomButtonText>
                    </CustomButton>
                </InputArea>

                <SignMessageButton onPress={handleMessageButtonClick}>
                    <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                    <SignMessageButtonTextBold>Entre aqui</SignMessageButtonTextBold>
                </SignMessageButton>
            </Scroller>

            <Modal 
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                nRequestClose={() => changeModalVisible(false)}
                >
                <AlertModal changeModalVisible={changeModalVisible} msg={message} />
            </Modal>

            </View>
            <View style={SharedStyles.viewBottom}>
                <FooterText>Ao se registrar, você concorda com os <Link onPress={CallExternalTermoDeUso}>Termos de Uso</Link> e a nossa <Link onPress={CallExternalPolitica}>Política de Privacidade</Link></FooterText>
            </View>
        </View>
    );
}