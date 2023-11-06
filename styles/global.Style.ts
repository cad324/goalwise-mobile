import { StyleSheet } from "react-native";
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 24
    },
    fullWidth: {
        width: "100%",
    },
    padding: {
        padding: 24
    },
    alignCenter: {
        alignItems: 'center'
    },
    backgroundTeal: {
        backgroundColor: 'rgba(0,128,128, 0.05)'
    },
});

export const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'teal',
      secondary: 'yellow',
      white: 'white',
    },
};

export default styles;