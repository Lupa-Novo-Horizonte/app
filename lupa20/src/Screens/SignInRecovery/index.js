import React, { useState} from 'react';
import { Linking, Image, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  AsyncStorage from '@react-native-community/async-storage';
import { 
    Scroller,
    CustomButton,
    CustomButtonText,
    InputArea,
    Modal,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    FooterText,
    Link
} from './styles';

import SharedStyles from '../../Screens/sharedStyles';
import EmailIcon from '../../Assets/check.svg';
import AlertModal from '../../Components/AlertModal';
import SignInput from '../../Components/SignInput';
import Api from '../../Api';
import Global from '../sharedVariable';

export default () => {
  
  const navigation = useNavigation();
  const [emailField, setEmailField] = useState('');

  // Redirect
  const handleMessageButtonClick = () => {
    navigation.reset({
        routes: [{name:'SignIn'}]
    });
  }

  const CallExternalPolitica = () => {
    Linking.openURL(Global.lupa_politica, '_blank'); 
  }

  // Save
  const handleRecuveryClick = async () => {
    if (emailField == '')
    {
        changeModalVisible(true);
        setMessage('Preencha o campo.');
    }
    else{
        let res = await Api.signInRecovery(emailField);
        console.info(res);
      if(res.error == null){
          Alert.alert("Sucesso", "Recuperação de senha enviado ao seu e-mail.");
          navigation.reset({
              routes:[{ name:'SignIn'}]
          });
      }
      else
      {
        changeModalVisible(true);
        setMessage(`${res.error.message}`);
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
              <CustomButton onPress={handleRecuveryClick}>
                  <CustomButtonText>RECUPERAR</CustomButtonText>
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
          <FooterText>Ao se registrar, você concorda com os <Link onPress={CallExternalPolitica}>Termos de Uso e a nossa Política de Privacidade</Link></FooterText>
      </View>
    </View>
    );
}