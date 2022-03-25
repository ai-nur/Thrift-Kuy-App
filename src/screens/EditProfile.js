import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, images} from '../constants';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set, update} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({navigation}) => {
  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [uid, setUid] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    getStorage();
    return unsubscribe;
  }, [navigation]);

  const getStorage = async () => {
    let user = await AsyncStorage.getItem('userData');
    user = JSON.parse(user);
    setFullName(user.namaUser);
    setAddress(user.alamatUser);
    setEmail(user.emailUser);
    setPhoneNumber(user.noHpUser);
    setUid(user.uid);
  };
  // console.log(users)

  const saveUserBaru = (uid, fullName, address, email, phoneNumber) => {
    if (fullName && address && email && phoneNumber) {
      const db = getDatabase();
      // A post entry.
      const postData = {
        uid: uid,
        namaUser: fullName,
        alamatUser: address,
        emailUser: email,
        noHpUser: phoneNumber,
      };
      const updates = {};
      updates['/users/' + uid] = postData;

      // console.log(postData)

      // Get a key for a new Post.
      // const newPostKey = push(child(ref(db), 'posts')).key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      // updates['/posts/' + newPostKey] = postData;

      update(ref(db), updates);
      
      // sukses
      const storeData = async postData => {
        try {
          const jsonValue = JSON.stringify(postData);
          await AsyncStorage.setItem('userData', jsonValue);
        } catch (e) {
          // saving error
        }
      };

      ToastAndroid.show('Login successfully.', ToastAndroid.SHORT);
      storeData(postData);

      navigation.navigate('Nav');
    } else {
      ToastAndroid.show('All input must be filled.', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.main}>
        <View
          style={{
            width: '100%',
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image style={{width: 150, height: 150}} source={images.LogoWhite} />
        </View>
        <View style={styles.detail}>
          <Text style={styles.title}>Edit Profile</Text>
          <View style={styles.form}>
            <Text style={styles.text}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={fullName => {
                setFullName(fullName);
              }}
            />
            <Text style={styles.text}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={address => {
                setAddress(address);
              }}
            />
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={email => {
                setEmail(email);
              }}
            />
            <Text style={styles.text}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={phoneNumber => {
                setPhoneNumber(phoneNumber);
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              saveUserBaru(uid, fullName, address, email, phoneNumber)
            }>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 18,
                color: COLORS.white,
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

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
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Montserrat-Black',
    fontSize: 24,
    marginHorizontal: 85,
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 20,
  },
  form: {
    width: '84%',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 1,
    lineHeight: 20,
    maxWidth: '85%',
    marginHorizontal: 20,
    marginTop: 8,
  },
  input: {
    fontSize: 14,
    height: 40,
    color: COLORS.black,
    backgroundColor: COLORS.gray1,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 1,
    opacity: 0.7,
    // lineHeight: 20,
    maxWidth: '85%',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 5,
  },
  button: {
    height: 50,
    width: '73%',
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 60,
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
