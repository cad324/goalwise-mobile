import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { daysOfWeek } from "../lib/constants";
import { theme } from "../styles/global.Style";
import { setOpacity } from "../lib/utils";

type DatePickerProps = {
    selected: boolean,
    date: Date,
    select: Function
}

export default function DatePicker({selected, date, select}: DatePickerProps) {
    const dayInMonth = date.getDate();
    const dayOfWeek = daysOfWeek[date.getDay()].substring(0,3);

    const handleSelect = () => {
        select(date);
    }

    return (
        <TouchableOpacity activeOpacity={0.75} onPress={handleSelect}>
            <View style={selected ? styles.containerSelected : styles.container}>
                <Text style={selected ? [styles.date, {color: theme.colors.white}]: styles.date}>
                    {dayInMonth}
                </Text>
                <Text style={selected ? [styles.day, {color: theme.colors.white}]: styles.date}>
                    {dayOfWeek}
                </Text>
            </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: setOpacity(theme.colors.primary, 0.05),
        borderRadius: 20,
        width: 60,
        textAlign: 'center',
    },
    containerSelected: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: theme.colors.primary,
        borderRadius: 20,
        width: 60,
        textAlign: 'center'
    },
    day: {
        fontSize: 20,
        textAlign: 'center'
    },
    date: {
        fontSize: 16,
        textAlign: 'center'
    },
})