import {ImageBackground, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '../constants';
import {getDatabase, ref, onValue} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FIREBASE from '../constants/appFirebase';

const Splash = ({navigation}) => {
  useEffect(() => {
    getData();
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, [navigation]);

  const getData = () => {
    console.log('get jalan');

    const db = getDatabase();
    const itemData = ref(db, 'items');
    onValue(itemData, snapshot => {
      const produkData = snapshot.val();
      storeData(produkData);
    });
  };

  const storeData = async produkData => {
    try {
      await AsyncStorage.setItem('itemsData', JSON.stringify(produkData));
    } catch (e) {}
    let userArray = await AsyncStorage.getItem('itemsData');
    // console.log(userArray);
  };

  return (
    <ImageBackground source={images.SplashBg} style={styles.background}>
      <Image source={images.Logo} style={styles.logo} />
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
});
