import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import Styles from '../Styles/StylesPrincipal';
import CommandScreen from '../Screens/Commands/CommandScreen';

const CommandStack = createStackNavigator();

const CommandStackScreen = ({navigation}) => {
  return (
    <CommandStack.Navigator
      initialRouteName="Command"
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
      <CommandStack.Screen
        name="Command"
        component={CommandScreen}
        options={{
          title: 'Ancienne Commande',
        }}
      />
    </CommandStack.Navigator>
  );
};

export default CommandStackScreen;
