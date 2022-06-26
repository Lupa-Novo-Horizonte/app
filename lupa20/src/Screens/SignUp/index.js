import React, { useState, useContext } from 'react';
import { View, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  AsyncStorage from '@react-native-community/async-storage';
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
    Modal
 } from "./styles";

import SharedStyles from '../../Screens/sharedStyles';
import SignInput from '../../Components/SignInput';
import EmailIcon from '../../Assets/check.svg';
import LockIcon from '../../Assets/lock.svg';
import Api from '../../Api';
import AlertModal from '../../Components/AlertModal';
import { UserContext } from '../../Contexts/UserContext';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
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
    
    const CallExternal = () => {
        Linking.openURL('http://www.http://www.tecccog.net/index.php/quem-somos', '_blank');
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
        else
        {
            let res = await Api.signUp(emailField, passwordField);
            if(res.token)
            {
                await AsyncStorage.setItem('token', res.token);
                await AsyncStorage.setItem('username', res.username);
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
                <FooterText>Ao se registrar, você concorda com os <Link onPress={CallExternal}>Termos de Uso e a nossa Política de Privacidade</Link></FooterText>
            </View>
        </View>
    );
}