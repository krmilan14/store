import CustomButton from "../../common/CustomButton";
import Header from "../../common/Header";
import React, { useEffect, useState } from "react";
import WishList from "./WishList";
import WishListButton from "../../common/WishListButton";
import tw from "twrnc";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { globalStyles } from "../../common/GlobalStyles";
import { HomeScreenNavigationProp, Product } from "../../common/types";
import { addProduct } from "../../redux/slices/ProductsSlice";

import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Home = (): React.JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true); // Added loading state

  useEffect(() => {
    getData();
  }, []);

  // const getData = () => {
  //   fetch('https://fakestoreapi.com/products')
  //     .then(res => res.json())
  //     .then(json => {
  //       setProducts(json);
  //       dispatch(addProduct(json));
  //       console.log(json);

  //       setLoading(false); // Set loading to false once data is fetched
  //     })
  //     .catch(() => setLoading(true));
  // };
  const getData = () => {
    // Load local JSON file
    const localData = require('../../../assets/products.json');

    // Simulate fetching data
    new Promise(resolve => {
      setTimeout(() => {
        resolve(localData);
      }, 1000); // Simulate a delay like network request
    })
      .then(json => {
        setProducts(json);
        dispatch(addProduct(json));
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(() => setLoading(true));
  };
  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0786DAFD" />
      </View>
    );
  }

  return (
    <View style={tw`flex mb-20 bg-gray-200`}>
      <Header
        title={'Store'}
        rightIcon={require('../../images/bag.png')}
        leftIcon={require('../../images/drawer.png')}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <View style={tw`p-2 flex mb-20 justify-between`}>
        <FlatList
          data={products}
          numColumns={2} // Display 2 products per row
          keyExtractor={item => item.id.toString()}
          columnWrapperStyle={styles.row} // Style the row for spacing
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
                  {/* <Text style={tw`text-black text-justify px-1`}>
                    {item.description.length > 30
                      ? item.description.substring(0, 30) + '...'
                      : item.description}
                  </Text> */}
                  <View style={tw`flex  flex-row items-end justify-between`}>
                    <View style={tw`relative`}>
                      <Text style={tw` flex    text-green-700 my-1 text-xl`}>
                        {item.price}
                      </Text>
                      <View style={tw`absolute top-2 -left-2`}>
                        <Text style={tw`text-green-700 text-xs`}>$</Text>
                      </View>
                    </View>
                    <WishListButton size={'7'} />
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
      </View>
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

export default Home;
