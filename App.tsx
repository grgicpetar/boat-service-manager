import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./features/prijava/Prijava";
import Home from "./features/home/Home";
import Brodovi from "./features/brod/brodovi/Brodovi";
import Radnici from "./features/radnik/radnici/Radnici";

export type RootStackParamList = {
  Login: undefined;
  Home: {
    username: string;
  };
  Brodovi: undefined;
  Radnici: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Brodovi" component={Brodovi} />
        <RootStack.Screen name="Radnici" component={Radnici} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
