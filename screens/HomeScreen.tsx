import React from "react";
import { useLayoutEffect } from "react";
import { View,Text,Button,StyleSheet,Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the import path as necessary  
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App"; // Adjust the import path as necessary

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
    
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logout Successful", "You have logged out successfully!");
      navigation.replace("Login");
    } catch (e: any) {
      Alert.alert("Logout Failed", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen, succesfull</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, alignItems: "center" },
  title: { fontSize: 20, marginBottom: 20 },
});