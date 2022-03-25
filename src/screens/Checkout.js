import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, IconArrowLeft, IconDelete} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Items} from '../constants/dbProduct';
import { async } from '@firebase/util';

const Checkout = ({navigation}) => {
  const [product, setProduct] = useState();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
      dataUser();
    });
    return unsubscribe;
  }, [navigation]);

  //get Data User
  const dataUser = async () => {
    let user = await AsyncStorage.getItem('userData');
    user = JSON.parse(user)
    setUsers(user)
  }
  // console.log(users)

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

  const check = async () => {
    if (total !== 0) {
      Alert.alert( "Success!", 
        "Your order will be processed immediately after you complete the bank transfer.",
      )
      await AsyncStorage.removeItem('cartItem')
      // await AsyncStorage.setItem('itemHistory', )
      navigation.navigate('Home')
    }
  }

  const renderProduct = (data, index) => {
    return (
      <View key={index}>
        <TouchableOpacity
          style={styles.itemBox}
          onPress={() =>
            navigation.navigate('ProductDetail', {productID: data.id})
          }>
          <View style={styles.imageBox}>
            <Image source={data.gambarProduk} style={styles.image} />
          </View>
          <View>
            <View style={styles.descBox}>
              <Text style={styles.textName}>{data.namaProduk}</Text>
              {/* <Text style={styles.textName}></Text> */}
            </View>
            <View style={styles.prizeBox}>
              <Text style={styles.textPrize}>IDR {data.harga}</Text>
              <Text style={styles.textPrize}>Qty : 1 pcs</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
        <View style={{minHeight: 535}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack('Home');
              }}>
              <IconArrowLeft />
            </TouchableOpacity>
            <Text style={styles.mainTitle}>Checkout</Text>
          </View>
          {/* alamat */}
          <View style={{paddingHorizontal: 20}}>
            <View style={styles.subtitle}>
              <Text style={styles.title}>Shipping Address</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <Text style={styles.descText}>{users.namaUser}</Text>
              <Text style={styles.descText}>
                {users.alamatUser}
              </Text>
            </View>
          </View>
          {/* metode kirim */}
          <View style={{paddingHorizontal: 20}}>
            <View style={styles.subtitle}>
              <Text style={styles.title}>Shipping Method</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.descText}>Standard - Free Shipping Cost</Text>
              {/* <Text style={styles.descText}>Express - IDR 10.000</Text> */}
            </View>
          </View>
          {/* pembayaran */}
          <View style={{paddingHorizontal: 20}}>
            <View style={styles.subtitle}>
              <Text style={styles.title}>Payment Method</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.descText}>Direct Transfer Bank</Text>
              <Text style={styles.descText}>Bank: BNI</Text>
              <Text style={styles.descText}>Account Number : 1134967852</Text>
              <Text style={styles.descText}>Account name : Thrift Kuy</Text>
            </View>
          </View>

          <View style={{paddingHorizontal: 20, paddingTop: 10}}>
            <Text style={styles.title}>Product</Text>

            {product ? product.map(renderProduct) : null}
          </View>
        </View>
        <View style={styles.footer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}>
            <Text style={styles.descText}>SubTotal Product</Text>
            <Text style={styles.descText}>IDR {total}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}>
            <Text style={styles.descText}>SubTotal Shipment Cost</Text>
            <Text style={styles.descText}>Free</Text>
          </View>
          <View style={{backgroundColor: COLORS.black, height: 2}}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}>
            <Text style={styles.descText}>Total Payment</Text>
            <Text style={styles.descText}>IDR {total}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => check()}>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 18,
                color: COLORS.white,
              }}>
              {' '}
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    paddingTop: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  mainTitle: {
    fontFamily: 'Montserrat-Black',
    fontSize: 24,
    marginHorizontal: 85,
    color: COLORS.black,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 20,
    color: COLORS.black,
  },
  subtitle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  seeAll: {
    color: COLORS.blue,
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    paddingHorizontal: 5,
  },
  box: {
    width: '100%',
    minHeight: 40,
    marginTop: 6,
    opacity: 0.8,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.gray1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  descText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: COLORS.black,
  },
  itemBox: {
    width: '100%',
    minHeight: 80,
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
    backgroundColor: COLORS.gray1,
    borderRadius: 10,
  },
  imageBox: {
    width: '25%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 60,
  },
  descBox: {
    width: '75%',
    backgroundColor: COLORS.gray1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  prizeBox: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: COLORS.gray1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  textName: {
    color: COLORS.black,
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    minHeight: 40,
    textAlign: 'left',
    paddingLeft: 10,
  },
  textPrize: {
    color: COLORS.black,
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    paddingLeft: 10,
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
    minHeight: 100,
    bottom: 0,
    backgroundColor: COLORS.gray1,
    justifyContent: 'flex-end',
    alignContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalText: {
    color: COLORS.black,
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    textAlign: 'left',
    paddingHorizontal: 10,
    margin: 15,
  },
});
