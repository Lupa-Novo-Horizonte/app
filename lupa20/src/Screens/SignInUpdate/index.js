import React, { useState} from 'react';
import { Linking, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  AsyncStorage from '@react-native-community/async-storage';
import { 
    Container,
    Scroller,
    CustomButton,
    CustomButtonText,
    InputArea,
    Modal,
    Area,
    AvatarArea,
    TitleText
} from './styles';

import TopBar from '../../Components/CustomTopBarWithBack';
import AlertModal from '../../Components/AlertModal';
import SignInput from '../../Components/SignInput';
import LockIcon from '../../Assets/lock.svg';
import Api from '../../Api';

export default () => {
  
  const [passwordField, setPasswordField] = useState('');
  const [confirmPasswordField, setConfirmPasswordField] = useState('');
  const navigation = useNavigation();

  // Redirects
  const Logout = async () => {
    await AsyncStorage.removeItem('token')
    navigation.reset({
      routes:[{ name:'SignIn'}]
    });
  }
  
  const CallExternal = () => {
    Linking.openURL('http://www.tecccog.net', '_blank'); 
  }


  // Save
  const handleRegisterClick = async () => {
    if (passwordField == '' || confirmPasswordField == '')
    {
        changeModalVisible(true);
        setMessage('Preencha todos os campos.');
    }
    else if (passwordField != confirmPasswordField)
    {
        changeModalVisible(true);
        setMessage('Ambos os campos devem ser iguais.');
    }
    else if(passwordField.length < 4)
    {
        changeModalVisible(true);
        setMessage('Tamanho mínimo para senha deve ser 4 dígitos.');
    }
    else
    {
      var token = await AsyncStorage.getItem('token');
      var username = await AsyncStorage.getItem('username');
      let res = await Api.signInUpdate(username, passwordField, token);
      if(res){
          navigation.reset({
              routes:[{ name:'MainTab'}]
          });
      } 
      else 
      {
        changeModalVisible(true);
        setMessage('Atualização de senha falhou. Tente novamente mais tarde.');
      }
    }
  }


  // Modal
  const [isModalVisible, setisModalVisible] = useState(false);
  const [message, setMessage] = useState('Empty');
  const backTo = 'Profile';
  const changeModalVisible = (bool) => {
      setisModalVisible(bool);
  }

  return (
        <Container>
             <TopBar backTo={backTo}/>

              <Scroller>

              <Area>
                  <AvatarArea>
                    <Image style={{width:80, height:80}} source={require('../../Assets/passwordIcon.png')} />
                  </AvatarArea>
                </Area>

              <Area>
                <TitleText>Insira uma nova senha para atualização. No seu próximo login, você deve utiliza-la.</TitleText>
              </Area>

              <InputArea>
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
                        <CustomButtonText>ATUALIZAR</CustomButtonText>
                    </CustomButton>
                </InputArea>
 
            </Scroller>

            <Modal 
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                nRequestClose={() => changeModalVisible(false)}
                >
                <AlertModal changeModalVisible={changeModalVisible} msg={message} />
            </Modal>

        </Container>
    );
}