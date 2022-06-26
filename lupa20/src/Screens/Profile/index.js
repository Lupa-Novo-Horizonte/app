import React, {useState, useEffect} from 'react';
import { Text, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  AsyncStorage from '@react-native-community/async-storage';
import { 
    Container,
    Scroller,
    Area,
    AvatarArea,
    TitleText,
    BodyText,
    PasswordLink,
    LogoutText,
    ClickableArea
} from './styles';

import TopBar from '../../Components/CustomTopBar';
import HorizontalBar from '../../Components/HorizontalBar';

export default () => {
  
  const navigation = useNavigation();
  
  const [userName, setUsername] = useState('');
  const GetUsername = async () =>{
    let res = await AsyncStorage.getItem('username');
    setUsername(res);
  }

  useEffect(() => {
    GetUsername();
  });
  
  const Logout = async () => {
    await AsyncStorage.removeItem('token')
    navigation.reset({
      routes:[{ name:'SignIn'}]
    });
  }
  
  const CallSignInUpdate = () => {
    navigation.navigate('SignInUpdate')
  }

  const CallExternal = () => {
    Linking.openURL('http://www.tecccog.net', '_blank'); 
  }

  return (
        <Container>
             <TopBar title="PERFIL"/>

              <Scroller>
                  
                <Area>
                  <AvatarArea>
                    <Image style={{width:80, height:80}} source={require('../../Assets/avatar.png')} />
                  </AvatarArea>
                </Area>
                                
                <Area>
                  <TitleText>E-mail</TitleText>
                </Area>
                <Area>
                  <HorizontalBar/>
                </Area>
                <Area>
                  <BodyText>{userName}</BodyText>
                </Area>
                
                <Area>
                  <TitleText>Senha</TitleText>
                </Area>
                <Area>
                  <HorizontalBar/>
                </Area>
                <Area>
                  <BodyText>************</BodyText>
                </Area> 

                <Area>
                  <BodyText>Deseja alterar a senha?{"\t"}</BodyText>
                  <ClickableArea>
                    <PasswordLink onPress={CallSignInUpdate}>Clique aqui</PasswordLink>
                  </ClickableArea>
                </Area>

                <Area>
                  <ClickableArea>
                    <LogoutText onPress={Logout}>Sair do aplicativo{"\t"}</LogoutText>
                  </ClickableArea>
                </Area>

              <Text>{"\n"}</Text>
            </Scroller>
        </Container>
    );
}