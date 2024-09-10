import Main from "./screens/Main";
import ProductDetails from "./screens/ProductDetails";
import React from "react";
import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<ParamListBase>();
const AppNavigator = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          options={{headerShown: false}}
          component={Main}
        />
        <Stack.Screen
          name="ProductDetails"
          options={{headerShown: false}}
          component={ProductDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
