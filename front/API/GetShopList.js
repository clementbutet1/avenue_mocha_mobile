import url from '../config/env';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import { getToken } from './Authentification';

export const CreateShopList = async () => {
    let token = await getToken();
    if (token != null) {
        var decodedHeader = jwt_decode(token, {
            header: false,
            data: true,
        });
    }
    var raw = {
        "userId": decodedHeader.userId,
    };
    let res = await axios.post(`${url.ENV_URL}/api/commands/create`, raw, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        }
    });
    if (res.data === "Shop Already Create")
        return (201);
    else if (res.data) {
        return (res.data);
    }
    else
        return (205);
}

export const getAllOldShop = async () => {
    let token = await getToken();
    if (token != null) {
        var decodedHeader = jwt_decode(token, {
            header: false,
            data: true,
        });
    }
    let res = await axios.get(`${url.ENV_URL}/api/commands/allold/${decodedHeader.userId}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        }
    });
    if (res.data === "Shop Already Create")
        return (201);
    else if (res.data) {
        return (res.data);
    }
    else
        return (205);
}

export const getActiveShop = async () => {
    let token = await getToken();
    if (token != null) {
        var decodedHeader = jwt_decode(token, {
            header: false,
            data: true,
        });
    }
    let res = await axios.get(`${url.ENV_URL}/api/commands/activeshop/${decodedHeader.userId}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        }
    });
    if (res.data) {
        return (res.data);
    }
    else
        return (205);
}

export const updateShop = async (id, price) => {
    let token = await getToken();
    if (token != null) {
        var decodedHeader = jwt_decode(token, {
            header: false,
            data: true,
        });
    }
    let raw = {
        "old": true,
        "price": price
    }
    let res = await axios.put(`${url.ENV_URL}/api/commands/update/${id}`, raw, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
    if (res.data.message == "Command good") {
        return (200);
    }
    else
        return (205);
}

export const GetShopWithCoffee = async () => {
    let token = await getToken();
    if (token != null) {
        var decodedHeader = jwt_decode(token, {
            header: false,
            data: true,
        });
    }
    let res = await axios.get(`${url.ENV_URL}/api/coffeecommands/shoplist/${decodedHeader.userId}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
    if (res.data.message == "Nothing") {
        return (200);
    } else if (res.data) {
        return (res.data);
    }
    else
        return (205);
}