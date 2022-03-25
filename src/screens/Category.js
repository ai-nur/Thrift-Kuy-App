import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, CrewneckIcon, IconSearch, images} from '../constants';
import {BoxItemCategories} from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Category = ({navigation}) => {
  const [crewneck, setCrewneck] = useState([]);
  const [flanel, setFlanel] = useState([]);
  const [hoodie, setHoodie] = useState([]);
  const [jacket, setJacket] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (items !== []) {
      filtering();
    }
  }, [items]);

  //getDataFromAsyncStorage
  const getData = async () => {
    console.log('get jalan');
    let barang = await AsyncStorage.getItem('itemsData');
    barang = JSON.parse(barang);
    setItems(barang);
  };

  const filtering = () => {
    let crewneckList = [];
    let flanelList = [];
    let hoodieList = [];
    let jacketList = [];

    for (let index = 0; index < items.length; index++) {
      if (items[index].kategori === 'crewneck') {
        crewneckList.push(items[index]);
      } else if (items[index].kategori == 'flanel') {
        flanelList.push(items[index]);
      } else if (items[index].kategori == 'hoodie') {
        hoodieList.push(items[index]);
      } else if (items[index].kategori == 'jacket') {
        jacketList.push(items[index]);
      } else {
        return;
      }
    }
    setCrewneck(crewneckList);
    setFlanel(flanelList);
    setHoodie(hoodieList);
    setJacket(jacketList);
  };

  const ProductCard = ({data}) => {
    return (
      <TouchableOpacity 
      onPress={() =>
        navigation.navigate('ProductDetail', {productID: data.id})
      }
      style={styles.outerCard}>
        <View style={styles.card}>
          <Image source={{uri: data.gambarProduk}} style={styles.images} />
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.textName}>{data.namaProduk}</Text>
          <Text style={styles.textPrize}>IDR {data.harga}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          {/* //search bar */}
          <View style={styles.wrapperSearch}>
            <TextInput placeholder="Search here" style={styles.searchText} />
            <TouchableOpacity>
              <IconSearch />
            </TouchableOpacity>
          </View>
          {/* //Header */}
        </View>
        {/* //Categories */}
        <View style={styles.categories}>
          <Text style={styles.titleCategories}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{left: 5, alignSelf: 'center'}}>
            <BoxItemCategories
              source={images.crewneckIcon}
              color={COLORS.gray1}
              text="Crewneck"
              onPress={() => navigation.navigate('Categories', 'Men')}
            />
            <BoxItemCategories
              source={images.flanelIcon}
              color={COLORS.gray1}
              text="Flannel"
              onPress={() => navigation.navigate('Categories', 'Men')}
            />
            <BoxItemCategories
              source={images.hoodieIcon}
              color={COLORS.gray1}
              text="Hoodie"
              onPress={() => navigation.navigate('Categories', 'Men')}
            />
            <BoxItemCategories
              source={images.jacketIcon}
              color={COLORS.gray1}
              text="Jacket"
              onPress={() => navigation.navigate('Categories', 'Men')}
            />
          </ScrollView>
        </View>
        {/* //Recomendation */}
        <View style={styles.recomendation}>
          <Text style={styles.titleCategories}>Our Recomendation</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <View style={styles.grid}>
          {crewneck.map(data => {
            return <ProductCard data={data} key={data.id} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  wrapperSearch: {
    height: 40,
    width: '100%',
    backgroundColor: COLORS.gray1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  searchText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.white,
    width: '90%',
  },
  categories: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleCategories: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 20,
    color: COLORS.black,
    // paddingHorizontal: 25,
  },
  recomendation: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  seeAll: {
    color: COLORS.blue,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    paddingHorizontal: 5,
  },
  outerCard: {
    width: '50%',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  card: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.gray1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // marginBottom: 8,
  },
  cardFooter: {
    width: '100%',
    height: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: COLORS.gray1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // marginBottom: 8,
  },
  images: {
    // top: 7,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textName: {
    color: COLORS.black,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    textAlign: 'center',
    height: 35,
    paddingHorizontal: 5,
  },
  textPrize: {
    color: COLORS.black,
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    // height: 35,
    paddingHorizontal: 5,
  },
  grid: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});
