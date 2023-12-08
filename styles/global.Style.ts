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
      primary: '#008080',
      secondary: '#F9F871',
      white: '#FFF',
      green: '#209B87',
      blue: '#00809E',
      red: '#8B1C00',
      purple: '#7072B4',
      orange: '#E16742'
    },
};

export default styles;