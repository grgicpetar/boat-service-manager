import React, { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useStore } from "../../store/zustand-store";

type PrijavaProps = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: PrijavaProps) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const isFocused = useIsFocused();
    const setUser = useStore().setUser;

    useEffect(() => {
        if (!isFocused) {
            setUsername("");
            setPassword("");
        }
    }, [isFocused]);

    const handleLogin = async () => {
        try {
            const response = await fetch("http://192.168.0.16:3000/login", {
                method: "post",
                body: JSON.stringify({
                    username,
                    password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            let user = json[0];
            setUser({
                name: user.name,
                role: user.role,
            });
            if (user.role === 1) {
                navigation.navigate("HomeAdmin");
            } else {
                navigation.navigate("HomeRadnik");
            }
        } catch (error) {
            ToastAndroid.show("Krivo korisničko ime ili lozinka", ToastAndroid.SHORT);
        } finally {
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../assets/logo.png")} />
            <Text style={styles.title}>Boat Service Manager</Text>
            <View style={styles.loginForm}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={username}
                        placeholder={"Korisničko ime"}
                        placeholderTextColor={"rgba(236, 236, 236, 0.3)"}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={password}
                        placeholder={"Lozinka"}
                        placeholderTextColor={"rgba(236, 236, 236, 0.3)"}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <TouchableOpacity style={styles.loginButton} activeOpacity={0.9} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Prijava</Text>
                </TouchableOpacity>
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
    logo: {
        width: 80,
        height: 80,
        marginTop: "10%",
    },
    title: {
        color: "#ECECEC",
        fontSize: 28,
    },
    loginForm: {
        marginTop: "40%",
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
    loginButton: {
        backgroundColor: "#ECECEC",
        padding: 10,
        borderRadius: 10,
    },
    loginButtonText: {
        textAlign: "center",
        color: "#181A49",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 16,
    },
});
