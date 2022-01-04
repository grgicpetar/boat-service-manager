import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "../../../App";
import Zapisi from "../../zapis/zapisi/Zapisi";

type BrodProps = StackScreenProps<RootStackParamList, "Brod">;

export default function Brod({ route }: BrodProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.nazivBroda}>{route.params.naziv}</Text>
            <View style={styles.brodInfoContainer}>
                <Text style={styles.brodInfo}>Dodatan info o brodu</Text>
            </View>
            <Zapisi />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181A49",
        alignItems: "center",
    },
    nazivBroda: {
        textAlign: "center",
        color: "#ECECEC",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 32,
        marginTop: "10%",
        marginBottom: 10,
    },
    slikaBroda: {
        flex: 1,
        resizeMode: "contain",
        height: "50%",
    },
    brodInfoContainer: {
        borderColor: "#ECECEC",
        borderWidth: 1,
        width: "80%",
        borderRadius: 10,
        paddingVertical: 10,
    },
    brodInfo: {
        textAlign: "center",
        color: "#ECECEC",
    },
});
