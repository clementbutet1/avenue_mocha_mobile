import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Icon } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import Styles from '../../Styles/StylesPrincipal';
import LoadingScreen from '../../Components/LoadingScreen';
import { getAllOldShop } from '../../API/GetShopList';
import moment from 'moment';
import { DisplayGoodCoffee } from '../../Components/DIsplayGoodCoffee';
import { getFacture } from '../../API/Facture';

const CommandSreen = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const onRefresh = async () => {
    getShopList().then(() => setRefreshing(false));
  };

  useEffect(() => {
    if (refreshing) {
      onRefresh();
    }
  }, [refreshing]);


  const getShopList = async () => {
    let res = await getAllOldShop();
    setData(res);
    setIsLoading(false);
  }

  useEffect(() => {
    getShopList();
  }, [navigation]);

  useEffect(() => {
    setIsLoading(true);
    getShopList();
  }, [isFocused]);

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          borderBottomColor: '#c0c6ea',
          borderBottomWidth: 0.5,
          paddingBottom: '2.5%',
          paddingTop: '2.5%',
          paddingLeft: '5%',
          flexDirection: 'row',
          height: 'auto'
        }}>
        <View style={{ width: '80%' }}>
          <Text style={{ color: 'rgba(123,124,124,255)' }}>
            Commande du {moment(item.createdAt).utc(true).format('DD/MM/YY')}
          </Text>
          <Text style={{ color: 'rgba(123,124,124,255)' }}>
            Prix total de la commande : {item.command.price} €
          </Text>
          <View style={{ height: 'auto' }}>
            {item.allCoffee.map((element, index) => {
              return (
                <View style={{ height: 'auto', padding: 10, flexDirection: 'row' }} key={index}>
                  <View style={{ height: 100, width: 100, marginRight: 20 }}>
                    {DisplayGoodCoffee(element.photo, element)}
                  </View>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                    <Text style={{ fontSize: 12 }}>{element.titre}</Text>
                    <Text style={{ fontSize: 10 }}>Quantité: {element.quantity} </Text>
                    <Text style={{ fontSize: 10 }}>Taille: {element.size}</Text>
                    <Text style={{ fontSize: 10 }}>Glaçons: {element.glass}</Text>
                    <Text style={{ fontSize: 10 }}>Crème: {element.cream}</Text>
                    <Text style={{ fontSize: 10 }}>Sucres:  {element.sugar}</Text>
                    <Text style={{ fontSize: 10 }}>Prix:  {element.price} €</Text>
                  </View>
                </View>
              )
            })
            }
          </View>
        </View>
        <TouchableOpacity style={[Styles.center, { width: '20%' }]} onPress={() => getFacture(item)}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Facture</Text>
          <Icon type="Feather" name="download" style={[Styles.iconprofil, { fontSize: 25 }]} />
        </TouchableOpacity>
      </View>
    );
  };

  if (!isLoading) {
    return (
      <SafeAreaView style={Styles.container}>
        <View style={{ flex: 1 }}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
              />
            }
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            extraData={selectedId}
            ListHeaderComponent={() =>
              data == '' ? (
                <View style={[Styles.center]}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'rgba(123,124,124,255)',
                      marginTop: '10%',
                    }}>
                    Pas de d'ancienne commande
                  </Text>
                </View>
              ) : null
            }
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return <LoadingScreen />;
  }
};

export default CommandSreen;
