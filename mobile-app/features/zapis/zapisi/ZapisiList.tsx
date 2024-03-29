import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Zapis } from "../../../types";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";

type ZapisiProps = {
    shipId: number;
    shipName: string;
    navigation: StackNavigationProp<RootStackParamList, "Brod">;
};

export default function ZapisiList({ shipId, navigation, shipName }: ZapisiProps) {
    const [zapisi, setZapisi] = useState<Zapis[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchData = async () => {
            const responseZapisi = await fetch(`http://192.168.1.86:3000/record/ship/${shipId}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const jsonZapisi = await responseZapisi.json();
            setZapisi(jsonZapisi);
        };
        if (isFocused) {
            fetchData();
        }
    }, [shipId, isFocused]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{!zapisi.length ? "Trenutno nema zapisa za ovaj brod" : "Zapisi:"}</Text>
            <FlatList
                style={styles.listaZapisa}
                data={zapisi}
                renderItem={({ item }) => (
                    <View style={styles.listaZapisaItem}>
                        <Text style={styles.listaZapisaItemRadnikNaziv}>{item.user_name}</Text>
                        <Text style={styles.listaZapisaItemNaziv}>{item.text}</Text>
                    </View>
                )}
            />
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate("NoviZapis", { brodId: shipId, shipName })}
            >
                <AntDesign name="pluscircleo" size={32} color="#ECECEC" />
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
    listaZapisa: {
        marginTop: 10,
        width: "90%",
        flexGrow: 0,
    },
    listaZapisaItem: {
        backgroundColor: "#414496",
        marginBottom: 20,
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: "space-around",
        alignItems: "center",
    },
    title: {
        color: "#ECECEC",
    },
    listaZapisaItemNaziv: {
        color: "#ECECEC",
        fontSize: 20,
    },
    listaZapisaItemRadnikNaziv: {
        color: "#ECECEC",
        fontSize: 12,
    },
});
