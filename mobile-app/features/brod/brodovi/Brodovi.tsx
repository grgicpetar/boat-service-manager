import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Fontisto, AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

import { Ship } from "../../../types";

type BrodoviProps = NativeStackScreenProps<RootStackParamList, "Brodovi">;

export default function Brodovi({ navigation }: BrodoviProps) {
    const [ships, setShips] = useState<Ship[]>();
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://192.168.1.10:3000/ship`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            setShips(json);
        };
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Fontisto name="ship" size={32} color="#ECECEC" style={styles.headerIcon} />
                <Text style={styles.headerText}>Brodovi</Text>
            </View>
            <FlatList
                style={styles.listaBrodova}
                data={ships}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.listaBrodovaItem}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate("Brod", { id: item.id })}
                    >
                        <Text style={styles.listaBrodovaItemText}>{item.name}</Text>
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
        fontSize: 24,
    },
    listaBrodova: {
        marginTop: 50,
        width: "90%",
        flexGrow: 0,
        marginBottom: 20,
    },
    listaBrodovaItem: {
        backgroundColor: "#414496",
        marginBottom: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    listaBrodovaItemText: {
        textAlign: "center",
        color: "#ECECEC",
        fontSize: 20,
    },
});
