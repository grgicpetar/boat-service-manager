import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../../App";
import { Ship, User, Zapis } from "../../../types";
import { useIsFocused } from "@react-navigation/native";
import Zapisi from "../../zapis/zapisi/ZapisiList";
import { useStore } from "../../../store/zustand-store";

type BrodProps = StackScreenProps<RootStackParamList, "Brod">;

export default function Brod({ route, navigation }: BrodProps) {
    const [ship, setShip] = useState<Ship>();
    const [workers, setWorkers] = useState<User[]>([]);
    const { user } = useStore();

    const shipId = route.params.id;
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const responseShip = await fetch(`http://192.168.1.86:3000/ship/${shipId}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const jsonShip = await responseShip.json();
            setShip(jsonShip);

            const responseWorkers = await fetch(`http://192.168.1.86:3000/user_ship/workers/${shipId}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const jsonWorkers = await responseWorkers.json();
            setWorkers(jsonWorkers);
        };
        if (isFocused) {
            fetchData();
        }
    }, [shipId, isFocused]);

    return (
        <View style={styles.container}>
            {ship ? (
                <>
                    <Text style={styles.nazivBroda}>{ship.name}</Text>
                    <View style={styles.brodInfoContainer}>
                        <Text style={styles.brodInfo}>{ship.description}</Text>
                    </View>
                    <Text style={styles.trenutnoZaduzen}>
                        {workers.length
                            ? "Trenutno zaduženi radnici za ovaj brod:"
                            : "Trenutno nema zaduženih radnika za ovaj brod"}
                    </Text>
                    <View style={styles.radniciContainer}>
                        {workers.map((item, i) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.radniciItem}
                                onPress={() => {
                                    navigation.navigate("Radnik", { imeRadnika: item.name });
                                }}
                            >
                                <Text style={styles.radniciItemText}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {user?.role === 1 ? (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("ZaduziRadnike", {
                                    brodId: shipId,
                                    imeBroda: ship.name,
                                    zaduzeniRadnici: workers.map((worker) => worker.name),
                                });
                            }}
                        >
                            <Text style={styles.zaduziRadnikeButton}>Zaduži radnike</Text>
                        </TouchableOpacity>
                    ) : null}
                    <View style={styles.zapisi}>
                        <Zapisi shipId={shipId} navigation={navigation} shipName={ship.name} />
                    </View>
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
        fontSize: 24,
        marginTop: "10%",
        marginBottom: 20,
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
        marginBottom: 40,
    },
    brodInfo: {
        textAlign: "center",
        color: "#ECECEC",
    },
    trenutnoZaduzen: {
        color: "#ECECEC",
    },
    radniciContainer: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    radniciItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#414496",
        backgroundColor: "#414496",
        borderRadius: 10,
        width: 140,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    radniciItemText: {
        color: "#ECECEC",
        textAlign: "center",
    },
    zaduziRadnikeButton: {
        color: "#414496",
        fontSize: 12,
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#414496",
        borderRadius: 10,
        padding: 10,
    },
    zapisi: {
        marginTop: "20%",
    },
});
