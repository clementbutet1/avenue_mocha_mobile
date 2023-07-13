import React from 'react';
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../Screens/HomePage';
import Styles from '../Styles/StylesPrincipal';
import ShopScreen from '../Screens/ShopScreen';
import CoffeeScreen from '../Screens/CoffeeScreen';
import ShopListScreen from '../Screens/ShopListScreen';

const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => {

    return (
        <HomeStack.Navigator
        initialRouteName="Découvrir"
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
            <HomeStack.Screen
                name="Découvrir"
                component={HomePage}
            />
            <HomeStack.Screen
                name="Boutique"
                component={ShopScreen}
            />
             <HomeStack.Screen
                name="Café"
                component={CoffeeScreen}
            />
              <HomeStack.Screen
                name="MonPanier"
                component={ShopListScreen}
            />
        </HomeStack.Navigator>
    );
};

export default HomeStackScreen;