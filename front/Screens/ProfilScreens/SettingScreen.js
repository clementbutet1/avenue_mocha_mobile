import React from 'react';
import {View, Text, ScrollView, Alert, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {ListItem, Body, Right, Left, Icon} from 'native-base';
import Styles from '../../Styles/StylesPrincipal';
import { useStore } from '../../Store/store';

export default function SettingScreen({navigation}) {
  const store = useStore();

  const deconnect = () => {
    store.token = null;
    AsyncStorage.clear();
  };

  const deconnectUser = () => {
    Alert.alert(
      'Êtes vous sur de vouloirs vous déconnecter ?',
      '',
      [
        {text: 'Annuler', style: 'cancel'},
        {text: 'Déconnexion', onPress: () => deconnect()},
      ],
      {cancelable: false},
    );
  };

  const comingFeature = () => {
    Alert.alert('Fonctionnalité à venir', '', [{text: 'Ok', style: 'Ok'}], {
      cancelable: false,
    });
  };

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <ListItem icon onPress={comingFeature}>
            <Left>
              <Icon
                type="FontAwesome"
                name="info"
                style={
                  (Styles.iconprofil,
                  {paddingLeft: 6, color: '#29b6e4', fontSize: 20})
                }
              />
            </Left>
            <Body>
              <Text style={{fontSize: 15}}>Informations Légal</Text>
            </Body>
            <Right>
              <Icon
                type="FontAwesome"
                name="angle-right"
                style={Styles.iconprofil}
              />
            </Right>
          </ListItem>
          <ListItem icon onPress={deconnectUser}>
            <Left>
              <Icon
                type="FontAwesome"
                name="sign-out"
                style={
                  (Styles.iconprofil,
                  {paddingLeft: 3, color: '#fbed20', fontSize: 20})
                }
              />
            </Left>
            <Body>
              <Text style={{fontSize: 15}}>Déconnexion</Text>
            </Body>
          </ListItem>
          <View style={[Styles.center, {paddingTop: '15%'}]}>
            <Text style={{fontSize: 15}}>App Version 0.01</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
