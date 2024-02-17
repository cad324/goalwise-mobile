import { PaperProvider } from 'react-native-paper';
import { RootState, store } from './app/store'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from './styles/global.Style';
import Login from './screens/auth/Login';
import NavWrapper from './components/NavWrapper';
import ManageTaskScreen from './screens/ManageTask';
import { AppRegistry } from 'react-native';
import Tasks from './screens/Tasks';
import Account from './screens/Account';
import { useEffect, useState } from 'react';
import { setAuthStatus } from './app/features/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './screens/SplashScreen';
import axios from 'axios';
import { API_ENDPOINT } from './lib/constants';
import Register from './screens/auth/Register';

export type RootStackParamList = {
  Login: undefined,
  LoggedInView: undefined,
  Register: undefined,
  ManageTask: { id: string; title: string, days_of_week: number[] },
  Tasks: undefined,
  Account: undefined,
}

export const Stack = createNativeStackNavigator();

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [initialized, setInitialized] = useState(false);

  const initializeApp = async () => {
    if (!isAuthenticated) {
      const refresh = await AsyncStorage.getItem("refreshToken");
      try {
        if (refresh) {
          const response = await axios.post(`${API_ENDPOINT}/token/verify/`, { token: refresh });
          if (response.status === 200) {
            dispatch(setAuthStatus(true));
          }
        }
      } catch (err) {
        console.error("[initializeApp]", err);
      } finally {
        setInitialized(true);
      }
    }
  }

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    isAuthenticated ?
      <Stack.Navigator 
        initialRouteName={"LoggedInView"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoggedInView" component={NavWrapper} />
        <Stack.Screen name="ManageTask" component={ManageTaskScreen} />
        <Stack.Screen name="Tasks" component={Tasks} />
        <Stack.Screen name="Account" component={Account} />
      </Stack.Navigator> : !isAuthenticated && initialized ? 
      <Stack.Navigator 
        initialRouteName={"Login"}
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen name="Login" options={{}} component={Login} />
        <Stack.Screen 
          name="Register"
          options={{ title: 'Create Account' }} 
          component={Register} />
      </Stack.Navigator> :
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
  );
}

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
            <App />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}

AppRegistry.registerComponent('GoalWise', () => Main);