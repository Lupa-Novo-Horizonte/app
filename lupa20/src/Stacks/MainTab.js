import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../Components/CustomTabBar';
import Home from '../Screens/Home';
import Map from '../Screens/Map';
import Profile from '../Screens/Profile';
import Trash from "../Screens/Trash";
import Collect from "../Screens/Collect";
import Light from "../Screens/Light";
import Sewer from "../Screens/Sewer";
import Water from "../Screens/Water";
import Asphalt from "../Screens/Asphalt";
import SignInUpdate from "../Screens/SignInUpdate";
import About from "../Screens/About";
import Info from "../Screens/Info";

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator screenOptions={{ headerShown:false }} tabBar={props=><CustomTabBar{...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Info" component={Info} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="About" component={About} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Trash" component={Trash} />
        <Tab.Screen name="Collect" component={Collect} />
        <Tab.Screen name="Light" component={Light} />
        <Tab.Screen name="Sewer" component={Sewer} />
        <Tab.Screen name="Water" component={Water} />
        <Tab.Screen name="Asphalt" component={Asphalt} />
        <Tab.Screen name="SignInUpdate" component={SignInUpdate} />        
    </Tab.Navigator>
);