import { View, Text } from "react-native";
import styles from "../../styles/global.Style";
import { StatusBar } from 'expo-status-bar';

function Register() {
    return (
    <View style={styles.container}>
        <Text>You are creating an account now</Text>
        <StatusBar style="auto" />
      </View>
    );
}

export default Register;