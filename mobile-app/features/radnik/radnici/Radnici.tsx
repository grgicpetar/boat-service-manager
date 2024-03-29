import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { User } from "../../../types";

type RadniciProps = NativeStackScreenProps<RootStackParamList, "Radnici">;

export default function Radnici({ navigation }: RadniciProps) {
    const [radnici, setRadnici] = useState<User[]>();
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://192.168.1.86:3000/user`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();

            setRadnici(
                json
                    .filter((user: any) => user.role === 2)
                    .map((user: any, i: number) => {
                        return {
                            ...user,
                            id: i,
                        };
                    })
            );
        };
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome name="group" size={32} color="#ECECEC" style={styles.headerIcon} />
                <Text style={styles.headerText}>Radnici</Text>
            </View>
            <FlatList
                style={styles.listaRadnika}
                data={radnici}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item.name}
                        style={styles.listaRadnikaItem}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate("Radnik", { imeRadnika: item.name })}
                    >
                        <Text style={styles.listaRadnikaItemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("NoviRadnik")}>
                <AntDesign name="pluscircleo" size={32} color="#ECECEC" />
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "10%",
    },
    headerIcon: {
        marginRight: 10,
    },
    headerText: {
        textAlign: "center",
        color: "#ECECEC",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 24,
    },
    listaRadnika: {
        marginTop: 50,
        width: "90%",
        flexGrow: 0,
    },
    listaRadnikaItem: {
        backgroundColor: "#414496",
        marginBottom: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    listaRadnikaItemText: {
        textAlign: "center",
        color: "#ECECEC",
        fontSize: 20,
    },
});
