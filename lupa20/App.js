import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import UserContextProvider from './src/Contexts/UserContext';
import MainStack from './src/Stacks/MainStack';

export default() => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <MainStack></MainStack>
      </NavigationContainer>
    </UserContextProvider>
  );
}