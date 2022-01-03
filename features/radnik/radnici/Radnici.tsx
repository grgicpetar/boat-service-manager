import React from "react";
<<<<<<< HEAD
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const radniciMock = [
  { naziv: "Radnik 1", key: "1" },
  { naziv: "Radnik 2", key: "2" },
  { naziv: "Radnik 3", key: "3" },
];

export default function Brodovi() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome
          name="group"
          size={32}
          color="#ECECEC"
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>Radnici</Text>
      </View>
      <FlatList
        style={styles.listaRadnika}
        data={radniciMock}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listaRadnikaItem}
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate("Radnik", { imeRadnika: item.naziv })
            }
          >
            <Text style={styles.listaRadnikaItemText}>{item.naziv}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate("NoviRadnik")}
      >
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
    fontSize: 32,
  },
  listaRadnika: {
    marginTop: 50,
    width: "90%",
    flexGrow: 0,
  },
  listaRadnikaItem: {
    backgroundColor: "#ECECEC",
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  listaRadnikaItemText: {
    textAlign: "center",
    color: "#181A49",
    fontSize: 20,
  },
=======
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

const radniciMock = [
    { naziv: "Radnik 1", key: "1" },
    { naziv: "Radnik 2", key: "2" },
    { naziv: "Radnik 3", key: "3" },
];

type BrodoviProps = NativeStackScreenProps<RootStackParamList, "Brodovi">;

export default function Brodovi({ navigation }: BrodoviProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome name="group" size={32} color="#ECECEC" style={styles.headerIcon} />
                <Text style={styles.headerText}>Radnici</Text>
            </View>
            <FlatList
                style={styles.listaRadnika}
                data={radniciMock}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.listaRadnikaItem}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate("Radnik", { imeRadnika: item.naziv })}
                    >
                        <Text style={styles.listaRadnikaItemText}>{item.naziv}</Text>
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
        fontSize: 32,
    },
    listaRadnika: {
        marginTop: 50,
        width: "90%",
        flexGrow: 0,
    },
    listaRadnikaItem: {
        backgroundColor: "#ECECEC",
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 10,
    },
    listaRadnikaItemText: {
        textAlign: "center",
        color: "#181A49",
        fontSize: 20,
    },
>>>>>>> 293b4f0 (Updating packages)
});
