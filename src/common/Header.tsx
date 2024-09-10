import React from "react";
import tw from "twrnc";
import { HeaderProps } from "./types";

import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';



const {height, width} = Dimensions.get('window');
const Header = ({
  title,
  leftIcon,
  rightIcon,
  onClickLeftIcon,
  onClickRightIcon,
}: HeaderProps): React.JSX.Element => {
  return (
    <View
      style={[
        tw`bg-[#0786DAFD]  rounded-b-2xl flex-row items-center flex justify-between items-center px-2    `,

        {
          shadowColor: 'red',
          shadowOffset: {width: 0, height: 5},
          shadowOpacity:10,
          shadowRadius: 4,
          elevation: 5, // Android-specific shadow property
        },
        {height: 60, width: width},
      ]}>
      <TouchableOpacity onPress={onClickLeftIcon}>
        {leftIcon && <Image
          style={tw`w-[30px] h-[30px] `}
          source={leftIcon}
          tintColor={'white'}
        />}
      </TouchableOpacity>
      <Text style={[tw`text-3xl  text-white`,  { fontFamily: 'Roboto' }]}>{title}</Text>
      <TouchableOpacity onPress={onClickRightIcon}>
        {rightIcon && <Image
          style={tw`w-[30px] h-[30px]`}
          source={rightIcon}
          tintColor={'white'}
        />}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
