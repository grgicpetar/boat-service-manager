import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Alert, ToastAndroid } from "react-native";
import { RootStackParamList } from "../../../App";

const brodovi = [
    { naziv: "Brod 1", key: "1" },
    { naziv: "Brod 2", key: "2" },
    { naziv: "Brod 3", key: "3" },
];

type NoviRadnikProps = NativeStackScreenProps<RootStackParamList, "NoviRadnik">;

export default function NoviRadnik({ navigation }: NoviRadnikProps) {
    const [name, setName] = useState<string>("");

    async function submitRadnik() {
        const radnikIsValid = validateRadnik();
        if (radnikIsValid === "valid") {
            try {
                const response = await fetch("http://192.168.0.16:3000/user", {
                    method: "post",
                    body: JSON.stringify({
                        name,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const json = await response.json();

                navigation.navigate("Radnik", { imeRadnika: name });

                Alert.alert("Novi radnik", "Uspješno dodan novi radnik!");
            } catch (error) {
                ToastAndroid.show("Nešto je pošlo po krivu", ToastAndroid.SHORT);
            }
        } else {
            Alert.alert("Novi radnik", radnikIsValid);
        }
    }

    function validateRadnik(): string {
        if (name.length < 2) {
            return "Korisničko ime mora sadržavati barem 2 znaka.";
        }

        return "valid";
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Novi radnik</Text>
            <View style={styles.inputGroup}>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={name}
                        style={styles.input}
                        placeholder={"Ime"}
                        placeholderTextColor={"rgba(236, 236, 236, 0.3)"}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={styles.spremiButton}
                activeOpacity={0.9}
                onPress={() => {
                    submitRadnik();
                }}
            >
                <Text style={styles.spremiButtonText}>Spremi</Text>
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
    title: {
        color: "#ECECEC",
        fontSize: 32,
        marginTop: "10%",
        textTransform: "uppercase",
    },
    inputGroup: {
        marginTop: 20,
        width: "70%",
    },
    inputContainer: {
        marginBottom: 20,
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
    zaduziZaBrodove: {
        textAlign: "center",
        color: "#ECECEC",
        marginTop: 10,
    },
    brodoviContainer: {
        width: "80%",
        marginTop: 10,
        marginBottom: 10,
    },
    brod: {
        backgroundColor: "#ECECEC",
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 5,
    },
    brodNaziv: {
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
