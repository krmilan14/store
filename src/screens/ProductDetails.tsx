import CustomButton from "../common/CustomButton";
import Header from "../common/Header";
import Rating from "../common/Rating";
import React, { useState } from "react";
import WishList from "../common/WishListButton";
import WishListButton from "../common/WishListButton";
import tailwind from "twrnc";
import tw from "twrnc";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AirbnbRating } from "react-native-ratings";
import { HomeScreenNavigationProp, RootParamList } from "../common/types";

import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MoreButtonProps {
  more: boolean;
  setMore: React.Dispatch<React.SetStateAction<boolean>>;
}
const MoreButton = ({more, setMore}: MoreButtonProps): React.JSX.Element => {
  return (
    <View style={tw``}>
      <TouchableOpacity style={tw``} onPress={() => setMore(!more)}>
        <Text style={tw`text-black  text-blue-500 text-sm`}>
          {!more ? 'less' : 'more'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const ProductDetails = () => {
  const [more, setMore] = useState<boolean>(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<RouteProp<RootParamList, 'ProductDetails'>>();
  const data = route.params.data;
  console.log(data.rating.rate);

  return (
    <View style={tw`flex-1 bg-white items-center `}>
      <Header
        title={'Product Details'}
        leftIcon={require('../images/previous.png')}
        rightIcon={require('../images/bag.png')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />

      <View style={tw`flex-1 w-[100%] mt-5 px-4 h-[100%] relative`}>
        <View
          style={tw`absolute bg-[rgba(0,0,0,0.05)] p-2 rounded-full top-2 right-12 z-1`}>
          <WishListButton size={'9'} route={route}  />
        </View>
        <Image
          resizeMode="center"
          style={tw`w-[100%] mt-5 h-[40%] `}
          source={{uri: data.image}}
        />
        <View style={tw`py-4 text-left `}>
          <Text style={tw`text-left  text-2xl text-black`}>{data.title}</Text>
        </View>
        <View style={tw` flex-row items-end gap-1 `}>
          <Text style={tw`text-4xl text-green-700`}>${data.price}</Text>
          <Text style={tw` text-gray-400 line-through text-lg`}>
            ${data.price + (data.price / 100) * 20}
          </Text>
        </View>

        {data.description.length > 50 ? (
          <>
            <Text style={tw`text-sm text-gray-400 text-justify`}>
              {more
                ? `${data.description.substring(0, 50)}...`
                : `${data.description}`}
            </Text>
            <MoreButton more={more} setMore={setMore} />
          </>
        ) : (
          data.description
        )}
        {/* <AirbnbRating
          defaultRating={data.rating.rate}
          isDisabled={true} // Disable interaction if it's for display only
          size={20}
        />
        <Rating count={data.rating.count} rate={data.rating.rate} /> */}
      </View>

      <View
        style={tw`bg-white  h-[7%] w-[98%]  rounded-full m-1 flex flex-row justify-evenly items-center`}>
        <CustomButton
          onClickCustomButton={() => console.log('clicked')}
          styles="bg-yellow-500 w-40 rounded-full  items-center"
          title="Add to Cart"
        />
        <View style={tw`w-[1px]  h-10 bg-gray-200`}></View>
        <CustomButton
          onClickCustomButton={() => console.log('clicked')}
          styles="bg-green-700 w-40 rounded-full items-center"
          title="Buy now"
        />
      </View>
    </View>
  );
};

export default ProductDetails;
