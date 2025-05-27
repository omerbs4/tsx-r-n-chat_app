import { useTheme } from "@/ThemeContext";
import {View,Button} from "react-native";

export default function SettingsScreen() {
    const {setThemeName} = useTheme();
    return (
        <View>
            <Button title="Purple Theme" onPress={() => setThemeName("purple")} />
            <Button title="Blue Theme" onPress={() => setThemeName("blue")} />
        </View>
    );
}