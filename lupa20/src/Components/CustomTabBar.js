import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { UserContext } from '../Contexts/UserContext';

import HomeIcon from '../Assets/home.svg';
import HomeNegativeIcon from '../Assets/homeNegative.svg';

import MapIcon from '../Assets/map.svg';

import AccountIcon from '../Assets/account.svg';
import AccountNegativeIcon from '../Assets/accountNegative.svg';

import AboutIcon from '../Assets/about.svg';
import AboutNegativeIcon from '../Assets/aboutNegative.svg';

import InfoIcon from '../Assets/info.svg';
import InfoNegativeIcon from '../Assets/infoNegative.svg';

const TabArea = styled.View`
    height: 60px;
    background-color: #092654;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #0a2655;
    margin-top: -20px;
`;

export default ({ state, navigation }) => {
    const { state:user } = useContext(UserContext);

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('Home')}>
                {
                    state.index===0
                    ?
                    <HomeIcon width="40" height="40" fill="#FFFFFF" /> 
                    :
                    <HomeNegativeIcon width="40" height="40" fill="#FFFFFF" />
                }                
            </TabItem>

            <TabItem onPress={()=>goTo('Info')}>
                {
                    state.index===1
                    ?
                    <InfoIcon width="40" height="40" fill="#FFFFFF" />
                    :
                    <InfoNegativeIcon width="40" height="40" fill="#FFFFFF" />
                }
            </TabItem>
                        
            <TabItemCenter onPress={()=>goTo('Map')}>
                {
                    state.index===2
                    ?
                    <MapIcon style={{opacity: 1}} width="65" height="65" fill="#FFFFFF" />
                    :
                    <MapIcon style={{opacity: 0.5}} width="65" height="65" fill="#FFFFFF" />
                }
            </TabItemCenter>

            <TabItem onPress={()=>goTo('About')}>
                {
                    state.index===3
                    ?
                    <AboutIcon width="40" height="40" fill="#FFFFFF" />
                    :
                    <AboutNegativeIcon width="40" height="40" fill="#FFFFFF" />
                }
            </TabItem>
                        
            <TabItem onPress={()=>goTo('Profile')}>
                {
                    state.index===4
                    ?
                    <AccountIcon  width="40" height="40" fill="#FFFFFF" />
                    :
                    <AccountNegativeIcon width="40" height="40" fill="#FFFFFF" />
                }
            </TabItem>
        </TabArea>
    )
}