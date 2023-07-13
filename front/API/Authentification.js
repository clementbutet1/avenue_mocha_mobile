import url from '../config/env';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
    const tokenStorage = await AsyncStorage.getItem('uniqueId');
    return (tokenStorage);
}

export const getHeader = async () => {
    let token = await getToken();
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };
    return (headers);
}

export const LoginApi = async (email, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = {
        "email": email,
        "password": password,
    };

    let res = await axios.post(`${url.ENV_URL}/api/user/login`, raw, myHeaders);
    if (res.data.error === "User not found")
        return (203);
    if (res.data.error === "Password incorrect")
        return (202);
    if (res.data.message === "Auth successful")
        return (res.data);
    else
        return (205);;
};

export const LoginApiGoogle = async (email, token) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = {
        "email": email,
        "tokenGoogle": token,
    };
    let res = await axios.post(`${url.ENV_URL}/api/user/logingoogle`, raw, myHeaders);
    if (res.data.error === "User not found Google")
        return (203);
    if (res.data.message === "Auth successful")
        return (res.data);
    else
        return (205);

};

export const CreateAccountApi = async (password, firstname, lastname, email, navigation, phone) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = {
        "email": email,
        "password": password,
        "firstname": firstname,
        "lastname": lastname,
        "phone": phone
    };

    let res = await axios.post(`${url.ENV_URL}/api/user/create`, raw, myHeaders);
    if (res.data.error === "The user already exist")
        return (203);
    if (res.data.message === "Problem with password")
        return (202);
    if (res.data.message === "User created")
        return (200);
    else
        return (205);
}

export const CreateAccountApiGoogle = async (firstname, lastname, email, token) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = {
        "email": email,
        "firstname": firstname,
        "lastname": lastname,
        "tokenGoogle": token
    };

    let res = await axios.post(`${url.ENV_URL}/api/user/creategoogle`, raw, myHeaders);
    if (res.data.error === "The user already exist")
        return (LoginApiGoogle(email, token));
    if (res.data.message === "User created")
        return (LoginApiGoogle(email, token));
    else
        return (205);
}

export const signInGoogleApi = async () => {
    await GoogleSignin.configure({
        iosClientId: '634455021091-ot9fhgds1gbssjjb4chffnqren4421ae.apps.googleusercontent.com',
        webClientId: '634455021091-p616sg338s55kcr8nk72q8c41m2iool8.apps.googleusercontent.com',
        androidClientid: '634455021091-p616sg338s55kcr8nk72q8c41m2iool8.apps.googleusercontent.com',
    });
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        return userInfo;
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            alert('Cancel');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            alert('Signin in progress');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            alert('PLAY_SERVICES_NOT_AVAILABLE');
        }
    }
};

export const getUserData = async () => {
    let token = await getToken();
    if (token != null) {
        var decodedHeader = jwt_decode(token, {
            header: false,
            data: true,
        });
    }
    let res = await axios.get(`${url.ENV_URL}/api/user/info/${decodedHeader.userId}`, {headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      }});
    if (res.data)
        return (res.data);
    else
        return (205);
}

export const updateUserData = async (email, firstname, lastname, phone) => {
    let token = await getToken();
    if (token != null) {
        var decodedHeader = jwt_decode(token, {
            header: false,
            data: true,
        });
    }
    var raw = {
        "email": email,
        "firstname": firstname,
        "lastname": lastname,
        "phone": phone
    };
    let res = await axios.put(`${url.ENV_URL}/api/user/info/${decodedHeader.userId}`, raw, {headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }});
    if (res.data)
        return (res.data);
    else
        return (205);
}

export const updatePassword = async (password) => {
    let token = await getToken();
    if (token != null) {
        var decodedHeader = jwt_decode(token, {
            header: false,
            data: true,
        });
    }
    var raw = {
        "password": password,
    };
    let res = await axios.put(`${url.ENV_URL}/api/user/updatepass/${decodedHeader.userId}`, raw, { headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }});
    if (res.data)
        return (res.data);
    else
        return (205);
}

export const updateUserPhoto = async (photo) => {
    let token = await getToken();
    if (token != null) {
        var decodedHeader = jwt_decode(token, {
            header: false,
            data: true,
        });
    }
    const profilepic = new FormData();
    profilepic.append('profilepic', {
        uri: photo.uri,
        type: photo.type,
        name: photo.fileName,
    });
    let res = await axios.put(`${url.ENV_URL}/api/user/updateprofilepic/${decodedHeader.userId}`, profilepic, {headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      }});
    if (res.data.message == "message")
        return (res.data);
    else
        return (205);
};