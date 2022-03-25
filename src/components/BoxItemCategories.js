import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { COLORS } from '../constants';

const BoxItemCategories = ({text, color, source, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.wrapperImg(color)} source={source}></Image>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BoxItemCategories;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    paddingTop: 15,
  },
  wrapperImg: color => ({
    height: 65,
    width: 65,
    backgroundColor: color,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  }),
  text: {
    marginTop: 10,
    color: COLORS.black,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
});
