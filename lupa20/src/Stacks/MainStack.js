import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Preload from "../Screens/Preload";
import SignIn from "../Screens/SignIn";
import SignUp from "../Screens/SignUp";
import SignInRecovery from "../Screens/SignInRecovery";
import MainTab from "../Stacks/MainTab";

const Stack = createStackNavigator();

export default() => (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
        headerShown:false
        }}
    >    
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignInRecovery" component={SignInRecovery} />
        <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
);