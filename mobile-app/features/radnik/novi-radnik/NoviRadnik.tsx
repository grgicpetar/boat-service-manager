import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";

const brodovi = [
  { naziv: "Brod 1", key: "1" },
  { naziv: "Brod 2", key: "2" },
  { naziv: "Brod 3", key: "3" },
];

export default function NoviRadnik() {
  const [ime, setIme] = useState<string>("");
  const [prezime, setPrezime] = useState<string>("");
  const [izabraniBrodoviKeys, setIzabraniBrodoviKeys] = useState<string[]>([]);

  function toggleIzabraniBrod(key: string) {
    if (
      !izabraniBrodoviKeys.find((izabraniBrodKey) => izabraniBrodKey === key)
    ) {
      setIzabraniBrodoviKeys((old) => [...old, key]);
    } else {
      const filtiriraniIzabraniBrodoviKeys = izabraniBrodoviKeys.filter(
        (izabraniBrod) => izabraniBrod !== key
      );
      setIzabraniBrodoviKeys(filtiriraniIzabraniBrodoviKeys);
    }
  }

  function submitRadnik() {
    const radnikIsValid = validateRadnik();
    if (radnikIsValid === "valid") {
      Alert.alert("Novi radnik", "Uspješno dodan novi radnik!");
    } else {
      Alert.alert("Novi radnik", radnikIsValid);
    }
  }

  function validateRadnik(): string {
    if (ime.length < 2) {
      return "Ime mora sadržavati barem 2 znaka.";
    }

    if (prezime.length < 2) {
      return "Prezime mora sadržavati barem 2 znaka.";
    }

    return "valid";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novi radnik</Text>
      <View style={styles.inputGroup}>
        <View style={styles.inputContainer}>
          <TextInput
            value={ime}
            style={styles.input}
            placeholder={"Ime"}
            placeholderTextColor={"rgba(236, 236, 236, 0.3)"}
            onChangeText={(text) => setIme(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={prezime}
            style={styles.input}
            placeholder={"Prezime"}
            placeholderTextColor={"rgba(236, 236, 236, 0.3)"}
            onChangeText={(text) => setPrezime(text)}
          />
        </View>
      </View>
      <Text style={styles.zaduziZaBrodove}>Zaduži za brodove</Text>
      <View style={styles.brodoviContainer}>
        {brodovi.map((brod, i) => (
          <TouchableOpacity
            activeOpacity={0.9}
            key={i}
            style={[
              styles.brod,
              {
                backgroundColor: izabraniBrodoviKeys.find(
                  (izabraniBrodKey) => izabraniBrodKey === brod.key
                )
                  ? "#9bc8ee"
                  : "#ECECEC",
              },
            ]}
            onPress={() => toggleIzabraniBrod(brod.key)}
          >
            <Text style={styles.brodNaziv}>{brod.naziv}</Text>
          </TouchableOpacity>
        ))}
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
