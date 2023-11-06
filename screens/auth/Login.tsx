import { View } from "react-native";
import { Button, Text, Divider, TextInput } from "react-native-paper";
import styles, { theme } from "../../styles/global.Style";
import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import i18n from '../../locales/i18n';

type Props = NativeStackScreenProps<RootStackParamList>

function Login({ navigation }: Props) {

  const [loadingLoginBtn, setLoadingLoginBtn] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = () => {
    const email: string | null = emailRef.current;
    const password: string | null = emailRef.current;
    navigation.navigate('Dashboard');
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
            ref={emailRef}
            label={i18n.t('login.userOrPass')} />
          <View style={{height: 8}}></View>
          <TextInput
            secureTextEntry
            ref={passwordRef}
            label={i18n.t('login.password')} />
        </View>
        <View style={{height: 32}}></View>
        <Button
          accessibilityLabel="Login"
          loading={loadingLoginBtn}
          style={{borderRadius: 4, width: '100%'}}
          buttonColor={theme.colors.primary}
          mode="elevated"
          onPress={handleLogin}>
            <Text style={{color: theme.colors.white}} variant="labelLarge">
              {i18n.t('button.login')}
            </Text>
        </Button>
        <View style={{height: 24}}></View>
        <Divider />
        <View style={{height: 20}}></View>
        <Button
          accessibilityLabel="Sign up"
          loading={loadingLoginBtn}
          style={{borderRadius: 80, width: '100%'}}
          mode="elevated"
          onPress={() => console.log("signup")}>
            <Text variant="labelLarge">{i18n.t('button.createAccount')}</Text>
        </Button>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

export default Login;