import Homescreen from "./Homescreen";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import { Text, View } from "react-native";

const Drawer = createDrawerNavigator<ParamListBase>();
const Main = ():React.JSX.Element => {
  return (
    <Drawer.Navigator>
      
      <Drawer.Screen name="Homescreen" options={{headerShown:false}} component={Homescreen} />
    </Drawer.Navigator>
  )
}

export default Main