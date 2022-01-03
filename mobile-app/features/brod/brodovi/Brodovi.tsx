import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Fontisto, AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

const brodoviMock = [
    { naziv: "Brod 1", key: "1" },
    { naziv: "Brod 2", key: "2" },
    { naziv: "Brod 3", key: "3" },
];

type BrodoviProps = NativeStackScreenProps<RootStackParamList, "Brodovi">;

export default function Brodovi({ navigation }: BrodoviProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Fontisto name="ship" size={32} color="#ECECEC" style={styles.headerIcon} />
                <Text style={styles.headerText}>Brodovi</Text>
            </View>
            <FlatList
                style={styles.listaBrodova}
                data={brodoviMock}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.listaBrodovaItem}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate("Brod", { naziv: item.naziv })}
                    >
                        <Text style={styles.listaBrodovaItemText}>{item.naziv}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("NoviBrod")}>
                <AntDesign name="pluscircleo" size={32} color="#ECECEC" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181A49",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "10%",
    },
    headerIcon: {
        marginRight: 10,
    },
    headerText: {
        textAlign: "center",
        color: "#ECECEC",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 32,
    },
    listaBrodova: {
        marginTop: 50,
        width: "90%",
        flexGrow: 0,
    },
    listaBrodovaItem: {
        backgroundColor: "#ECECEC",
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 10,
    },
    listaBrodovaItemText: {
        textAlign: "center",
        color: "#181A49",
        fontSize: 20,
    },
});
