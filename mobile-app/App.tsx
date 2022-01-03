import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./features/prijava/Prijava";
import Home from "./features/home/Home";
import Brodovi from "./features/brod/brodovi/Brodovi";
import Radnici from "./features/radnik/radnici/Radnici";
import Brod from "./features/brod/brod/Brod";
import NoviBrod from "./features/brod/brodovi/novi-brod/NoviBrod";
import Radnik from "./features/radnik/radnikItem/Radnik";
import NoviRadnik from "./features/radnik/novi-radnik/NoviRadnik";

export type RootStackParamList = {
    Login: undefined;
    Home: {
        username: string;
    };
    Brodovi: undefined;
    Brod: {
        naziv: string;
    };
    NoviBrod: undefined;
    Radnici: undefined;
    Radnik: {
        imeRadnika: string;
    };
    NoviRadnik: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Login">
                <RootStack.Screen name="Login" component={Login} />
                <RootStack.Screen name="Home" component={Home} />
                <RootStack.Screen name="Brodovi" component={Brodovi} />
                <RootStack.Screen name="Brod" component={Brod} />
                <RootStack.Screen name="NoviBrod" component={NoviBrod} />
                <RootStack.Screen name="Radnici" component={Radnici} />
                <RootStack.Screen name="Radnik" component={Radnik} />
                <RootStack.Screen name="NoviRadnik" component={NoviRadnik} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
