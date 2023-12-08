import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import i18n from "../locales/i18n";
import { useDispatch } from "react-redux";
import { logout } from "../app/features/authSlice";

export default function Account() {

    const dispatch = useDispatch();
    
    return (
        <SafeAreaView style={styles.container}>
            <Button 
                onPress={() => dispatch(logout())} 
                mode="contained"
            >
                {i18n.t('button.logout')}
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
});