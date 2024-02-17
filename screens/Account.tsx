import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import i18n from "../locales/i18n";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../app/features/authSlice";
import api from "../lib/api.config";
import { useEffect } from "react";
import { RootState } from "../app/store";
import { theme } from "../styles/global.Style";

type User = {
    first_name: string,
    last_name: string,
    email: string,
    id: string,
} | null

export default function Account() {

    const dispatch = useDispatch();
    const user: User = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (!user) fetchUserId();
    }, []);

    const fetchUserDetails = async (id: string) => {
        try {
            const response = await api.get(`/users/${id}/`);
            dispatch(setUser(response.data));
        } catch (err) {
            console.error('[fetchUser]', err);
        }
    }

    const fetchUserId = async () => {
        try {
            const response = await api.get('/user-id/');
            const id = response.data.id;
            fetchUserDetails(id);
        } catch (err) {
            console.log('[fetchUserId]', err);
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoContainer}>
                <Text style={styles.userName}>John Doe</Text>
                <Text style={styles.userEmail}>john.doe@example.com</Text>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
                    <Text style={styles.actionButtonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => dispatch(logout())}>
                    <Text style={styles.actionButtonText}>{i18n.t('button.logout')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    userInfoContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    userEmail: {
      fontSize: 16,
      color: 'gray',
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: 25
    },
    actionButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    actionButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
});