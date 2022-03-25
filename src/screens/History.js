import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  COLORS,
  IconArrowLeft,
  IconCart,
  IconDelete,
  IconMinus,
  IconPlus,
} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Items} from '../constants/dbProduct';

const History = ({navigation}) => {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });
    return unsubscribe;
  }, [navigation]);

  //get data by product ID
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItem');
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      Items.forEach(data => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct(false);
      getTotal(false);
    }
  };

  const getTotal = productData => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let hargaProduk = productData[index].harga;
      total = total + hargaProduk;
    }
    setTotal(total);
  };

  //remove data from Cart

  const deleteCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItem');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] == id) {
          array.splice(index, 1);
        }

        await AsyncStorage.setItem('cartItem', JSON.stringify(array));
        getDataFromDB();
      }
    }
  };

  const renderProduct = (data, index) => {
    return (
      <View style={{paddingHorizontal: 20}} key={index}>
        <TouchableOpacity
          style={styles.itemBox}
          onPress={() =>
            navigation.navigate('ProductDetail', {productID: data.id})
          }>
          <View style={styles.imageBox}>
            <Image source={data.gambarProduk} style={styles.image} />
          </View>
          <View style={styles.descBox}>
            <View style={{height: 80}}>
              <Text style={styles.textName}>{data.namaProduk}</Text>
              <Text style={styles.textPrize}>IDR {data.harga}</Text>
            </View>
            <View style={styles.iconBox}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 15,
                  color: COLORS.black,
                }}>
                Qty : 1 pcs
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack('Home');
            }}>
            <IconArrowLeft />
          </TouchableOpacity>
          <Text style={styles.title}>History Order</Text>
        </View>
        <View style={{minHeight: 490,}}>{product ? product.map(renderProduct) : null}</View>
      </ScrollView>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    // paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Montserrat-Black',
    fontSize: 24,
    marginHorizontal: 55,
    color: COLORS.black,
    textAlign: 'center',
  },
  itemBox: {
    width: '100%',
    height: 165,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: COLORS.gray1,
    borderRadius: 20,
  },
  imageBox: {
    width: '40%',
    height: 165,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  descBox: {
    width: '60%',
    height: 165,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: COLORS.gray1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  textName: {
    color: COLORS.black,
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    textAlign: 'left',
    paddingHorizontal: 10,
    marginTop: 15,
  },
  textPrize: {
    color: COLORS.black,
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    paddingHorizontal: 10,
  },
  iconBox: {
    width: '100%',
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 10,
  },
  footer: {
    width: '100%',
    bottom: 0,
    backgroundColor: COLORS.gray1,
    justifyContent: 'flex-start',
    alignContent:'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    marginVertical: 20,
  },
  button: {
    height: 50,
    width: '84%',
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 26,
    marginHorizontal: 25,
  },
  totalText: {
    color: COLORS.black,
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
    textAlign: 'left',
    paddingHorizontal: 10,
    margin: 15,
    marginHorizontal: 25,
  },
});
