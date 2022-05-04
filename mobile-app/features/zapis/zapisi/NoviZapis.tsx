import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "../../../App";
import { useStore } from "../../../store/zustand-store";

type NoviZapisProps = NativeStackScreenProps<RootStackParamList, "NoviZapis">;

export default function NoviZapis({ route }: NoviZapisProps) {
    const [text, setText] = useState<string>("");
    const brodId = route.params.brodId;
    const { user } = useStore();

    return (
        <View style={styles.container}>
            <Text>{brodId}</Text>
            <Text>{user?.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#181A49",
        alignItems: "center",
        marginTop: 20,
    },
});
