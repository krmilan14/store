import React from "react";
import tw from "twrnc";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { CustomButtonProps } from "./types";

const CustomButton = ({ title, onClickCustomButton, styles }: CustomButtonProps) => {
  const width = Dimensions.get('window').width;
  
  const buttonStyles = styles ? tw`${styles}` : tw``;

  return (
    <TouchableOpacity onPress={onClickCustomButton} style={[buttonStyles]}>
      <Text style={tw`text-white text-2xl`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
