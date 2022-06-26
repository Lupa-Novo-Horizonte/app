import React, { useState, useContext } from 'react';
import { View, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  AsyncStorage from '@react-native-community/async-storage';
import { 
    Scroller,
    InputArea,
    TitleMessage,
    TitleMessageText,
    SubTitleMessageText,
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
import { UserContext } from '../../Contexts/UserContext';
import AlertModal from '../../Components/AlertModal';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    
    // Redirects
    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name:'SignUp'}]
        });
    }
    
    const handleRecoveryButtonClick = () => {
        navigation.reset({
            routes:[{name:'SignInRecovery'}]
        });
    }

    const CallExternal = () => {
        Linking.openURL('http://www.http://www.tecccog.net/index.php/quem-somos', '_blank');
    }

    // Save
    const handleSignClick = async () => {

        if (emailField == '' || passwordField == '')
        {
            changeModalVisible(true);
            setMessage('Preenchas todos os campos.');
        }
        else{
            //navigation.reset({
            //    routes:[{ name:'MainTab'}]
            //});
        
            let res = await Api.signIn(emailField, passwordField);
            
            if(res.token){
                await AsyncStorage.setItem('token', res.token);    
                await AsyncStorage.setItem('username', res.username);
                navigation.reset({
                    routes:[{ name:'MainTab'}]
                });
            } 
            else {
                changeModalVisible(true);
                setMessage('Usuário e/ou senha inválidos.');
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
                <TitleMessage>
                    <TitleMessageText>Ajuda a melhorar o bairro</TitleMessageText>
                    <SubTitleMessageText>Crie uma conta, é grátis! Reporte os problemas do bairro e ajuda a melhorar a sua infraestrutura</SubTitleMessageText>
                </TitleMessage>

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
                    <CustomButton onPress={handleSignClick}>
                        <CustomButtonText>ENTRAR</CustomButtonText>
                    </CustomButton>
                </InputArea>

                <SignMessageButton onPress={handleMessageButtonClick}>
                    <SignMessageButtonText>Não possui uma conta?</SignMessageButtonText>
                    <SignMessageButtonTextBold>Registre-se aqui</SignMessageButtonTextBold>
                </SignMessageButton>

                <SignMessageButton onPress={handleRecoveryButtonClick}>
                    <SignMessageButtonText>Esqueceu a senha?</SignMessageButtonText>
                    <SignMessageButtonTextBold>Recupere aqui</SignMessageButtonTextBold>
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