import AppNavigator from "./src/AppNavigator";
import React from "react";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
};

export default App;
