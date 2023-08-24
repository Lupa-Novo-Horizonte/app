import React, {useState, useEffect} from 'react';
import { Text, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  AsyncStorage from '@react-native-community/async-storage';
import { 
    Container,
    Scroller,
    Area,
    ReportArea,
    ReportText,
    ReportBoldText,
    AvatarArea,
    TitleText,
    BodyText,
    PasswordLink,
    LogoutText,
    ClickableArea,
} from './styles';

import TopBar from '../../Components/CustomTopBar';
import HorizontalBar from '../../Components/HorizontalBar';
import Api from '../../Api';

export default () => {
  
  const navigation = useNavigation();
  
  const [userName, setUsername] = useState('');
  const GetUsername = async () =>{
    let res = await AsyncStorage.getItem('username');
    setUsername(res);
  }

  const Logout = async () => {
    await AsyncStorage.removeItem('token')
    navigation.reset({
      routes:[{ name:'SignIn'}]
    });
  }
  
  const CallSignInUpdate = () => {
    navigation.navigate('SignInUpdate')
  }

  const [report, setReport] = useState();
  const GetReport = async () => {
    let token = await AsyncStorage.getItem('token');
    let id = await AsyncStorage.getItem('id');
      let res = await Api.getReport(token, Number(id));
      if(res != null){
          setReport(res.chartTable);
      } 
      else 
      {
          changeModalVisible(true);
          setMessage('Não foi carregar dados do relatório. Tente novamente mais tarde.');
      }
  }

  useEffect(() => {
    GetUsername();
    GetReport();
  },[]);
 
 const RenderReport = () => {
  return(
    <ReportArea>      
      <ReportText>Calçadas e Asfalto:  {report.Asphalt.total}</ReportText>
      
      <ReportText>Coleta de Lixo: {report.Collect.total}</ReportText>
      
      <ReportText>Iluminação Pública: {report.Light.total}</ReportText>
      
      <ReportText>Água Potável: {report.Water.total}</ReportText>
      
      <ReportText>Limpeza Urbana: {report.Trash.total}</ReportText> 
      
      <ReportText>Tratamento de Esgoto: {report.Sewer.total}</ReportText>

      <ReportBoldText>Total: {report.All.total}</ReportBoldText>
    </ReportArea>
    );
  };

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

              <Area>
                <TitleText>Minha Coleta</TitleText>
              </Area>
              <Area>
                <HorizontalBar/>
              </Area>
              
              {
                report != null &&
                  <RenderReport />
              }

            </Scroller>
        </Container>
    );
}