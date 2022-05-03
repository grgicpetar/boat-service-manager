import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from "react-native";
import { RootStackParamList } from "../../../App";
import { User } from "../../../types";

type ZaduziZadnikeProps = StackScreenProps<RootStackParamList, "ZaduziRadnike">;

export default function ZaduziRadnike({ route, navigation }: ZaduziZadnikeProps) {
    const brodId = route.params.brodId;
    const imeBroda = route.params.imeBroda;
    const zaduzeniRadnici = route.params.zaduzeniRadnici;
    const [zaduzeniRadniciKeys, setZaduzeniRadniciKeys] = useState<string[]>(zaduzeniRadnici);
    const [radnici, setRadnici] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://192.168.0.16:3000/user`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();

            setRadnici(json.filter((user: any) => user.role === 2));
        };
        fetchData();
    }, []);

    function toggleRadnik(radnikKey: string) {
        if (!zaduzeniRadniciKeys.find((zaduzeniRadnikKey) => zaduzeniRadnikKey === radnikKey)) {
            setZaduzeniRadniciKeys((old) => [...old, radnikKey]);
        } else {
            const filtriraniRadnici = zaduzeniRadniciKeys.filter(
                (zaduzeniRadnikKey) => zaduzeniRadnikKey !== radnikKey
            );
            setZaduzeniRadniciKeys(filtriraniRadnici);
        }
    }

    async function spremi() {
        try {
            await fetch("http://192.168.0.16:3000/user_ship", {
                method: "post",
                body: JSON.stringify({
                    shipId: brodId,
                    workerNames: zaduzeniRadniciKeys,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            navigation.navigate("Brod", { id: brodId });

            Alert.alert("Zaduženje", "Zaduženje uspješno spremljeno!");
        } catch (error) {
            ToastAndroid.show("Nešto je pošlo po krivu", ToastAndroid.SHORT);
        }
    }

    return (
        <View style={styles.container}>
            <Text>{imeBroda}</Text>
            <Text>Zaduzi radnike</Text>
            <View style={styles.radniciContainer}>
                {radnici.map((radnik, i) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={[
                            styles.radnik,
                            {
                                backgroundColor: zaduzeniRadniciKeys.find(
                                    (zaduzeniRadnikKey) => zaduzeniRadnikKey === radnik.name
                                )
                                    ? "#9bc8ee"
                                    : "#ECECEC",
                            },
                        ]}
                        key={i}
                        onPress={() => toggleRadnik(radnik.name)}
                    >
                        <Text style={styles.radnikNaziv}>{radnik.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity
                style={styles.spremiButton}
                activeOpacity={0.9}
                onPress={() => {
                    spremi();
                }}
            >
                <Text style={styles.spremiButtonText}>Spremi</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#181A49",
        alignItems: "center",
    },
    title: {
        textAlign: "center",
        color: "#ECECEC",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 32,
        marginTop: "10%",
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 20,
        padding: 5,
    },
    input: {
        color: "#ECECEC",
        textAlign: "center",
        borderBottomColor: "#ECECEC",
        borderBottomWidth: 1,
        borderRadius: 10,
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
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
    zaduziRadnike: {
        textAlign: "center",
        color: "#ECECEC",
        marginTop: 10,
    },
    radniciContainer: {
        width: "80%",
        marginTop: 10,
        marginBottom: 10,
    },
    radnik: {
        backgroundColor: "#ECECEC",
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 5,
    },
    radnikNaziv: {
        color: "#181A49",
        textAlign: "center",
    },
    spremiButton: {
        backgroundColor: "#ECECEC",
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    spremiButtonText: {
        textAlign: "center",
        color: "#181A49",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 16,
    },
});
