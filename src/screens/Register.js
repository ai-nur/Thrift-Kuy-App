import {
  Alert,
  Image,
  ImageBackground,
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
import {getDatabase, ref, set} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({navigation}) => {
  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [users, setUsers] = useState({
    namaUser: '',
    alamatUser: '',
    emailUser: '',
    noHpUser: '',
    passwordUser: '',
  });

  useEffect(() => {
    setUsers({
      namaUser: fullName,
      alamatUser: address,
      emailUser: email,
      noHpUser: phoneNumber,
    });
  }, [fullName, address, email, phoneNumber, password]);

  const clearStorage = async () => {
    await AsyncStorage.removeItem('userData');
    console.log('storage clear');
  };


  const setUserBaru = () => {
    if (fullName && email && phoneNumber && password) {
      console.log(users);

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(success => {
          // tambah UID
          const user = success.user;
          // console.log(user)
          const dataBaru = {
            ...users,
            uid: success.user.uid,
          };
          // console.log(Object.values(dataBaru))
          //set Database
          const db = getDatabase();
          set(ref(db, 'users/' + success.user.uid), dataBaru);

          // sukses
          const storeData = async dataBaru => {
            try {
              const jsonValue = JSON.stringify(dataBaru);
              await AsyncStorage.setItem('userData', jsonValue);
            } catch (e) {
              // saving error
            }
          };
            setFullName('');
            setAddress('');
            setEmail('');
            setPhoneNumber('');
            setPassword('');

            // navigation.navigate('Nav')
            // let userArray = await AsyncStorage.getItem('userData');
            // console.log(userArray);
            ToastAndroid.show('Login successfully.', ToastAndroid.SHORT);
            navigation.navigate('Nav');
          storeData(dataBaru);
        })
        .catch(error => {
          // console.log(success.user);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Error!', errorMessage);
        });
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
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.form}>
            <Text style={styles.text}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={fullName => {
                setFullName(fullName);
              }}
              placeholder="Your Full Name"
            />
            <Text style={styles.text}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={address => {
                setAddress(address);
              }}
              placeholder="your shipment address"
            />
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={email => {
                setEmail(email);
              }}
              placeholder="youremail@example.com"
            />
            <Text style={styles.text}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={phoneNumber => {
                setPhoneNumber(phoneNumber);
              }}
              placeholder="08 XX XXXX"
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={password => {
                setPassword(password);
              }}
              secureTextEntry={true}
              placeholder="********"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              clearStorage();
            }}>
            <Text style={styles.textMini}>forgot password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setUserBaru()}>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 18,
                color: COLORS.white,
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textMini}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={styles.textLink}> Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

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
    marginTop: 20,
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
