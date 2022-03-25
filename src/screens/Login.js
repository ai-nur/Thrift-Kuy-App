import {
  Alert,
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
import {getDatabase, ref, onValue, child, get} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const Login = ({navigation}) => {
  const [users, setUsers] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    getDataUsers();
  }, []);

  const getDataUsers = () => {
    console.log('get jalan');

    const db = getDatabase();
    const data = ref(db, 'users');
    onValue(data, snapshot => {
      const usData = snapshot.val();
      let usersData = {...usData};
      setUsers(Object.values(usersData));
    });
  };
  // console.log(users);

  const signinUser = () => {
    if (email && password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
          // console.log(user)

          // Signed in
          let data = [...users];
          for (let index = 0; index < data.length; index++) {
            if (data[index].uid === user.uid) {
              const suksesLogin = data[index];
              // Store Data To asyncStorage
              const storeData = async suksesLogin => {
                try {
                  const jsonValue = JSON.stringify(suksesLogin);
                  await AsyncStorage.setItem('userData', jsonValue);
                  setEmail('');
                  setPassword('');
                } catch (e) {
                  // saving error
                }
                let userArray = await AsyncStorage.getItem('userData');
                console.log(userArray);
              };
              navigation.navigate('Nav');
              ToastAndroid.show('Login successfully.', ToastAndroid.SHORT);
              storeData(suksesLogin);
            }
          }

          // const suksesLogin = data.filter(
          //   usr => usr.emailUser === user.email && usr.uid === user.uid,
          // );
          // if (suksesLogin.length > 0) {

          // }
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          ToastAndroid.show('Email or Password incorrect.', ToastAndroid.SHORT);
        });
    } else {
      ToastAndroid.show(
        'Email or Password must be filled.',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.main}>
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
          <Text style={styles.title}>Sign In</Text>
          <View style={styles.form}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
              placeholder="example@kuythrift.com"
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
              secureTextEntry={true}
              placeholder="********"
            />
          </View>
          <Text style={styles.textMini}>forgot password</Text>
          <TouchableOpacity style={styles.button} onPress={() => signinUser()}>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 18,
                color: COLORS.white,
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textMini}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.replace('Register')}>
              <Text style={styles.textLink}> Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

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
  },
  title: {
    fontFamily: 'Montserrat-Black',
    fontSize: 24,
    marginHorizontal: 85,
    color: COLORS.black,
    textAlign: 'center',
    margin: 20,
  },
  form: {
    width: '84%',
    marginHorizontal: 20,
    paddingBottom: 20,
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
    marginTop: 10,
  },
  input: {
    fontSize: 14,
    height: 40,
    color: COLORS.black,
    backgroundColor: COLORS.gray1,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 1,
    opacity: 0.7,
    maxWidth: '85%',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 10,
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
