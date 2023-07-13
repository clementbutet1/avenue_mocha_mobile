/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Icon} from 'native-base';
import {observer} from 'mobx-react-lite';
import Styles from '../../Styles/StylesPrincipal';
import {useStore} from '../../Store/store';
import url from '../../config/env';
import { getUserData, updateUserData } from '../../API/Authentification';

var moment = require('moment-timezone');

const IdentityScreen = observer(({navigation}) => {
  const store = useStore();
  const [email, setEmail] = useState('');
  const [lastname, setlastname] = useState('');
  const [firstname, setfirstname] = useState('');
  const [civil, setCivil] = useState('');
  const [phone, setPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState(false);

  const checkUserInfo = async (email, lastname, firstname, phone) => {
    setErrorPhone(false);
    if (`${phone.length}` == 10) {
      let res = await updateUserData(email, firstname, lastname, phone);
      if (res == 205)
        return;
      navigation.goBack();
    }
    else setErrorPhone(true);
  };

  const getUserInfo = async () => {
    let res = await getUserData();
    setEmail(res[0].email);
    setfirstname(res[0].firstname);
    setlastname(res[0].lastname);
    setPhone(res[0].phone);
  }

  useEffect(() => {
    getUserInfo();
  }, [navigation]);


  return (
      <SafeAreaView style={Styles.container}>
        <View style={Styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={{paddingTop: '4%', paddingLeft: '4%'}}>
              <View
                style={[
                  Styles.center,
                  {
                    borderWidth: 1,
                    borderRadius: 40,
                    width: 40,
                    height: 40,
                    borderColor: '#462e01',
                  },
                ]}>
                <Icon
                  type="FontAwesome"
                  name="user"
                  style={(Styles.icon, {fontSize: 20, color: '#462e01'})}
                />
              </View>
            </View>
            <View style={{paddingLeft: '10%'}}>
              <Text style={styles.text}>Prénom :</Text>
              <TextInput
                style={styles.textinput}
                placeholderTextColor={'#c0c6ea'}
                keyboardType="default"
                autoCorrect={false}
                placeholder="Prénom"
                value={firstname}
                onChangeText={firstname => setfirstname(firstname)}
              />
            </View>
            <View style={{paddingLeft: '10%'}}>
              <Text style={styles.text}>Nom de famille :</Text>
              <TextInput
                style={styles.textinput}
                placeholderTextColor={'#c0c6ea'}
                keyboardType="default"
                autoCorrect={false}
                placeholder="Nom de famille"
                value={lastname}
                onChangeText={lastname => setlastname(lastname)}
              />
            </View>
            <View style={{paddingTop: '4%', paddingLeft: '4%'}}>
              <View
                style={[
                  Styles.center,
                  {
                    borderWidth: 1,
                    borderRadius: 40,
                    width: 40,
                    height: 40,
                    borderColor: '#462e01',
                  },
                ]}>
                <Icon
                  type="FontAwesome"
                  name="address-book-o"
                  style={(Styles.icon, {fontSize: 20, color: '#462e01'})}
                />
              </View>
            </View>
            <View style={{paddingLeft: '10%'}}>
              <Text style={styles.text}>Numéro de téléphone :</Text>
              <TextInput
                style={styles.textinput}
                placeholderTextColor={'#c0c6ea'}
                keyboardType="phone-pad"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Portable"
                value={phone}
                onChangeText={phone => setPhone(phone)}
              />
              {errorPhone && (
                <Text
                  style={[
                    {
                      paddingLeft: '10%',
                      color: 'red',
                      fontSize: 14,
                      fontWeight: 'bold',
                    },
                  ]}>
                  Erreur sur le numéro de téléphone
                </Text>
              )}
            </View>
            <View style={{paddingLeft: '10%'}}>
              <Text style={styles.text}>Email :</Text>
              <TextInput
                style={styles.textinput}
                placeholderTextColor={'#c0c6ea'}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Email"
                value={email}
                onChangeText={email => setEmail(email)}
              />
            </View>
            <View style={{paddingBottom: '5%', paddingLeft: '10%'}}></View>
            <View
              style={{
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '10%',
              }}>
              <TouchableOpacity
                style={Styles.button}
                onPress={() =>
                  checkUserInfo(
                    email,
                    lastname,
                    firstname,
                    phone,
                  )
                }>
                <Text style={{color: 'white'}}>Modifier</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
  );
});

export default IdentityScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    paddingBottom: '2%',
    paddingTop: '4%',
    color: '#9E9E9E',
  },
  textinput: {
    borderWidth: 1,
    borderColor: '#E7E7E7',
    color: 'black',
    borderRadius: 1,
    width: '90%',
    height: 40,
    paddingLeft: 20,
    fontSize: 14,
  },
});
