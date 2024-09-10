import React, { useState } from "react";
import tw from "twrnc";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { addWishList } from "../redux/slices/WishlistSlice";
import { MyComponentProps, RootParamList } from "./types";

const WishListButton = ({size, route}: MyComponentProps) => {
  const [added, setAdded] = useState<boolean>(true);
  // const route = useRoute<RouteProp<RootParamList, 'ProductDetails'>>();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={tw` w-${size} h-${size}`}
      onPress={() => {
        setAdded(!added);
        dispatch(addWishList(route.params.data));
      }}>
      <Image
        style={tw`w-${size} h-${size}`}
        resizeMode="center"
        source={
          added
            ? require('../images/wishlistbtn.png')
            : require('../images/wishlistbtnFill.png')
        }
      />
    </TouchableOpacity>
  );
};

export default WishListButton;
