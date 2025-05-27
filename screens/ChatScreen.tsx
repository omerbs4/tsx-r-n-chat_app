import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { auth } from "../firebase";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useTheme } from "../ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

const db = getFirestore();

export default function ChatScreen({ route }: Props) {

    const {theme} = useTheme();
    
    
  // Navigation'dan gelen parametreleri alıyoruz
  const { conversationId, otherUser } = route.params;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "messages", conversationId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return unsubscribe;
  }, [conversationId]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    await addDoc(collection(db, "messages", conversationId, "messages"), {
      text: message,
      senderId: auth.currentUser?.uid,
      createdAt: Timestamp.now(),
    });

    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat with {otherUser}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text
            style={{
              padding: 8,
              backgroundColor: item.senderId === auth.currentUser?.uid ? "#dcf8c6" : "#eee",
              marginVertical: 4,
              borderRadius: 6,
              alignSelf: item.senderId === auth.currentUser?.uid ? "flex-end" : "flex-start",
              maxWidth: "80%",
            }}
          >
            {item.text}
          </Text>
        )}
        inverted
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Mesaj yaz..."
        style={styles.input}
      />
      <Button title="Gönder" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginTop: 10, marginBottom: 5 },
});
