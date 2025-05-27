import React,{useState} from "react";
import { View,Text,TextInput,Button,StyleSheet,Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App"; // Adjust the import path as necessary
import { getFirestore,setDoc,doc } from "firebase/firestore";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterForm({ navigation }: Props) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const db = getFirestore();

    const handleRegister = async () => {
        try{
            const userCredental = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredental.user;
            Alert.alert("Registration Successful", "You have been registered successfully!");

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,});
                navigation.navigate("Login");
            

        }
        catch(e:any) {
            Alert.alert("Registration Failed", e.message);
            setEmail("");
            setPassword("");
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                value={password}  
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />    
            <Button 
                title="Already have an account? Login"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    );

} 
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center", fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 5 },
});

