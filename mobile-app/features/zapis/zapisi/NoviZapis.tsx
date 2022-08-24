import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ToastAndroid } from "react-native";
import { RootStackParamList } from "../../../App";
import { useStore } from "../../../store/zustand-store";

type NoviZapisProps = NativeStackScreenProps<RootStackParamList, "NoviZapis">;

export default function NoviZapis({ route, navigation }: NoviZapisProps) {
    const [text, setText] = useState<string>("");
    const brodId = route.params.brodId;
    const shipName = route.params.shipName;
    const { user } = useStore();

    async function handleSave() {
        const isValid = validateRecord();
        if (isValid === "valid") {
            try {
                const response = await fetch("http://192.168.1.10:3000/record", {
                    method: "post",
                    body: JSON.stringify({
                        shipId: brodId,
                        text,
                        user_name: user?.name,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const json = await response.json();

                navigation.navigate("Brod", { id: brodId });

                Alert.alert("Novi zapis", "Uspješno dodan novi zapis!");
            } catch (error) {
                ToastAndroid.show("Nešto je pošlo po krivu", ToastAndroid.SHORT);
            }
        } else {
            Alert.alert("Novi brod", isValid);
        }
    }

    function validateRecord(): string {
        if (text.length < 2) {
            return "Zapis mora sadržavati barem 2 znaka.";
        }

        return "valid";
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Unos zapisa</Text>
            <Text style={styles.subtitle}>{shipName}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={text}
                    placeholder={"Unos zapisa"}
                    placeholderTextColor={"rgba(236, 236, 236, 0.3)"}
                    onChangeText={(text) => setText(text)}
                    multiline={true}
                />
            </View>
            <TouchableOpacity style={styles.spremiButton} activeOpacity={0.9} onPress={() => handleSave()}>
                <Text style={styles.spremiButtonText}>Spremi</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#181A49",
        alignItems: "center",
        marginTop: 20,
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
    subtitle: {
        textAlign: "center",
        color: "#ECECEC",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 18,
        marginTop: "10%",
        marginBottom: 10,
    },
    inputContainer: {
        marginTop: 30,
        borderColor: "#414496",
        borderWidth: 1,
        width: "80%",
        borderRadius: 10,
        padding: 15,
    },
    input: {
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
