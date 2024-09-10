import Header from "../../common/Header";
import React, { useEffect, useRef, useState } from "react";
import WishListButton from "../../common/WishListButton";
import tw from "twrnc";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

import {
  Animated,
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  HomeScreenNavigationProp,
  Product,
  ProductsState,
  RootParamList,
  RootState,
  StoreProduct,
} from '../../common/types';

const Search = () => {
  const products = useSelector((state: RootState) => state.product);

  const [pressed, setPressed] = useState<boolean>(false);

  const [search, setSearch] = useState<string>('');

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [oldData, setOldData] = useState<Product[]>(products.data);

  const [searchedData, setSearchedData] = useState<Product[]>([]);

  const route = useRoute<RouteProp<RootParamList, 'ProductDetails'>>();

  const filterData = (text: string) => {
    const newData = oldData.filter(item => {
      return item.title.toLowerCase().match(text.toLowerCase());
    });
    setSearchedData(newData);
    // console.log(newData);
  };

  const handleClose = () => {
    setPressed(false);
    setSearchedData([]);
    setSearch('');
    Keyboard.dismiss();
    animateBorder(0);
  };

  const borderColor = useRef(new Animated.Value(0)).current; // Initial border color state (0: blue-100)

  const animateBorder = (toValue: number) => {
    Animated.timing(borderColor, {
      toValue,
      duration: 300,
      useNativeDriver: false, // It's a style animation, so native driver can't be used here
    }).start();
  };

  const animatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#BFDBFE', '#3B82F6'], // blue-100 and blue-500 colors
  });

  return (
    <View style={tw`flex-1`}>
      <Header
        title={'Store'}
        rightIcon={require('../../images/bag.png')}
        leftIcon={require('../../images/drawer.png')}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <Animated.View
        style={[
          tw`my-2 mx-4 rounded-full border-2 `,
          {borderColor: animatedBorderColor},
        ]}>
        <TouchableOpacity
          style={tw` justify-between   ${
            pressed ? `border-blue-500` : `border-blue-100`
          } flex-row`}>
          <TouchableOpacity
            style={tw`flex justify-center items-center w-15 h-15 rounded-full`}>
            <Image
              resizeMode="contain"
              style={tw`w-10 h-10`}
              source={require('../../images/ProductSearch.png')}
            />
          </TouchableOpacity>
          <TextInput
            value={search}
            onChangeText={text => {
              setSearch(text);
              filterData(text);
              if (text === '') setSearchedData([]);
            }}
            onPress={() => {
              setPressed(true);
              animateBorder(1);
            }}
            placeholderTextColor="#999"
            placeholder="Search items here"
            style={tw`h-15 text-xl pl-4 text-gray-600 flex-1`}
          />
          {search && (
            <TouchableOpacity
              style={tw`flex justify-center items-center w-15 h-15 rounded-full`}
              onPress={handleClose}>
              <Image
                resizeMode="contain"
                style={tw`w-5 h-5`}
                source={require('../../images/close.png')}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </Animated.View>
      <TouchableWithoutFeedback
        style={tw``}
        onPress={() => {
          Keyboard.dismiss();
          animateBorder(0);
        }}>
        <View style={tw`flex-1 `}>
          {search ? (
            <FlatList
              data={searchedData}
              numColumns={2} // Display 2 products per row
              keyExtractor={item => item.id.toString()}
              columnWrapperStyle={styles.row}
              renderItem={({item}) => {
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
                        style={[
                          tw`text-black w-40  text-justify`,
                          {fontFamily: 'roboto'},
                        ]}>
                        {item.title}
                      </Text>

                      <View
                        style={tw`flex  flex-row items-end justify-between`}>
                        <View style={tw`relative`}>
                          <Text
                            style={tw` flex    text-green-700 my-1 text-xl`}>
                            {item.price}
                          </Text>
                          <View style={tw`absolute top-2 -left-2`}>
                            <Text style={tw`text-green-700 text-xs`}>$</Text>
                          </View>
                        </View>
                        <WishListButton route={route} size={'7'} />
                      </View>
                      <TouchableOpacity
                        style={[tw`my-1 bg-yellow-400 rounded-full `]}>
                        <Text style={tw`text-white text-lg text-center`}>
                          Add to cart
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={tw`w-full mt-20 opacity-30 h-100`}
              source={require('../../images/empty.png')}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
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

export default Search;
