import { View } from "react-native";
import { Button, Text, Divider, TextInput, Snackbar } from "react-native-paper";
import styles, { theme } from "../../styles/global.Style";
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import i18n from '../../locales/i18n';
import { useDispatch } from "react-redux";
import { setAuthStatus, setTokens } from "../../app/features/authSlice";
import Growl from "../../components/Growl";
import { API_ENDPOINT } from "../../lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList>
type UserPass = {
  username: string,
  password: string
}

function Login({ navigation }: Props) {

  const dispatch = useDispatch();

  const [loadingLoginBtn, setLoadingLoginBtn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [growlVisible, setGrowlVisible] = useState(false);

  const showGrowl = (duration=5000) => {
    setGrowlVisible(true);
    setTimeout(() => {
      setGrowlVisible(false);
    }, duration);
  }

  const loginWithEmailPassword = async () => {
    setLoadingLoginBtn(true);
    const apiEndpoint = `${API_ENDPOINT}/token/`;
    const credentials: UserPass = { username, password };

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      if (response.ok) {
        const tokens = await response.json();
        console.log("[login_successful]");
        dispatch(setTokens(tokens));
        dispatch(setAuthStatus(true));
        await AsyncStorage.setItem('accessToken', tokens.access);
        await AsyncStorage.setItem('refreshToken', tokens.refresh);
      }
      if (response.status >= 400 && response.status < 500) {
        setFeedbackMessage(i18n.t('login.invalidCredentials'));
      }
      if (response.status >= 500) {
        setFeedbackMessage(i18n.t('error.networkIssue'));
      }
      if (!response.ok) 
        throw Error(`${await response.text()} \nStatus: ${response.status}}`);
    } catch (err) {
      console.log("[ERROR]:", err);
      showGrowl();
    }
    setLoadingLoginBtn(false);
  }

  return (
    <SafeAreaProvider>
      <View style={[styles.container, styles.padding, styles.backgroundTeal]}>
        <Text variant="displayLarge">
          {i18n.t('appName')}
        </Text>
        <View style={{height: 32}}></View>
        <Text variant="bodyLarge">
          {i18n.t('login.desc')}
        </Text>
        <View style={{height: 32}}></View>
        <View>
          <TextInput
            value={username}
            onChangeText={setUsername}
            label={i18n.t('login.userOrPass')} />
          <View style={{height: 8}}></View>
          <TextInput
            secureTextEntry
            onChangeText={setPassword}
            label={i18n.t('login.password')} />
        </View>
        <View style={{height: 32}}></View>
        <Button
          accessibilityLabel="Login"
          loading={loadingLoginBtn}
          style={{borderRadius: 4, width: '100%'}}
          buttonColor={theme.colors.primary}
          mode="contained"
          icon={'login'}
          onPress={loginWithEmailPassword}>
            <Text style={{color: theme.colors.white}} variant="labelLarge">
              {i18n.t('button.login')}
            </Text>
        </Button>
        <View style={{height: 24}}></View>
        <Divider />
        <View style={{height: 20}}></View>
        <Button
          accessibilityLabel="Sign up"
          style={{borderRadius: 80, width: '100%'}}
          mode="elevated"
          onPress={() => console.log("signup")}>
            <Text variant="labelLarge">{i18n.t('button.createAccount')}</Text>
        </Button>
        <StatusBar style="auto" />
      </View>
      <Growl
        visible={growlVisible}
        level={"error"}
        message={feedbackMessage}/>
    </SafeAreaProvider>
  );
}

export default Login;