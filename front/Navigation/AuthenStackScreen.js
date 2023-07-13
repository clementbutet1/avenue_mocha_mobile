import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CreateAccountScreen from '../Screens/Authentification/CreateAccountScreen';
import LoginScreen from '../Screens/Authentification/LoginScreen';
import FooterStackScreen from './FooterStackScreen';
import UserInfos from '../Screens/Authentification/FillUserInfos';

const AuthenStack = createStackNavigator();

const AuthenStackScreen = ({navigation}) => {
  return (
    <AuthenStack.Navigator
      screenOptions={{headerShown: false}}
      tabBarOptions={{
        tabBarHideOnKeyboard: true,
      }}>
      <AuthenStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthenStack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
      />
      <AuthenStack.Screen name="Footer" component={FooterStackScreen} />
      <AuthenStack.Screen name="Remplace" component={UserInfos} />
    </AuthenStack.Navigator>
  );
};

export default AuthenStackScreen;
