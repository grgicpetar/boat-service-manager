import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";

const radniciMock = [
    { naziv: "Radnik 1", key: "1" },
    { naziv: "Radnik 2", key: "2" },
    { naziv: "Radnik 3", key: "3" },
];

export default function NoviBrod() {
    const [nazivBroda, setNazivBroda] = useState<string>("");
    const [dodatneInfo, setDodatneInfo] = useState<string>("");
    const [zaduzeniRadniciKeys, setZaduzeniRadniciKeys] = useState<string[]>([]);
    const [slikaBroda, setSlikaBroda] = useState<string>("");

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        })();
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

    const izaberiSliku = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setSlikaBroda(result.uri);
        }
    };

    function submitBrod() {
        const brodIsValid = validateBrod();
        if (brodIsValid === "valid") {
            Alert.alert("Novi brod", "Uspješno dodan novi brod!");
        } else {
            Alert.alert("Novi brod", brodIsValid);
        }
    }

    function validateBrod(): string {
        if (nazivBroda.length < 2) {
            return "Ime broda mora sadržavati barem 2 znaka.";
        }

        return "valid";
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                <Text style={styles.title}>Dodaj novi brod</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={nazivBroda}
                        placeholder={"Naziv broda"}
                        placeholderTextColor={"rgba(236, 236, 236, 0.3)"}
                        onChangeText={(text) => setNazivBroda(text)}
                    />
                </View>
                <View style={styles.brodInfoContainer}>
                    <TextInput
                        style={styles.brodInfo}
                        value={dodatneInfo}
                        placeholder={"Dodatne informacije o brodu"}
                        placeholderTextColor={"rgba(236, 236, 236, 0.3)"}
                        onChangeText={(text) => setDodatneInfo(text)}
                    ></TextInput>
                </View>
                <Text style={styles.zaduziRadnike}>Zaduži radnike</Text>
                <View style={styles.radniciContainer}>
                    {radniciMock.map((radnik, i) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={[
                                styles.radnik,
                                {
                                    backgroundColor: zaduzeniRadniciKeys.find(
                                        (zaduzeniRadnikKey) => zaduzeniRadnikKey === radnik.key
                                    )
                                        ? "#9bc8ee"
                                        : "#ECECEC",
                                },
                            ]}
                            key={i}
                            onPress={() => toggleRadnik(radnik.key)}
                        >
                            <Text style={styles.radnikNaziv}>{radnik.naziv}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Button title="Izaberite sliku broda" onPress={izaberiSliku} />
                {slikaBroda.length > 0 && <Image source={{ uri: slikaBroda }} style={styles.slikaBroda} />}
                <TouchableOpacity
                    style={styles.spremiButton}
                    activeOpacity={0.9}
                    onPress={() => {
                        submitBrod();
                    }}
                >
                    <Text style={styles.spremiButtonText}>Spremi</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#181A49",
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
    slikaBroda: {
        width: 200,
        height: 200,
        marginTop: 10,
        marginBottom: 20,
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
