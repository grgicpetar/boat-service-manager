import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "../../../App";
import { Ship } from "../../../types";
import Zapisi from "../../zapis/zapisi/Zapisi";

type BrodProps = StackScreenProps<RootStackParamList, "Brod">;

export default function Brod({ route }: BrodProps) {
    const [ship, setShip] = useState<Ship>();
    const shipId = route.params.id;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://192.168.1.2:3000/ship/${shipId}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            setShip(json);
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {ship ? (
                <>
                    <Text style={styles.nazivBroda}>{ship.name}</Text>
                    <View style={styles.brodInfoContainer}>
                        <Text style={styles.brodInfo}>{ship.description}</Text>
                    </View>
                    <Zapisi />
                </>
            ) : (
                <View>
                    <Text style={styles.brodInfo}>Loading</Text>
                </View>
            )}
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
