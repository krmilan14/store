import React, { useState } from "react";
import tw from "twrnc";
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { globalStyles } from "../../common/GlobalStyles";

const Cart = () => {
  const [pressed, setPressed]  = useState<boolean>(true)
  return (
    <TouchableHighlight style={tw` justify-center ${pressed? `bg-green-500`: `bg-blue-500`}  `} onPress={() => setPressed(!pressed)}>
        <Text style={[tw`text-4xl focus:bg-green-500 text-black`, globalStyles.font]}>Cart</Text>
      
    </TouchableHighlight>
  );
};

export default Cart;
