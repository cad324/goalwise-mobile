import { NavigationProp, useNavigation } from "@react-navigation/native"
import { StyleSheet, View } from "react-native"
import { Appbar, Button, Chip, Dialog, Portal, Text, TextInput } from "react-native-paper"
import { RouteProp } from '@react-navigation/native';
import { setOpacity, showGrowl, truncate } from "../lib/utils";
import { theme } from "../styles/global.Style";
import { useEffect, useState } from "react";
import i18n from "../locales/i18n";
import { daysAbbreviated } from "../lib/constants";
import api from "../lib/api.config";
import { GrowlLevel } from "../lib/types";
import Growl from "../components/Growl";

type RootStackParamList = {
    'Manage Task': { id: string; title: string, days_of_week: number[] };
};

type ManageTaskScreenRouteProp = RouteProp<RootStackParamList, 'Manage Task'>;

type ManageTaskScreenProps = {
    route: ManageTaskScreenRouteProp;
};

type TasksRootStackParam = {
    'LoggedInView': { 
        id: string,
        showDeletedGrowl: boolean 
    };
};
  
type TasksScreenNavigationProp = NavigationProp<TasksRootStackParam, 'LoggedInView'>;

export default function ManageTaskScreen({ route }: ManageTaskScreenProps) {

    const { id, title, days_of_week } = route.params;

    const navigation = useNavigation<TasksScreenNavigationProp>();

    const [newTitle, setNewTitle] = useState<string>(title);
    const [selectedDays, setSelectedDays] = useState<boolean[]>([false, false, false, false, false, false, false]);
    const [feedbackLevel, setFeedbackLevel] = useState<GrowlLevel>('success');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [growlVisible, setGrowlVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    useEffect(() => {
        setSelectedDays((prev) => prev.map((_, index) => days_of_week.indexOf(index+1) !== -1));
    }, []);
    
    const handleDaySelection = (dayOfTheWeek: number) => {
        let newSelectedDays = [...selectedDays];
        newSelectedDays[dayOfTheWeek] = !newSelectedDays[dayOfTheWeek];
        setSelectedDays(newSelectedDays);
    };

    const selectedDaysAsList = () => {
        return selectedDays
                .map((selected, index) => selected ? index+1 : null)
                .filter(item => !!item);
    }

    const updateTask = async () => {
        const newSelectedDays = selectedDaysAsList();
        try {
            const data = { id, title: newTitle, days_of_week: newSelectedDays};
            const response = await api.patch(`/tasks/${id}/`, data);
            if (response.status === 200) {
                setFeedbackMessage(i18n.t('tasks.taskUpdated'));
                showGrowl(setGrowlVisible, setFeedbackLevel, 'success');
            }
        } catch (err) {
            setFeedbackMessage(i18n.t('error.somethingWrong'));
            showGrowl(setGrowlVisible, setFeedbackLevel, 'error');
            console.error("[updateTask]", err);
        }
    }

    const deleteTask = async () => {
        try {
            const response = await api.delete(`/tasks/${id}/`);
            if (response.status == 204) {
                setDeleteModalVisible(false);
                navigation.navigate('LoggedInView', {
                    id,
                    showDeletedGrowl: true
                });
            }
            console.info('[deleteTask]', response.status);
        } catch (err) {
            console.error('[deleteTask]', err);
        }
    }
    
    return (
        <View style={{flex: 1}}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                    navigation.goBack();
                }} />
                <Appbar.Content title={truncate(newTitle, 20)} />
            </Appbar.Header>
            <View style={styles.container}>
                <View>
                    <TextInput
                        label={i18n.t('tasks.addTaskModal.taskName')}
                        value={newTitle}
                        maxLength={50}
                        onChangeText={(text) => setNewTitle(text)}
                    />
                    <View style={{height: 20}}></View>
                    <Text variant='labelLarge'>
                        {i18n.t('tasks.addTaskModal.repeatOn')}:
                    </Text>
                    <Text>
                        {daysAbbreviated
                            .map(day => day[1])
                            .filter((_, index) => selectedDays[index])
                            .join(", ")}
                    </Text>
                    <View style={styles.daysRow}>
                        {daysAbbreviated.map((day, index) => 
                            <Chip
                                key={day[1]}
                                textStyle={styles.dayChipText}
                                style={selectedDays[index] ? styles.dayChipSelected : styles.dayChip}
                                selected={selectedDays[index]}
                                showSelectedCheck={false}
                                showSelectedOverlay={true}
                                onPress={() => handleDaySelection(index)}
                                mode='outlined'
                            >
                                {day[0]}
                            </Chip>
                        )}
                    </View>
                </View>
                <View style={styles.row}>
                    <Button style={styles.updateBtn} mode="contained" onPress={updateTask}>
                        <Text variant="bodyLarge" style={styles.buttonLabel}>{i18n.t('button.update')}</Text>
                    </Button>
                    <Button 
                        icon={'delete'} 
                        style={styles.deleteBtn} 
                        mode="contained" 
                        onPress={() => setDeleteModalVisible(true)}
                    >
                        <Text variant="bodyLarge" style={styles.buttonLabel}>{i18n.t('button.delete')}</Text>
                    </Button>
                </View>
            </View>
            <Growl level={feedbackLevel} message={feedbackMessage} visible={growlVisible} />
            <Portal>
                <Dialog 
                    visible={deleteModalVisible} 
                    style={{backgroundColor: theme.colors.white}}
                    onDismiss={() => setDeleteModalVisible(false)}
                >
                    <Dialog.Title>
                        {i18n.t('tasks.deleteTaskModal.title')}
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            {i18n.t('tasks.deleteTaskModal.body')}
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button 
                            onPress={deleteTask}
                            textColor={theme.colors.red}
                        >
                            {i18n.t('button.delete')}
                        </Button>
                        <Button
                            onPress={() => setDeleteModalVisible(false)}
                        >
                            {i18n.t('button.cancel')}
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    }, 
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        marginTop: 32
    },
    updateBtn: {
        flexGrow: 1,
        backgroundColor: setOpacity(theme.colors.primary, 0.9),
        borderRadius: 5
    },
    deleteBtn: {
        flexGrow: 1,
        backgroundColor: setOpacity(theme.colors.red, .75),
        borderRadius: 5
    },
    buttonLabel: {
        color: theme.colors.white,
        fontWeight: '700'
    },
    dayChip: {
        borderRadius: 50,
    },
    dayChipSelected: {
        borderRadius: 50,
        backgroundColor: 'rgba(0,128,128,0.5)',
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingVertical: 16
    },
    dayChipText: {
        fontSize: 10
    }
})