import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, IconArrowLeftWhite, IconCart} from '../constants';
// import {Items} from '../constants/dbProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getDatabase, ref, child, get} from 'firebase/database';

const ProductDetail = ({route, navigation}) => {
  const {productID} = route.params;
  const [product, setProduct] = useState({});
  const [items, setItems] = useState({});

  const width = Dimensions.get('window').width;
  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getProductByID();
  }, [items]);

  //getDataFromAsyncStorage
  const getData = async () => {
    console.log('get jalan');
    let barang = await AsyncStorage.getItem('itemsData');
    barang = JSON.parse(barang);
    setItems(barang);
  };

  //get data by product ID
  const getProductByID = async () => {
    for (let index = 0; index < items.length; index++) {
      if (items[index].id == productID) {
        await setProduct(items[index]);
        return;
      }
      // console.log(items)
    }
  };

  //add to cart
  const addToCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItem');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItem', JSON.stringify(array));
        ToastAndroid.show(
          'Product added successfully to cart.',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItem', JSON.stringify(array));
        ToastAndroid.show(
          'Product added successfully to cart.',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    }
  };

  //slide product image
  const renderProduct = ({item, index}) => {
    return (
      <View
        style={{
          width: width,
          height: 330,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: item}}
          style={{
            top: -15,
            width: '85%',
            height: '85%',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.head2}>
            <TouchableOpacity
              onPress={() => navigation.goBack('Home')}
              style={styles.boxTouch}>
              <IconArrowLeftWhite />
            </TouchableOpacity>
          </View>
          <FlatList
            data={product.listGambar ? product.listGambar : null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
          />
          <View style={styles.desc}>
            {product.listGambar
              ? product.listGambar.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        top: -15,
                        width: '5%',
                        height: 5,
                        backgroundColor: COLORS.gray1,
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                      }}></Animated.View>
                  );
                })
              : null}
          </View>
        </View>
        <View style={styles.detail}>
          <View>
            <Text style={styles.namaProduk}>{product.namaProduk}</Text>
            <Text style={styles.harga}>IDR {product.harga}</Text>
          </View>
          <View style={{}}>
            <Text style={styles.text}>.</Text>
            <Text style={styles.text}>Size : {product.size}</Text>
            <Text style={styles.text}>Panjang : {product.panjang}</Text>
            <Text style={styles.text}>Lebar : {product.lebar}</Text>
            <Text style={styles.text}>.</Text>
            <Text style={styles.textDeskripsi}>{product.deskripsi}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => addToCart(product.id)}>
            <IconCart />
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 18,
                color: COLORS.white,
              }}>
              {' '}
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.black,
    position: 'relative',
  },
  header: {
    width: '100%',
    backgroundColor: COLORS.black,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  head2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 20,
  },
  boxTouch: {
    width: 30,
    height: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: COLORS.black,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detail: {
    width: '100%',
    bottom: 0,
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
  },
  namaProduk: {
    color: COLORS.black,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 26,
    marginHorizontal: 20,
    marginTop: 20,
    height: 60,
    letterSpacing: 0.5,
    paddingHorizontal: 5,
    maxWidth: '84%',
  },
  harga: {
    color: COLORS.black,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    marginTop: 5,
    marginHorizontal: 20,
    // height: 35,
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 14,
    color: COLORS.black,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 1,
    opacity: 0.7,
    lineHeight: 20,
    maxWidth: '85%',
    maxHeight: 55,
    paddingHorizontal: 5,
    marginHorizontal: 20,
  },
  textDeskripsi: {
    fontSize: 14,
    color: COLORS.black,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 1,
    opacity: 0.7,
    lineHeight: 20,
    maxWidth: '85%',
    height: 55,
    paddingHorizontal: 5,
    marginHorizontal: 20,
    // marginTop: 20,
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
    marginVertical: 26,
    marginHorizontal: 25,
  },
});
