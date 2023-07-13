import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';

import IdentityScreen from '../Screens/ProfilScreens/IdentityScreen';
import ChangePasswordScreen from '../Screens/ProfilScreens/ChangePasswordScreen';
import AuthenStackScreen from './AuthenStackScreen';
import ProfilScreen from '../Screens/ProfilScreens/ProfilScreen';
import SettingScreen from '../Screens/ProfilScreens/SettingScreen';

import Styles from '../Styles/StylesPrincipal';

const ProfilStack = createStackNavigator();

const ProfilStackScreen = ({navigation}) => {
  return (
    <ProfilStack.Navigator
      initialRouteName="Profil"
      tabBarOptions={{
        tabBarHideOnKeyboard: true,
      }}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#462e01',
          shadowColor: 'transparent',
        },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
        headerBackAllowFontScaling: true,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitleAlign: 'center',
      }}>
      <ProfilStack.Screen
        name="Profil"
        component={ProfilScreen}
        options={{
          title: 'Profil',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={[Styles.touchZone, {width: 60, height: 60}]}>
              <Icon type="FontAwesome" name="cog" style={[Styles.icon]} />
            </TouchableOpacity>
          ),
        }}
      />
      <ProfilStack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          title: 'Réglages',
          headerLeftContainerStyle: {marginLeft: 10},
        }}
      />
      <ProfilStack.Screen
        name="Identity"
        component={IdentityScreen}
        options={{
          title: 'Identité et Coordonnées',
          headerLeftContainerStyle: {marginLeft: 10},
        }}
      />
      <ProfilStack.Screen
        name="ModifyPass"
        component={ChangePasswordScreen}
        options={{
          title: 'Changer le mot de passe',
          headerLeftContainerStyle: {marginLeft: 10},
        }}
      />
      <ProfilStack.Screen name="Authen" component={AuthenStackScreen} />
    </ProfilStack.Navigator>
  );
};

export default ProfilStackScreen;
