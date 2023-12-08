import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Chip, Menu, Text } from "react-native-paper";
import i18n from "../locales/i18n";
import { theme } from "../styles/global.Style";
import { setOpacity } from "../lib/utils";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type TaskCardProps = {
    id: string;
    title: string;
    days_of_week: number[]
    duration?: string;
};

type TaskStatus = 'Completed' | 'Not Started' | 'In Progress'

type RootStackParamList = {
    'ManageTask': { id: string; title: string, days_of_week: number[] };
};
  
type ManageTaskScreenNavigationProp = NavigationProp<RootStackParamList, 'ManageTask'>;

export default function TaskCard({id, title, days_of_week}: TaskCardProps) {

    const navigation = useNavigation<ManageTaskScreenNavigationProp>();

    const [status, setStatus] = useState<TaskStatus>('Not Started');
    const [menuVisible, setMenuVisible] = useState(false);

    const statusColors: Record<TaskStatus, string> = {
        'Completed': theme.colors.green,
        'In Progress': theme.colors.blue,
        'Not Started': theme.colors.purple,
    };

    const handleStatusChange = (newStatus: TaskStatus) => {
        setStatus(newStatus);
        setMenuVisible(false);
    };
    
    return (
        <Card style={styles.container}>
            <Card.Content>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Button
                        icon="pencil-outline"
                        onPress={() => navigation.navigate('ManageTask', { id, title, days_of_week })}
                        children={i18n.t('button.edit')}
                        contentStyle={{backgroundColor: setOpacity(theme.colors.primary, 0.1)}}
                    />
                </View>
            </Card.Content>
            <Card.Actions>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <Chip
                            textStyle={{ color: 'white' }}
                            style={{
                                backgroundColor: statusColors[status] || statusColors['Not Started'],
                                borderRadius: 20
                            }}
                        >
                            {status === "Completed" && "✓ "}{status}
                        </Chip>
                    </View>
                    <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={
                            <Button onPress={() => setMenuVisible(true)}>Set Status</Button>
                        }
                        >
                        <Menu.Item onPress={() => handleStatusChange('Completed')} title="Complete" />
                        <Menu.Item onPress={() => handleStatusChange('In Progress')} title="In Progress" />
                        <Menu.Item onPress={() => handleStatusChange('Not Started')} title="Not Started" />
                    </Menu>
                </View>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20, 
        backgroundColor: theme.colors.white, 
        borderRadius: 10
    },
    cardTitle: {
        fontWeight: '600',
        fontSize: 18,
    }
})
