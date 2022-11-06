import React from 'react';
import { Text, Image, Linking } from 'react-native';
import { 
    Container,
    HeaderSubTitle,
    Scroller,
    Area,
    BodyText,
    MoreInfoText,
    ClickableArea,
    PasswordLink
 } from './styles';

import TopBar from '../../Components/CustomTopBar';
import HorizontalBar from '../../Components/HorizontalBar';
import Global from '../sharedVariable';

const CallExternalSite = () => {
  Linking.openURL(Global.lupa_website, '_blank'); 
}

const CallExternalGitHub = () => {
  Linking.openURL(Global.lupa_github, '_blank'); 
}

const CallExternalTwitter = () => {
  Linking.openURL(Global.lupa_twitter, '_blank')
}

const CallExternalFacebook = () => {
  Linking.openURL(Global.lupa_facebook, '_blank')
}

const CallExternalInstagram = () => {
  Linking.openURL(Global.lupa_instagram, '_blank')
}

const CallExternalLinkedin = () => {
  Linking.openURL(Global.lupa_linkedin, '_blank')
}

const CallExternalYoutube = () => {
  Linking.openURL(Global.lupa_youtube, '_blank')
}

export default () => {
    return (
        <Container>
          <TopBar title="SOBRE"/>

          <Scroller>
            <HeaderSubTitle>O que é o aplicativo Lupa?</HeaderSubTitle>
          
            <Area>
              <BodyText>
                Lupa é uma aplicação para mapeamento de falta de asfaltamento, saneamento básico e iluminação pública.
              </BodyText>
            </Area>
            
            <Area>
              <BodyText>
                Esse é um projeto de código aberto que pode ser encontrado no GitHub.
                {"\n\n"}<ClickableArea><PasswordLink onPress={CallExternalGitHub}>github/lupanh</PasswordLink></ClickableArea>
                {"\n"}Versão {Global.lupa_versao}
              </BodyText>
            </Area>         
            
            <HorizontalBar/>
            
            <Area>
              <MoreInfoText>Para mais informações sobre o projeto Lupa acesse:</MoreInfoText>
            </Area>

            <Area>
              <ClickableArea>
                <PasswordLink onPress={CallExternalSite}>lupa.tecccog.net</PasswordLink>
              </ClickableArea>
            </Area>
                        
            <Area>
              <ClickableArea onPress={CallExternalFacebook}>
                <Image style={{width:30, height:30}} source={require('../../Assets/facebook.png')} />
              </ClickableArea>
              <Text>{"\t"}</Text>
              <ClickableArea onPress={CallExternalTwitter} >
                <Image style={{width:30, height:30}} source={require('../../Assets/twitter.png')} />
              </ClickableArea>
              <Text>{"\t"}</Text>
              <ClickableArea onPress={CallExternalInstagram}>
                <Image style={{width:30, height:30}} source={require('../../Assets/instagram.png')} />
              </ClickableArea>
              <Text>{"\t"}</Text>
              <ClickableArea onPress={CallExternalLinkedin}>
                <Image style={{width:30, height:30}} source={require('../../Assets/linkedin.png')} />
              </ClickableArea>
              <Text>{"\t"}</Text>
              <ClickableArea onPress={CallExternalYoutube}>
                <Image style={{width:30, height:30}} source={require('../../Assets/youtube.png')} />
              </ClickableArea>
            </Area>
            
            <Text>{"\n"}</Text>

          </Scroller>
        </Container>
    );
}