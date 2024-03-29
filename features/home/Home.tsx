import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

type HomeProps = StackScreenProps<RootStackParamList, "Home">;

export default function Home({ route }: HomeProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.username}>
        {route.params.username} (administrator)
      </Text>
      <TouchableOpacity
        style={styles.menuButton}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate("Brodovi");
        }}
      >
        <Fontisto
          name="ship"
          size={24}
          color="#181A49"
          style={styles.menuButtonIcon}
        />
        <Text style={styles.menuButtonText}>Brodovi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuButton}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate("Radnici");
        }}
      >
        <FontAwesome
          name="group"
          size={24}
          color="#181A49"
          style={styles.menuButtonIcon}
        />
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
  logo: {
    width: 80,
    height: 80,
    marginTop: "10%",
  },
  username: {
    color: "#ECECEC",
    fontSize: 12,
    marginBottom: "30%",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECECEC",
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
    color: "#181A49",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 24,
  },
});
