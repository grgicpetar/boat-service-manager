import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./features/prijava/Prijava";
import HomeAdmin from "./features/home/HomeAdmin";
import HomeRadnik from "./features/home/HomeRadnik";
import Brodovi from "./features/brod/brodovi/Brodovi";
import Radnici from "./features/radnik/radnici/Radnici";
import Brod from "./features/brod/brod/Brod";
import NoviBrod from "./features/brod/brodovi/novi-brod/NoviBrod";
import Radnik from "./features/radnik/radnikItem/Radnik";
import NoviRadnik from "./features/radnik/novi-radnik/NoviRadnik";
import ZaduziRadnike from "./features/brod/zaduzi-radnike/ZaduziRadnike";

export type RootStackParamList = {
    Login: undefined;
    HomeAdmin: undefined;
    HomeRadnik: undefined;
    Brodovi: undefined;
    Brod: {
        id: number;
    };
    NoviBrod: undefined;
    Radnici: undefined;
    Radnik: {
        imeRadnika: string;
    };
    NoviRadnik: undefined;
    ZaduziRadnike: {
        brodId: number;
    };
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Login">
                <RootStack.Screen name="Login" component={Login} />
                <RootStack.Screen name="HomeAdmin" component={HomeAdmin} />
                <RootStack.Screen name="HomeRadnik" component={HomeRadnik} />
                <RootStack.Screen name="Brodovi" component={Brodovi} />
                <RootStack.Screen name="Brod" component={Brod} />
                <RootStack.Screen name="NoviBrod" component={NoviBrod} />
                <RootStack.Screen name="Radnici" component={Radnici} />
                <RootStack.Screen name="Radnik" component={Radnik} />
                <RootStack.Screen name="NoviRadnik" component={NoviRadnik} />
                <RootStack.Screen name="ZaduziRadnike" component={ZaduziRadnike} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
