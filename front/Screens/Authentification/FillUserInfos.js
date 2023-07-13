import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { Icon, CheckBox } from 'native-base';
import Styles from '../../Styles/StylesPrincipal';
import { manageError } from '../../Utils/manageError';
import { CreateAccountApi } from '../../API/Authentification';

const FillUserInfos = observer(({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [variable, setVariable] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [agree, setAgree] = useState(false);
  const [phone, setPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (route)
      if (route.params) {
        setEmail(route.params.email);
        setPassword(route.params.password);
      }
  }, [route]);

  const checkboxHandler = () => {
    setAgree(!agree);
  };

  const checkLogin = async (firstname, lastname, email, password, phone) => {
    setErrorFirstName(false);
    setErrorLastName(false);
    if (firstname === '') {
      setErrorFirstName(true);
      setVariable(30);
    }
    if (lastname === '') {
      setErrorLastName(true);
      setVariable(30);
    }
    if (phone === '') {
      setErrorPhone(true);
      setVariable(30);
    }
    if (phone !== '' && (`${phone.length}` > 10 || `${phone.length}` < 10)) {
      setErrorPhone(true);
      setVariable(3);
      return;
    }
    if (agree === false) {
      Alert.alert('Veuillez accepter les conditions générales');
      return;
    } else {
      var response = await CreateAccountApi(password, firstname, lastname, email, navigation, phone);
      if (response == 203) {
        setErrorMessage("Le compte existe déjà")
      }
      if (response == 202) {
        setErrorMessage("Error")
      }
      if (response === 200)
        navigation.navigate('LoginScreen', { email: email, password: password });
    };
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        style={[Styles.container]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={{
            marginTop: '5%',
            marginBottom: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: '20%',
              height: 30,
              flexDirection: 'row',
              marginLeft: '5%',
            }}>
            <Icon
              type="FontAwesome"
              name="angle-left"
              style={(Styles.icon, { fontSize: 30, color: '#d54133' })}
            />
          </TouchableOpacity>
          <View
            style={{
              marginRight: '35%',
            }}>
            <Text
              style={{
                fontSize: 25,
                color: '#d54133',
              }}>
              Inscription
            </Text>
          </View>
        </View>
        <View style={[Styles.center, { height: 'auto', paddingLeft: '12.5%' }]}>
          <View style={{ height: 'auto', width: '90%' }}>
            <Text
              style={errorLastName ? styles.errorTextInfo : styles.textInfo}>
              Nom :
            </Text>
            <TextInput
              style={
                errorLastName
                  ? styles.errorTextinputEmail
                  : styles.textinputEmail
              }
              placeholderTextColor={'#c0c6ea'}
              autoCorrect={false}
              autoCapitalize="characters"
              placeholder="Nom"
              value={lastname}
              onChangeText={lastname => setlastname(lastname)}
            />
            {errorLastName && (
              <View
                style={[
                  {
                    flexDirection: 'row',
                    paddingTop: '2%',
                    alignItems: 'center',
                  },
                ]}>
                <Icon
                  type="AntDesign"
                  name="closecircle"
                  style={[{ fontSize: 10, color: 'red', paddingRight: '2%' }]}
                />
                <Text style={{ color: 'red', fontSize: 13, paddingBottom: '2%' }}>
                  {manageError(variable)}
                </Text>
              </View>
            )}
          </View>
          <View style={{ height: 'auto', width: '90%' }}>
            <Text
              style={errorFirstName ? styles.errorTextInfo : styles.textInfo}>
              Prénom :
            </Text>
            <TextInput
              style={
                errorFirstName
                  ? styles.errorTextinputEmail
                  : styles.textinputEmail
              }
              placeholderTextColor={'#c0c6ea'}
              autoCorrect={false}
              autoCapitalize="words"
              placeholder="Prénom"
              value={firstname}
              onChangeText={firstname => setfirstname(firstname)}
            />
            {errorFirstName && (
              <View
                style={[
                  {
                    flexDirection: 'row',
                    paddingTop: '2%',
                    alignItems: 'center',
                  },
                ]}>
                <Icon
                  type="AntDesign"
                  name="closecircle"
                  style={[{ fontSize: 10, color: 'red', paddingRight: '2%' }]}
                />
                <Text style={{ color: 'red', fontSize: 13, paddingBottom: '2%' }}>
                  {manageError(variable)}
                </Text>
              </View>
            )}
          </View>
          <View style={{ height: 'auto', width: '90%' }}>
            <Text style={errorPhone ? styles.errorTextInfo : styles.textInfo}>
              Téléphone :
            </Text>
            <TextInput
              style={
                errorPhone ? styles.errorTextinputEmail : styles.textinputEmail
              }
              placeholderTextColor={'#c0c6ea'}
              autoCorrect={false}
              autoCapitalize="words"
              placeholder="Téléphone"
              keyboardType="number-pad"
              value={phone}
              onChangeText={phone => setPhone(phone)}
            />
            {errorPhone && (
              <View
                style={[
                  {
                    flexDirection: 'row',
                    paddingTop: '2%',
                    alignItems: 'center',
                  },
                ]}>
                <Icon
                  type="AntDesign"
                  name="closecircle"
                  style={[{ fontSize: 10, color: 'red', paddingRight: '2%' }]}
                />
                <Text style={{ color: 'red', fontSize: 13, paddingBottom: '2%' }}>
                  {manageError(variable)}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={[Styles.center, { marginTop: 25 }]}>
          {(errorMessage != "") && <Text style={{ color: 'red', fontSize: 13, paddingBottom: '2%', paddingBottom: 25 }}>{errorMessage}</Text>}
        </View>
        <View
          style={{
            marginBottom: '5%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginHorizontal: '13%',
          }}>
          <CheckBox
            style={{ marginRight: '7%' }}
            checked={agree}
            onPress={() => checkboxHandler()}
          />
          <Text style={{ fontSize: 11, flexShrink: 1 }}>
            En vous inscrivant, vous acceptez nos conditions d'utilisation et
            notre politique de confidentialité.
          </Text>
        </View>
        <View style={[{ height: '10%' }, Styles.center]}>
          <TouchableOpacity
            style={Styles.button}
            onPress={() =>
              checkLogin(
                firstname,
                lastname,
                email,
                password,
                phone,
              )
            }>
            <Text style={{ color: 'white' }}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  textinputEmail: {
    borderWidth: 1,
    borderColor: '#E7E7E7',
    color: 'black',
    borderRadius: 1,
    width: '80%',
    height: 40,
    paddingLeft: 20,
  },
  textinputPassword: {
    borderWidth: 1,
    borderColor: '#E7E7E7',
    color: 'black',
    borderRadius: 1,
    width: '80%',
    height: 40,
    paddingLeft: 20,
  },
  textInfo: {
    fontSize: 13,
    color: '#9E9E9E',
    paddingBottom: '2%',
    paddingTop: '5%',
  },
  errorTextinputEmail: {
    borderWidth: 1,
    color: 'black',
    borderColor: 'red',
    borderRadius: 1,
    width: '80%',
    height: 40,
    paddingLeft: 20,
  },
  errorTextinputPassword: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 1,
    width: '80%',
    height: 40,
    paddingLeft: 20,
  },
  errorTextInfo: {
    fontSize: 13,
    color: '#9E9E9E',
    paddingBottom: '1%',
    height: 'auto',
    paddingTop: '1%',
  },
});

export default FillUserInfos;
