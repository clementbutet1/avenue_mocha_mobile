import * as React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';


const Styles = StyleSheet.create({
  headerShift: {
    backgroundColor: '#462e01',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  textinput: {
    borderWidth: 1,
    borderColor: '#462e01',
    borderRadius: 1,
    width: '80%',
    height: 40,
    paddingLeft: 20,
  },
  case: {
    borderBottomWidth: 1,
    borderColor: "#462e01",
    height: 300,
    paddingTop: "2%",
  },
  button: {
    borderWidth: 1,
    borderColor: '#462e01',
    backgroundColor: '#462e01',
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    width: '70%',
    height: 40,
  },
  buttonDispo: {
    borderWidth: 1,
    borderColor: '#462e01',
    backgroundColor: '#462e01',
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    width: 190,
    height: 40,
  },
  buttonoffer: {
    borderWidth: 1,
    borderColor: '#462e01',
    backgroundColor: '#462e01',
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: '70%',
    height: 40,
  },
  center: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    color: "white"
  },
  iconprofil: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: "gray"
  },
  touchZone: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  }
});

export default Styles;
