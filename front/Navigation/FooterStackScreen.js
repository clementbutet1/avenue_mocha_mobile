import React from 'react';
import { Icon } from 'native-base';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';
import ProfilStackScreen from './ProfilStackScreen';
import CommandStackScreen from './CommandStackScreen';

const Footer = createBottomTabNavigator();

const FooterStackScreen = ({ navigation, route }) => {

  return (
    <Footer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Découvrir"
      tabBarOptions={{
        tabBarHideOnKeyboard: true,
        labelStyle: {
          fontSize: 12,
          textTransform: 'capitalize',
        },
        activeTintColor: '#462e01',
        inactiveTintColor: '#A4A4A4',
        style: { height: Platform.OS === 'ios' ? 90 : 55 },
      }}
    >
      <Footer.Screen
        name="Découvrir"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              type="FontAwesome"
              name="compass"
              color={tintColor}
              style={{
                fontSize: 24,
                color: focused ? '#462e01' : '#A4A4A4',
                paddingTop: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          ),
        }}
      />
      <Footer.Screen
        name="Mes commandes"
        component={CommandStackScreen}
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              type="AntDesign"
              name="shoppingcart"
              color={tintColor}
              style={{
                fontSize: 24,
                color: focused ? '#462e01' : '#A4A4A4',
                paddingTop: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          ),
        }}
      />
      <Footer.Screen
        name="Profil"
        component={ProfilStackScreen}
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              type="MaterialCommunityIcons"
              name="account-circle-outline"
              color={tintColor}
              style={{
                fontSize: 24,
                color: focused ? '#462e01' : '#A4A4A4',
                paddingTop: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          ),
        }}
      />
    </Footer.Navigator>
  );
};

export default FooterStackScreen;
