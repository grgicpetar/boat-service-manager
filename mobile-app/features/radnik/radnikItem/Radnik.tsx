import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { Ship } from "../../../types";

type RadnikProps = NativeStackScreenProps<RootStackParamList, "Radnik">;

export default function Radnik({ route, navigation }: RadnikProps) {
    const [ships, setShips] = useState<Ship[]>([]);
    const username = route.params.imeRadnika;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://192.168.1.86:3000/user_ship/${username}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            setShips(json);
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.imeRadnika}>{route.params.imeRadnika}</Text>
            <Text style={styles.trenutnoZaduzen}>
                {ships.length ? "Trenutno zadužen za brodove:" : "Trenutno nije zadužen za nijedan brod"}
            </Text>
            <View style={styles.brodoviContainer}>
                {ships.map((item, i) => (
                    <TouchableOpacity
                        key={i}
                        style={styles.brodItem}
                        onPress={() => {
                            navigation.navigate("Brod", { id: item.id });
                        }}
                    >
                        <Text style={styles.brodItemText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181A49",
        alignItems: "center",
    },
    imeRadnika: {
        textAlign: "center",
        color: "#ECECEC",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 24,
        marginTop: "10%",
        marginBottom: 40,
    },
    trenutnoZaduzen: {
        color: "#ECECEC",
        marginBottom: 10,
    },
    brodoviContainer: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    brodItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#414496",
        backgroundColor: "#414496",
        borderRadius: 10,
        width: 140,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    brodItemText: {
        color: "#ECECEC",
        textAlign: "center",
    },
});
