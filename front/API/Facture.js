import url from '../config/env';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import { getToken } from './Authentification';
import { Linking } from 'react-native';
import moment from 'moment';

const getGoodInfo = async (item) => {
    let tab = [];
    for (let i = 0; i < item.allCoffee.length; i++) {
        let obj = { "name": item.allCoffee[i].titre, "tax":23, "total_price_gross":parseInt(item.allCoffee[i].price), "quantity": parseInt(item.allCoffee[i].quantity) };
        tab.push(obj);
    }
    return tab;
};

export const getFacture = async (item) => {
    let token = await getToken();
    if (token != null)
    var decodedHeader = jwt_decode(token, { header: false, data: true});
    let name = decodedHeader.firstname + ' ' + decodedHeader.lastname;
    let product = await getGoodInfo(item);
    let json_params = {
        "api_token": "w0CRZ5sHwOOP1YcDKCBJ",
        "invoice": {
            "kind":"vat",
            "number": null,
            "sell_date": moment(item.command.createdAt).utc(true).format('YYYY/MM/DD'),
            "issue_date": moment(item.command.createdAt).utc(true).format('YYYY/MM/DD'),
            "payment_to": moment(item.command.createdAt).utc(true).format('YYYY/MM/DD'),
            "buyer_name": name,
            "buyer_tax_no": "0000000",
            "positions": product
        }}

        let res = await axios.post('https://clementbutet20.vosfactures.fr/invoices.json', json_params, {headers: {
            Accept: 'application/json',
            
          }});
    Linking.openURL(`https://clementbutet20.vosfactures.fr/invoices/${res.data.id}.pdf?api_token=w0CRZ5sHwOOP1YcDKCBJ`)

    
};