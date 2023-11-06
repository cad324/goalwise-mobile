import { PaperProvider } from 'react-native-paper';
import { RootState, store } from './app/store'
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from './styles/global.Style';
import Login from './screens/auth/Login';
import NavWrapper from './components/NavWrapper';
import { AppRegistry } from 'react-native';

export type RootStackParamList = {
  Login: undefined,
  Dashboard: undefined,
}

export const Stack = createNativeStackNavigator();

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const initRoute = isAuthenticated ? "Dashboard" : "Login";
  return (
    <Stack.Navigator 
      initialRouteName={initRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={NavWrapper} />
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