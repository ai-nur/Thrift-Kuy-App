import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Gap from './Gap';
import {IconHeart} from '../constants';

const BoxItemTop = ({bgColor, icon, text, price, onPress}) => {
  return (
    <TouchableOpacity style={styles.container(bgColor)} onPress={onPress}>
      <View >
        <View>
          <Image source={icon} style={styles.image} />
          <Gap height={10} />
          <Text style={styles.text}>{text}</Text>
        </View>
        <Gap height={10} />
        <View style={styles.price}>
          <Text style={styles.wrapperButtom}>IDR {price}</Text>
          <TouchableOpacity>
            <IconHeart />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BoxItemTop;

const styles = StyleSheet.create({
  container: bgColor => ({
    height: 220,
    width: 150,
    backgroundColor: bgColor,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 15,
  }),
  text: {
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  wrapperButtom: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
  image: {
    height: 150,
    width: 150,
    // resizeMode: 'contain',
    alignItems: 'center',
  },
});
