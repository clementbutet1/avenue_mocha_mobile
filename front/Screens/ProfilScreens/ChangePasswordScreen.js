import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Icon} from 'native-base';
import Styles from '../../Styles/StylesPrincipal';
import Police from '../../Styles/StylePolice';
import {manageError} from '../../Utils/manageError';
import { updatePassword } from '../../API/Authentification';
import { nativeViewProps } from 'react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler';

export default function ChangePasswordScreen({navigation}) {
  const [variable, setVariable] = useState(0);
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [secureold, setSecureOld] = useState(true);
  const [securepass, setSecurePass] = useState(true);
  const [secureconf, setSecureConf] = useState(true);

  useEffect(() => {
    manageError();
  }, [variable]);

  const check_pass = async (password, confirmationPassword) => {
    setVariable(0);
    if (password === '' || confirmationPassword === '') {
      setVariable(15);
    } else if (password !== confirmationPassword) {
      setVariable(2);
    } else {
      let res = await updatePassword(password);
      if (res == 205)
        return;
      navigation.goBack();
      setVariable(0);
    }
  };

  return (
      <SafeAreaView style={Styles.container}>
        <View style={Styles.container}>
          <View style={[{height: '30%', paddingTop: '5%'}, Styles.center]}>
            <View
              style={{
                height: 75,
                width: 75,
                borderRadius: 75,
                borderColor: 'gray',
                borderWidth: 5,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Icon
                type="FontAwesome"
                name="lock"
                style={[Styles.icon, {color: 'gray', fontSize: 50}]}
              />
            </View>
            <Text
              style={
                (Police.mediumtitre,
                {
                  textAlign: 'center',
                  fontSize: 20,
                  color: '#462e01',
                  paddingTop: 14,
                })
              }>
              Changer de mot de passe:
            </Text>
          </View>
          <View style={{paddingLeft: '10%'}}>
            <Text style={styles.text}>Nouveau mot de passe :</Text>
            <View style={[{flexDirection: 'row'}]}>
              <TextInput
                style={styles.textinput}
                placeholderTextColor={'#c0c6ea'}
                secureTextEntry={securepass}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Nouveau mot de passe"
                onChangeText={password => setPassword(password)}
              />
              <TouchableOpacity
                style={[Styles.center, {paddingLeft: 10}]}
                onPress={() => setSecurePass(!securepass)}>
                <Icon
                  type="FontAwesome"
                  name={securepass ? 'eye' : 'eye-slash'}
                  style={(Styles.icon, {fontSize: 15, color: '#462e01'})}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{paddingLeft: '10%'}}>
            <Text style={styles.text}>Confirmation nouveau mot de passe :</Text>
            <View style={[{flexDirection: 'row'}]}>
              <TextInput
                style={styles.textinput}
                placeholderTextColor={'#c0c6ea'}
                secureTextEntry={secureconf}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Confirmation nouveau mot de passe"
                onChangeText={confirmationPassword =>
                  setConfirmationPassword(confirmationPassword)
                }
              />
              <TouchableOpacity
                style={[Styles.center, {paddingLeft: 10}]}
                onPress={() => setSecureConf(!secureconf)}>
                <Icon
                  type="FontAwesome"
                  name={secureconf ? 'eye' : 'eye-slash'}
                  style={(Styles.icon, {fontSize: 15, color: '#462e01'})}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={(Styles.center, {width: '100%', paddingTop: '5%'})}>
            <View style={Styles.center}>
              <Text
                style={[
                  Styles.center,
                  {color: 'red', fontSize: 14, fontWeight: 'bold'},
                ]}>
                {manageError(variable)}
              </Text>
            </View>
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
                check_pass(password, confirmationPassword)
              }>
              <Text style={{color: 'white'}}>Modifier</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  );
}

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
    width: '80%',
    height: 40,
    paddingLeft: 20,
  },
});
