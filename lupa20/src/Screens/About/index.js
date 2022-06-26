import React from 'react';
import { Text, Image, Linking } from 'react-native';
import { 
    Container,
    HeaderSubTitle,
    Scroller,
    Area,
    BodyText,
    SmallBodyText,
    StatusTitle,
    BulletArea,
    BulletText,
    MoreInfoText,
    SmallLinkText,
    ClickableArea,
    PasswordLink
 } from './styles';

import TopBar from '../../Components/CustomTopBar';
import HorizontalBar from '../../Components/HorizontalBar';

const CallExternalSite = () => {
  Linking.openURL('http://www.tecccog.net', '_blank'); 
}

const CallExternalGitHub = () => {
  Linking.openURL('https://github.com/Lupa-Novo-Horizonte', '_blank'); 
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
                Esse é um projeto de código aberto que pode ser encotrado no GitHub.
                {"\n"}<ClickableArea><PasswordLink onPress={CallExternalGitHub}>github/lupanh</PasswordLink></ClickableArea>
                {"\n"}Versão 2.0
              </BodyText>
            </Area>
            
            <Area>
              <StatusTitle>Status</StatusTitle>
            </Area>
            
            <Area>
              <BulletArea>                
                <BulletText>
                  <Image style={{width:15, height:15}} source={require('../../Assets/check.png')} />
                  {"\t\t"}Problema Resolvido
                </BulletText>                
                
                <BulletText>
                  <Image style={{width:15, height:15}} source={require('../../Assets/bad.png')} />
                  {"\t\t"}Problema não Resolvido
                </BulletText>

                <BulletText>
                  <Image style={{width:15, height:15}} source={require('../../Assets/warning.png')} />
                  {"\t\t"}Resolução em Andamento
                </BulletText>
              </BulletArea>
            </Area>
            
            <Area>
              <SmallBodyText>Veja o status dos seus envios em <SmallLinkText>Perfil</SmallLinkText></SmallBodyText>
            </Area>
            
            <HorizontalBar/>
            
            <Area>
              <MoreInfoText>Para mais informações sobre o projeto Lupa acesse:</MoreInfoText>
            </Area>

            <Area>
              <ClickableArea>
                <PasswordLink onPress={CallExternalSite}>www.tecccog.net</PasswordLink>
              </ClickableArea>
            </Area>
            
            <Text>{"\n"}</Text>
          </Scroller>
        </Container>
    );
}