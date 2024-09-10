import Cart from "./tabs/Cart";
import Home from "./tabs/Home";
import React, { useEffect, useState } from "react";
import Search from "./tabs/Search";
import User from "./tabs/User";
import WishList from "./tabs/WishList";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Keyboard,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface selectionType {
  home: string;
  search: string;
  wishlist: string;
  cart: string;
  user: string;
}
type IconType = 'home' | 'search' | 'wishlist' | 'bag' | 'user';
type ImageKey = IconType | `${IconType}Fill`;

const Homescreen = () => {
  // const navigation = useNavigation();
  const [selected, setSelected] = useState<IconType>('home');
  const [keyboard, setKeyboard] = useState<boolean>(false);

  const [scale] = useState<Record<IconType, Animated.Value>>({
    home: new Animated.Value(1),
    search: new Animated.Value(1),
    wishlist: new Animated.Value(1),
    bag: new Animated.Value(1),
    user: new Animated.Value(1),
  });

  const images: Record<ImageKey, any> = {
    home: require('../images/home.png'),
    homeFill: require('../images/homeFill.png'),
    search: require('../images/search.png'),
    searchFill: require('../images/searchFill.png'),
    wishlist: require('../images/wishlist.png'),
    wishlistFill: require('../images/wishlistFill.png'),
    bag: require('../images/bag.png'),
    bagFill: require('../images/bagFill.png'),
    user: require('../images/user.png'),
    userFill: require('../images/userFill.png'),
  };

  const animateIcon = (key: IconType) => {
    Object.keys(scale).forEach(icon => {
      const typedIcon = icon as IconType; // Cast `icon` to `IconType`
      Animated.timing(scale[typedIcon], {
        toValue: typedIcon === key ? 1.1 : 1,
        duration: 50,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboard(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboard(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    animateIcon(selected);
  }, [selected]);

  return (
    <View style={tw`flex-1 bg-white items-center `}>
      <StatusBar barStyle="light-content" backgroundColor="#0786DAFD" />
      {/* <Header
        title={'Grocery store'}
        rightIcon={require('../images/previous.png')}
        leftIcon={require('../images/drawer.png')}
        onClickLeftIcon={() => navigation.openDrawer()}
        onClickRightIcon={() => navigation.openDrawer()}
      /> */}
      <View style={tw`flex-1  items-center `}>
        {selected === 'home' ? (
          <Home />
        ) : selected === 'search' ? (
          <Search />
        ) : selected === 'wishlist' ? (
          <WishList />
        ) : selected === 'bag' ? (
          <Cart />
        ) : (
          <User />
        )}
      </View>
      {keyboard ? null : (
        <View
          style={tw`absolute bottom-2 shadow w-[96%] h-15 rounded-b-3xl rounded-t-xl flex-row items-center justify-between bg-white`}>
          {Object.keys(scale).map(icon => {
            // Type assertion to ensure `icon` is treated as `IconType`
            const typedIcon = icon as IconType;
            return (
              <TouchableOpacity
                key={typedIcon}
                onPress={() => setSelected(typedIcon)}
                style={tw`justify-center items-center flex-1`}>
                <Animated.Image
                  source={
                    selected === typedIcon
                      ? images[`${typedIcon}Fill` as ImageKey]
                      : images[typedIcon]
                  }
                  style={[
                    tw`w-7 h-7`,
                    {
                      transform: [{scale: scale[typedIcon]}],
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Homescreen;
