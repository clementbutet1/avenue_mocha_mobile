import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Icon } from 'native-base';
import Styles from '../../Styles/StylesPrincipal';
import { useStore } from '../../Store/store';
import LoadingScreen from '../../Components/LoadingScreen';
import { manageError } from '../../Utils/manageError';
import Police from '../../Styles/StylePolice';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSigninButton, GoogleSignin } from '@react-native-google-signin/google-signin';
import { signInGoogleApi, CreateAccountApiGoogle, LoginApi, LoginApiGoogle } from '../../API/Authentification';

const LoginScreen = observer(({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [variable, setVariable] = useState('');
  const [secure, setSecure] = useState(true);
  const [errorMail, setErrorMail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const store = useStore();

  const getAsyncStorage = async () => {
    const getTokenFromStorage = await AsyncStorage.getItem('uniqueId');
    if (getTokenFromStorage != null) {
      console.log(getTokenFromStorage);
      store.token = getTokenFromStorage;
      navigation.navigate('Footer');
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAsyncStorage();
  }, [navigation]);

  useEffect(() => {
    if (route && route.params && route.params.email)
      setEmail(route.params.email);
  }, [route]);

  const storeToken = async value => {
    try {
      await AsyncStorage.setItem('uniqueId', value);
    } catch (error) {
      throw error;
    }
  };

  const checkVariable = async () => {
    setErrorMessage('');
    setErrorMail(false);
    setErrorPassword(false);
    setVariable('');
    if (email === '') {
      setErrorMail(true);
      setVariable(30);
    }
    if (password === '') {
      setErrorPassword(true);
      setVariable(30);
    } else {
      let response = await LoginApi(email, password);
      if (response === 203) {
        setErrorMessage("Utilisateur non trouvé")
        return;
      }
      if (response === 202) {
        setErrorMessage("Mot de passe Incorrecte")
        return;
      }
      if (response == 205)
        return;
      if (response.token) {
        storeToken(response.token);
        store.token = response.token;
        navigation.navigate('Footer');
      }
    }
  }


  const signInGoogle = async () => {
    let res = await signInGoogleApi();
    let res_api = await CreateAccountApiGoogle(res.user.givenName, res.user.familyName, res.user.email, res.idToken);
    if (res_api == 202 || res_api == 205 || res_api == 203)
      return;
    storeToken(res_api.token);
    store.token = res_api.token;
    navigation.navigate('Footer');
  }


  if (!isLoading) {
    return (
      <SafeAreaView style={Styles.container}>
        <KeyboardAvoidingView>
          <View style={[Styles.center, { height: '15%', paddingTop: '15%' }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#462e01' }}>Avenue Mocha</Text>
          </View>
          <View
            style={[
              Styles.center,
              {
                width: '100%',
                height: '35%',
                marginLeft: '7%',
                justifyContent: 'flex-start',
                paddingTop: '15%',
              },
            ]}>
            <View style={{ height: '50%', width: '90%' }}>
              <Text style={errorMail ? styles.errorTextInfo : styles.textInfo}>
                Email :
              </Text>
              <TextInput
                style={
                  ([],
                    errorMail
                      ? styles.errorTextinputEmail
                      : styles.textinputEmail)
                }
                placeholderTextColor={'#c0c6ea'}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Email"
                value={email}
                onChangeText={email => setEmail(email)}
              />
              {errorMail && (
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
                  <Text style={{ color: 'red', fontSize: 13 }}>
                    {manageError(variable)}
                  </Text>
                </View>
              )}
            </View>
            <View style={{ height: '40%', width: '90%' }}>
              <Text
                style={errorPassword ? styles.errorTextInfo : styles.textInfo}>
                Mot de passe :
              </Text>
              <View style={[{ flexDirection: 'row' }]}>
                <TextInput
                  style={
                    errorPassword
                      ? styles.errorTextinputPassword
                      : styles.textinputPassword
                  }
                  placeholderTextColor={'#c0c6ea'}
                  secureTextEntry={secure}
                  autoCorrect={false}
                  placeholder="Mot de passe"
                  contextMenuHidden={true}
                  onChangeText={password => setPassword(password)}
                />
                <TouchableOpacity
                  style={[Styles.center, { paddingLeft: 10 }]}
                  onPress={() => setSecure(!secure)}>
                  <Icon
                    type="FontAwesome"
                    name={secure ? 'eye' : 'eye-slash'}
                    style={(Styles.icon, { fontSize: 15, color: '#d54133' })}
                  />
                </TouchableOpacity>
              </View>
              {errorPassword && (
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
                  <Text style={{ color: 'red', fontSize: 13 }}>
                    {manageError(variable)}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={{ height: '45%' }}>
            <View
              style={{
                height: '40%',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                style={Styles.button}
                onPress={() => checkVariable(email, password)}>
                <Text style={{ color: 'white', fontSize: 15 }}>Se connecter</Text>
              </TouchableOpacity>
            </View>
            <View style={[Styles.center, {  height: '20%' }]}>
              {(errorMessage != "") && <Text style={{ color: 'red', fontSize: 17, paddingBottom: '2%', paddingBottom: 25 }}>{errorMessage}</Text>}
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '10%',
              }}
              onPress={() => navigation.navigate('CreateAccountScreen')}>
              <Text style={{ color: '#3494FE', fontSize: 16 }}>
                Créer un compte
              </Text>
            </TouchableOpacity>
            <View style={[Styles.center, { paddingTop: '10%' }]}>
              <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => signInGoogle()}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  } else {
    return <LoadingScreen />;
  }
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
  },
  errorTextinputEmail: {
    borderWidth: 1,
    borderColor: 'red',
    color: 'black',
    borderRadius: 1,
    width: '80%',
    height: 40,
    paddingLeft: 20,
  },
  errorTextinputPassword: {
    borderWidth: 1,
    borderColor: 'red',
    color: 'black',
    borderRadius: 1,
    width: '80%',
    height: 40,
    paddingLeft: 20,
  },
  errorTextInfo: {
    fontSize: 13,
    color: 'white',
    paddingBottom: '2%',
    color: 'red',
    height: 'auto',
    width: '30%',
  },
  button: {
    backgroundColor: '#d54133',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 7
  }
});

export default LoginScreen;
