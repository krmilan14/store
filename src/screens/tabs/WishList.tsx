import Header from "../../common/Header";
import React, { useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { RootStackParamList, RootState, StoreProduct } from "../../common/types";

import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type WishListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetails'
>;
const WishList = () => {
  const navigation = useNavigation<WishListScreenNavigationProp>();
  const items = useSelector((state: RootState) => state.wishlist.data);
  console.log(JSON.stringify(items));
  const {width} = Dimensions.get('window');
  const itemWidth = width / 2 ;
  const renderItemContainer = ({item}: {item: StoreProduct}) => (
    <View style={{width: itemWidth}}>{renderItem({item})}</View>
  );
  const renderItem = ({ item }: { item: StoreProduct }) => {
    console.log(item.image);
    
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('ProductDetails', {data: item});
        }}
        style={styles.card}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{uri: item.image}}
        />
        <View style={tw`flex-1 p-1 justify-between`}>
          <Text
            style={[tw`text-black w-40  text-justify`, {fontFamily: 'roboto'}]}>
            {item.title}
          </Text>

          <View style={tw`flex  flex-row items-end justify-between`}>
            <View style={tw`relative`}>
              <Text style={tw` flex    text-green-700 my-1 text-xl`}>
                {item.price}
              </Text>
              <View style={tw`absolute top-2 -left-2`}>
                <Text style={tw`text-green-700 text-xs`}>$</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={[tw`my-1 bg-yellow-400 rounded-full `]}>
            <Text style={tw`text-white text-lg text-center`}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Header title="Wish list" leftIcon={require('../../images/back.png')}  />
      <FlatList
        data={items}
        columnWrapperStyle={tw`justify-between`}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItemContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between', // Ensures proper spacing between columns
  },
  card: {
    flex: 1,
    margin: 10, // Margin around the card
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    // shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Shadow effect for Android
  },
  image: {
    width: 120,
    height: 120,
  },
});

export default WishList;
 

