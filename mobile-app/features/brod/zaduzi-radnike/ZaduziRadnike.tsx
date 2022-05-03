import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import { RootStackParamList } from "../../../App";

type ZaduziZadnikeProps = StackScreenProps<RootStackParamList, "Brod">;

export default function ZaduziRadnike({ route, navigation }: ZaduziZadnikeProps) {
    const shipId = route.params.id;
    return (
        <View>
            <Text>Zaduzi radnike</Text>
        </View>
    );
}
