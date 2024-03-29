import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Platform,
    Button,
    Image,
    Alert,
    ToastAndroid,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParamList } from "../../../../App";

type NoviBrodProps = NativeStackScreenProps<RootStackParamList, "NoviBrod">;

export default function NoviBrod({ navigation }: NoviBrodProps) {
    const [nazivBroda, setNazivBroda] = useState<string>("");
    const [dodatneInfo, setDodatneInfo] = useState<string>("");

    async function submitBrod() {
        const brodIsValid = validateBrod();
        if (brodIsValid === "valid") {
            try {
                const response = await fetch("http://192.168.1.86:3000/ship", {
                    method: "post",
                    body: JSON.stringify({
                        name: nazivBroda,
                        description: dodatneInfo,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const json = await response.json();

                navigation.navigate("Brod", { id: json.id });

                ToastAndroid.show("Uspješno dodan novi brod!", ToastAndroid.LONG);
            } catch (error) {
                ToastAndroid.show("Nešto je pošlo po krivu", ToastAndroid.LONG);
            }
        } else {
            ToastAndroid.show(brodIsValid, ToastAndroid.LONG);
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
                <Text style={styles.title}>Novi brod</Text>
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
        fontSize: 24,
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
        borderBottomColor: "#414496",
        borderBottomWidth: 1,
        borderRadius: 10,
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    brodInfoContainer: {
        borderColor: "#414496",
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
        backgroundColor: "#414496",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    spremiButtonText: {
        textAlign: "center",
        color: "#ECECEC",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 16,
    },
});
