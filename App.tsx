import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from "./screens/LoginForm";
import HomeScreen from "./screens/HomeScreen";
import RegisterForm from "./screens/RegisterForm";
import ChatScreen from "./screens/ChatScreen";
import { ThemeProvider } from "./ThemeContext";
import SettingsScreen from "./screens/SettingsScreen";


export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Settings: undefined;
  Chat: { conversationId: string; otherUser: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>(); 

export default function App() {
  return(
   
    <ThemeProvider>

    
    <NavigationContainer>
       
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginForm} options={{title:"giris yap"}}/>
        <Stack.Screen name="Register" component={RegisterForm} options={{title:"Kayit Ol"}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{title:"Ana Sayfa"}} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{title:"Sohbet"}} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{title:"Ayarlar"}} />
      </Stack.Navigator>
      
    </NavigationContainer>
  </ThemeProvider>
  )
}



