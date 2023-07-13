import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {Icon} from 'native-base';

import Styles from '../../Styles/StylesPrincipal';
import {manageError} from '../../Utils/manageError';

export default function CreateAccountScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [confirmemail, setConfirmemail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [errorMail, setErrorMail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorCMail, setErrorCMail] = useState(false);
  const [errorCPassword, setErrorCPassword] = useState(false);
  const [variable, setVariable] = useState(0);
  const [secure, setsecure] = useState(true);
  const [securebis, setsecurebis] = useState(true);

  useEffect(() => {
    manageError();
  }, [variable]);

  const checkLogin = (email, password, confirmemail, confirmpassword) => {
    setErrorPassword(false);
    setErrorCPassword(false);
    setErrorCMail(false);
    setErrorMail(false);
    if (email === '') {
      setErrorMail(true);
      setVariable(30);
    }
    if (confirmemail === '') {
      setErrorCMail(true);
      setVariable(30);
    }
    if (password === '') {
      setErrorPassword(true);
      setVariable(30);
    }
    if (confirmpassword === '') {
      setErrorCPassword(true);
      setVariable(30);
    } else if (email !== confirmemail) {
      setErrorMail(true);
      setErrorCMail(true);
      setVariable(1);
    } else if (password !== confirmpassword) {
      setErrorPassword(true);
      setErrorCPassword(true);
      setVariable(2);
      return;
    } else {
      setVariable(0);
      navigation.navigate('Remplace', {email, password});
    }
  };

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
              style={(Styles.icon, {fontSize: 30, color: '#d54133'})}
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
        <View style={[Styles.center, {height: 'auto', paddingLeft: '12.5%'}]}>
          <View style={{height: 'auto', width: '90%'}}>
            <Text style={errorMail ? styles.errorTextInfo : styles.textInfo}>
              Email :
            </Text>
            <TextInput
              style={
                errorMail ? styles.errorTextInputEmail : styles.textinputEmail
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
                  style={[{fontSize: 10, color: 'red', paddingRight: '2%'}]}
                />
                <Text
                  style={{
                    color: 'red',
                    fontSize: 13,
                    paddingTop: '2%',
                    paddingBottom: '2%',
                  }}>
                  {manageError(variable)}
                </Text>
              </View>
            )}
          </View>
          <View style={{height: 'auto', width: '90%'}}>
            <Text style={errorCMail ? styles.errorTextInfo : styles.textInfo}>
              Confirmation email :
            </Text>
            <TextInput
              style={
                errorCMail ? styles.errorTextInputEmail : styles.textinputEmail
              }
              placeholderTextColor={'#c0c6ea'}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Confirmation Email"
              value={confirmemail}
              onChangeText={confirmemail => setConfirmemail(confirmemail)}
            />
            {errorCMail && (
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
                  style={[{fontSize: 10, color: 'red', paddingRight: '2%'}]}
                />
                <Text
                  style={{
                    color: 'red',
                    fontSize: 13,
                    paddingTop: '2%',
                    paddingBottom: '2%',
                  }}>
                  {manageError(variable)}
                </Text>
              </View>
            )}
          </View>
          <View style={{height: 'auto', width: '90%'}}>
            <Text
              style={errorPassword ? styles.errorTextInfo : styles.textInfo}>
              Mot de passe :
            </Text>
            <View style={[{flexDirection: 'row'}]}>
              <TextInput
                style={
                  errorPassword
                    ? styles.errorTextInputPassword
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
                style={[Styles.center, {paddingLeft: 10}]}
                onPress={() => setsecure(!secure)}>
                <Icon
                  type="FontAwesome"
                  name={secure ? 'eye' : 'eye-slash'}
                  style={(Styles.icon, {fontSize: 15, color: '#d54133'})}
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
                  style={[{fontSize: 10, color: 'red', paddingRight: '2%'}]}
                />
                <Text
                  style={{
                    color: 'red',
                    fontSize: 13,
                    paddingTop: '2%',
                    paddingBottom: '2%',
                  }}>
                  {manageError(variable)}
                </Text>
              </View>
            )}
          </View>
          <View style={{height: 'auto', width: '90%'}}>
            <Text
              style={errorCPassword ? styles.errorTextInfo : styles.textInfo}>
              Confirmation du mot de passe :
            </Text>
            <View style={[{flexDirection: 'row'}]}>
              <TextInput
                style={
                  errorCPassword
                    ? styles.errorTextInputPassword
                    : styles.textinputPassword
                }
                placeholderTextColor={'#c0c6ea'}
                secureTextEntry={securebis}
                autoCorrect={false}
                placeholder="Confirmation mot de passe"
                contextMenuHidden={true}
                onChangeText={confirmpassword =>
                  setConfirmpassword(confirmpassword)
                }
              />
              <TouchableOpacity
                style={[Styles.center, {paddingLeft: 10}]}
                onPress={() => setsecurebis(!securebis)}>
                <Icon
                  type="FontAwesome"
                  name={securebis ? 'eye' : 'eye-slash'}
                  style={(Styles.icon, {fontSize: 15, color: '#d54133'})}
                />
              </TouchableOpacity>
            </View>
            {errorCPassword && (
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
                  style={[{fontSize: 10, color: 'red', paddingRight: '2%'}]}
                />
                <Text
                  style={{
                    color: 'red',
                    fontSize: 13,
                    paddingTop: '2%',
                    paddingBottom: '2%',
                  }}>
                  {manageError(variable)}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={[{height: '20%', paddingTop: '5%'}, Styles.center]}>
          <TouchableOpacity
            style={Styles.button}
            onPress={() =>
              checkLogin(email, password, confirmemail, confirmpassword)
            }>
            <Text style={{color: 'white'}}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
  errorTextInputEmail: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 1,
    color: 'black',
    width: '80%',
    height: 40,
    paddingLeft: 20,
  },
  errorTextInputPassword: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 1,
    color: 'black',
    width: '80%',
    height: 40,
    paddingLeft: 20,
  },
  errorTextInfo: {
    fontSize: 13,
    color: '#9E9E9E',
    paddingBottom: '2%',
    height: 'auto',
  },
});
