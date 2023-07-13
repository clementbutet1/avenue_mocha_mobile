import url from '../config/env';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import { getToken } from './Authentification';

export const getCoffeeAll = async () => {
    let token = await getToken();
    let res = await axios.get(`${url.ENV_URL}/api/coffees`, {headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      }});
    if (res.data)
        return (res.data);
    else
        return (205);
}

export const AddCoffeCommand = async (commandId, coffeeId, quantity, temperature, size, glass, cream, sugar) => {
    let token = await getToken();
    if (token != null) {
        var decodedHeader = jwt_decode(token, {
            header: false,
            data: true,
        });
    }
    let raw = {
        userId: decodedHeader.userId,
        commandId: commandId,
        coffeeId: coffeeId,
        quantity: parseInt(quantity),
        temperature: temperature,
        size: size,
        glass: glass,
        cream: cream,
        sugar: sugar,
    }
    let res = await axios.post(`${url.ENV_URL}/api/coffeecommands/create`, raw, {headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }});
    if (res.data.message == "Coffee command created")
      return 201;
    else
      return 205;
}

export const RemoveCoffeCommand = async (coffeeId) => {
  let token = await getToken();
  let res = await axios.delete(`${url.ENV_URL}/api/coffeecommands/rm/${coffeeId}`, {headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    }});
  if (res.data.message == "CoffeeCommand been deleted")
    return 201;
  else
    return 205;
}