import { Snackbar } from "react-native-paper";
import { theme } from "../styles/global.Style";
import { GrowlLevel } from "../lib/types";

type GrowlProps = {
    duration?: number,
    level: GrowlLevel,
    message: string,
    visible: boolean
}

export default function Growl({message, level, visible, duration=5000}: GrowlProps) {
    const growlIcon = level === 'error' ? 'alert-circle' : 
        level === 'warning' ? 'alert' : 'check-circle'
    const backgroundColor = level === 'error' ? theme.colors.red : 
        level === 'warning' ? theme.colors.orange : theme.colors.green;
    
    return (
        <Snackbar
            visible={visible}
            onDismiss={() => {}}
            duration={duration}
            style={{backgroundColor}}
            icon={growlIcon}
            onIconPress={() => {}}
        >
            {message}
        </Snackbar>
    )
}