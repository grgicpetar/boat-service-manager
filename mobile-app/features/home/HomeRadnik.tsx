import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useStore } from "../../store/zustand-store";
import { UserShip } from "../../types";

type HomeProps = NativeStackScreenProps<RootStackParamList, "HomeRadnik">;

export default function HomeRadnik({ route, navigation }: HomeProps) {
    const [ships, setShips] = useState<UserShip[]>([]);
    const user = useStore().user;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://192.168.1.2:3000/user_ship/${user?.username}`, {
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
            <Text style={styles.title}>Boat Manager</Text>
            <Text style={styles.username}>{user?.username} (radnik)</Text>
            <Text style={styles.shipsInfo}>Zaduženi brodovi</Text>
            <View style={styles.shipItemsContainer}>
                {ships.map((ship) => (
                    <TouchableOpacity
                        key={ship.id}
                        activeOpacity={0.9}
                        style={styles.shipItem}
                        onPress={() => {
                            navigation.navigate("Brod", { id: ship.id });
                        }}
                    >
                        <Text numberOfLines={1} style={styles.shipItemName}>
                            {ship.name}
                        </Text>
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
    title: {
        marginTop: "10%",
        color: "#ECECEC",
        fontSize: 22,
        marginBottom: "4%",
    },
    username: {
        color: "#ECECEC",
        fontSize: 12,
        marginBottom: "20%",
    },
    shipsInfo: {
        color: "#ECECEC",
        fontSize: 12,
        marginBottom: "10%",
    },
    shipItemsContainer: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    shipItem: {
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
        width: 150,
        marginBottom: 20,
        borderColor: "#ECECEC",
        borderWidth: 1,
        justifyContent: "center",
        marginLeft: "2%",
        marginRight: "2%",
    },
    shipItemName: {
        color: "#ECECEC",
        fontSize: 18,
    },
});
