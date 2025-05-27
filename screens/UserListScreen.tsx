import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { auth } from "../firebase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
const db = getFirestore();

export default function UserListScreen({ navigation }: Props) {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const fetched = snapshot.docs
        .map((doc) => doc.data())
        .filter((user) => user.uid !== auth.currentUser?.uid); // kendini gösterme
      setUsers(fetched);
    };
    fetchUsers();
  }, []);

  const generateConversationId = (uid1: string, uid2: string) =>
    [uid1, uid2].sort().join("_");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kişiler</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => {
              const convId = generateConversationId(auth.currentUser?.uid!, item.uid);
              navigation.navigate("Chat", {
                conversationId: convId,
                otherUser: item.email,
              });
            }}
          >
            <Text>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  userItem: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginBottom: 8,
  },
});
