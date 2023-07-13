/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, createRef, useRef } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { ListItem, Body, Right, Left, Icon } from 'native-base';
import { observer } from 'mobx-react-lite';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import Styles from '../../Styles/StylesPrincipal';
import url from '../../config/env';
import { getUserData } from '../../API/Authentification';
import { updateUserPhoto } from '../../API/Authentification';

const ProfilScreen = observer(({ navigation }) => {
  const actionSheetRef = createRef();
  const [lastname, setLastName] = useState();
  const [firstname, setFirstName] = useState();
  const [newPhoto, setNewPhoto] = useState('');
  const [avatar, setAvatar] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const refRBSheet = useRef();

  const getUserInfo = async () => {
    let res = await getUserData();
    setFirstName(res[0].firstname);
    setLastName(res[0].lastname);
    setNewPhoto(res[0].profilepic);
    setProfileImage(`${url.ENV_URL}` + '/uploads/images/' + res[0].profilepic);
  }

  const updateProfilPic = async (photo) => {
    actionSheetRef.current?.setModalVisible(false);
    let res = await updateUserPhoto(photo);
    actionSheetRef.current?.setModalVisible(false);
    if (res == 205)
      return;
  }

  useEffect(() => {
    getUserInfo();
  }, [navigation]);


  const onButtonPress = useCallback(type => {
    let optionsImage = {
      title: 'Select Image',
      type: 'library',
      options: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: true,
      },
    };
    let optionsCapture = {
      title: 'Take Image',
      type: 'capture',
      options: {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: true,
      },
    };
    if (type === 'camera') {
      launchCamera(optionsCapture, response => {
        if (response) {
          if (response.assets) {
            if (response.assets[0]) {
              setProfileImage(response.assets[0].uri);
              updateProfilPic(response.assets[0]);
            }
          }
        }
      });
    } else {
      launchImageLibrary(optionsImage, response => {
        if (response) {
          if (response.assets) {
            if (response.assets[0]) {
              setProfileImage(response.assets[0].uri);
              updateProfilPic(response.assets[0]);
            }
          }
        }
      });
    }
  }, []);

  return (
    <SafeAreaView style={Styles.container}>
      <View
        style={[
          Styles.center,
          {
            paddingLeft: '5%',
            height: '15%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '70%',
          },
        ]}>
        <View>
          <TouchableOpacity
            style={styles.uploadBtnContainer}
            onPress={() => refRBSheet.current.open()}>
            {(profileImage && (profileImage !== `${url.ENV_URL}` + '/uploads/images/')) ? (
              <Image
                source={{ uri: profileImage || null }}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <Icon
              type="FontAwesome"
              name="user"
              style={[{ color: 'grey', fontSize: 40 }]}
            />
            )}
          </TouchableOpacity>
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={250}>
          <View style={{ flex: 1, padding: 25 }}>
            <Text style={{ fontSize: 16, marginBottom: 20, color: '#666' }}>
              Sélectionnez une photo
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}
              onPress={() => onButtonPress('camera')}>
              <Icon
                type="MaterialIcons"
                name="camera-alt"
                style={{
                  fontSize: 25,
                  color: '#666',
                  width: 60,
                }}
              />
              <Text style={{ fontSize: 15 }}>Appareil Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}
              onPress={() => onButtonPress('Library')}>
              <Icon
                type="MaterialIcons"
                name="photo-camera-back"
                style={{
                  fontSize: 25,
                  color: '#666',
                  width: 60,
                }}
              />
              <Text style={{ fontSize: 15 }}>Bibliothèque</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
        <View>
          <Text style={{ paddingBottom: '2%', fontSize: 16, fontWeight: 'bold' }}>
            {firstname} {lastname}{' '}
          </Text>
        </View>
      </View>
      <ListItem icon onPress={() => navigation.navigate('Identity')}>
        <Left>
          <View
            style={[
              Styles.center,
              {
                backgroundColor: 'rgba(234,244,242,255)',
                height: 30,
                width: 30,
                borderRadius: 30,
              },
            ]}>
            <Icon
              type="FontAwesome"
              name="user"
              style={[
                Styles.iconprofil,
                { paddingLeft: '15%', color: '#25bba4' },
              ]}
            />
          </View>
        </Left>
        <Body>
          <Text style={{ fontSize: 15 }}>Identité et Coordonnées</Text>
        </Body>
        <Right>
          <Icon
            type="FontAwesome"
            name="angle-right"
            style={Styles.iconprofil}
          />
        </Right>
      </ListItem>
      <ListItem icon onPress={() => navigation.navigate('ModifyPass')}>
            <Left>
              <Icon
                type="FontAwesome"
                name="key"
                style={
                  (Styles.iconprofil,
                  {paddingLeft: '8.5%', color: 'grey', fontSize: 20})
                }
              />
            </Left>
            <Body>
              <Text style={{fontSize: 15}}>Changer son mot de passe</Text>
            </Body>
            <Right>
              <Icon
                type="FontAwesome"
                name="angle-right"
                style={Styles.iconprofil}
              />
            </Right>
          </ListItem>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },
  options: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  uploadBtnContainer: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    overflow: 'hidden',
    borderColor: '#E1E2E6',
  },
  uploadBtn: {
    textAlign: 'center',
    fontSize: 20,
    opacity: 0.3,
    fontWeight: 'bold',
  },
});

export default ProfilScreen;
