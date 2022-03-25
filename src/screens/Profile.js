import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, IconArrowLeftWhite, images} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';


const Profile = ({navigation}) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getStorage();
    });
    return unsubscribe;
  }, [navigation]);
  
  const getStorage = async () => {
    let user = await AsyncStorage.getItem('userData');
    user = JSON.parse(user)
    setUsers(user)
  }
  // console.log(users)

  const clearStorage = async () => {
    await AsyncStorage.removeItem('userData')
    setUsers([])
    navigation.navigate('Login')
    console.log('storage clear')
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.main}>
        <View
          style={{
            width: '100%',
            height: 150,
            alignItems: 'flex-start',
            backgroundColor: COLORS.primary,
            justifyContent: 'flex-start',
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingTop: 20,
          }}>
          <TouchableOpacity
            style={{alignItems: 'flex-end'}}
            onPress={() => {
              navigation.goBack('Home');
            }}>
            <IconArrowLeftWhite />
          </TouchableOpacity>
          <Text style={styles.title}>User Profile</Text>
        </View>
        <View style={styles.detail}>
          <View
            style={{
              backgroundColor: COLORS.gray1,
              borderRadius: 20,
              minHeight: 120,
              marginTop: -100,
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
              width: '60%',
            }}>
            <Image
              source={images.LogoWhite}
              style={{width: 100, height: 100}}></Image>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.text}>Full Name</Text>
            <Text style={styles.text2}>{users.namaUser}</Text>
            <Text style={styles.text}>Email</Text>
            <Text style={styles.text2}>{users.emailUser}</Text>
            <Text style={styles.text}>Phone Number</Text>
            <Text style={styles.text2}>{users.noHpUser}</Text>
            <Text style={styles.text}>Main Address</Text>
            <Text style={styles.text2}>{users.alamatUser}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('History')}}>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 18,
                color: COLORS.white,
              }}>
              Order History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Edit')}}>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 18,
                color: COLORS.white,
              }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {clearStorage()}}>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 18,
                color: COLORS.white,
              }}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary,
    position: 'relative',
  },
  detail: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontFamily: 'Montserrat-Black',
    fontSize: 24,
    color: COLORS.white,
    marginLeft: 66,
  },
  form: {
    width: '100%',
    marginHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 10,
  },
  textBox: {
    backgroundColor: COLORS.gray2,
    borderRadius: 20,
    minHeight: 20,
    width: '100%',
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 1,
    lineHeight: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  text2: {
    fontSize: 15,
    color: COLORS.black,
    fontFamily: 'Montserrat-Light',
    letterSpacing: 1,
    lineHeight: 20,
    marginHorizontal: 20,
  },
  input: {
    fontSize: 14,
    color: COLORS.black,
    backgroundColor: COLORS.gray1,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 1,
    opacity: 0.7,
    lineHeight: 20,
    maxWidth: '85%',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  button: {
    height: 40,
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textMini: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily: 'Montserrat-Regular',
    letterSpacing: 1,
    lineHeight: 20,
    maxWidth: '85%',
    marginTop: 10,
  },
  textLink: {
    fontSize: 12,
    color: COLORS.blue,
    fontFamily: 'Montserrat-Regular',
    letterSpacing: 1,
    lineHeight: 20,
    marginTop: 10,
  },
});
