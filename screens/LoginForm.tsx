import { useState,useLayoutEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // firebase config dosyanın yolu
import { NativeStackScreenProps } from "@react-navigation/native-stack";    
import { RootStackParamList } from "../App"; // navigation param list

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginForm({ navigation }: Props) {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Hata", "Lütfen e-posta ve şifre giriniz.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Giriş Başarılı", "Başarıyla giriş yaptınız!", [
        {
          text: "Tamam",
          onPress: () => navigation.replace("Chat", { conversationId: "defaultId", otherUser: "defaultUser" }),
        },
      ]);
    } catch (e: any) {
      Alert.alert("Giriş Başarısız", e.message);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
      <TextInput
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Şifre"
        value={password}  
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
      <Button
        title="Hesabınız yok mu? Kayıt Ol"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center", fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 5 },
});
