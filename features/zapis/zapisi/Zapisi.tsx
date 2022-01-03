import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const zapisiMock = [
    { naziv: "Zapis 1", key: "1", radnikNaziv: "Radnik 1" },
    { naziv: "Zapis 2", key: "2", radnikNaziv: "Radnik 2" },
    { naziv: "Zapis 3", key: "3", radnikNaziv: "Radnik 3" },
];

export default function Zapisi() {
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.listaZapisa}
                data={zapisiMock}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.listaZapisaItem} activeOpacity={0.9}>
                        <Text style={styles.listaZapisaItemNaziv}>{item.naziv}</Text>
                        <Text style={styles.listaZapisaItemRadnikNaziv}>{item.radnikNaziv}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity activeOpacity={0.9}>
                <AntDesign name="pluscircleo" size={32} color="#ECECEC" />
            </TouchableOpacity>
            <Text style={styles.prikaziSve}>Prikaži sve</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: "#181A49",
        alignItems: "center",
    },
    listaZapisa: {
        marginTop: 50,
        width: "90%",
        flexGrow: 0,
    },
    listaZapisaItem: {
        backgroundColor: "#ECECEC",
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    listaZapisaItemNaziv: {
        color: "#181A49",
        fontSize: 20,
    },
    listaZapisaItemRadnikNaziv: {
        color: "#181A49",
        fontSize: 12,
    },
    prikaziSve: {
        color: "#2272B4",
        fontSize: 12,
        marginTop: 5,
    },
});
