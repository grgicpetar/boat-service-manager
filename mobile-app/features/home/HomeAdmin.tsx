import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
import { RootStackParamList } from "../../App";
import { useStore } from "../../store/zustand-store";

type HomeProps = NativeStackScreenProps<RootStackParamList, "HomeAdmin">;

export default function HomeAdmin({ route, navigation }: HomeProps) {
    const user = useStore().user;
    return (
        <View style={styles.container}>
            <Text style={styles.username}>{user?.name} (administrator)</Text>
            <Image style={styles.logo} source={require("../../assets/logo.png")} />
            <TouchableOpacity
                style={styles.menuButton}
                activeOpacity={0.9}
                onPress={() => {
                    navigation.navigate("Brodovi");
                }}
            >
                <Fontisto name="ship" size={24} color="#ECECEC" style={styles.menuButtonIcon} />
                <Text style={styles.menuButtonText}>Brodovi</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuButton}
                activeOpacity={0.9}
                onPress={() => {
                    navigation.navigate("Radnici");
                }}
            >
                <FontAwesome name="group" size={24} color="#ECECEC" style={styles.menuButtonIcon} />
                <Text style={styles.menuButtonText}>Radnici</Text>
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
    username: {
        color: "#ECECEC",
        fontSize: 12,
        marginTop: 10,
        textAlign: "right",
    },
    logo: {
        width: 80,
        height: 80,
        marginTop: "10%",
        marginBottom: "30%",
    },
    menuButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#414496",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: 200,
        marginBottom: 50,
    },
    menuButtonIcon: {
        marginRight: 10,
    },
    menuButtonText: {
        textAlign: "center",
        color: "#ECECEC",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 18,
    },
});
