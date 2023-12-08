import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Modal, Portal, Text, Button, TextInput, Title, Chip } from 'react-native-paper';
import { useState } from 'react';
import i18n from '../locales/i18n';
import { daysAbbreviated } from '../lib/constants';
import api from '../lib/api.config';

type AddTaskModalProps = {
    visible: boolean,
    onDismiss: () => void,
    onError: (msg: string) => void,
    onSuccess: (msg: string) => void,
}

export default function AddTaskModal({ visible, onDismiss, onError, onSuccess }: AddTaskModalProps) {

    const [taskName, setTaskName] = useState('');
    const [selectedDays, setSelectedDays] = useState<boolean[]>([false, false, false, false, false, false, false]);

    const reset = () => {
        setTaskName('');
        setSelectedDays([false, false, false, false, false, false, false]);
    }
    
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

    const submitTask = async () => {
        const formData = {
          title: taskName,
          days_of_week: selectedDaysAsList(),
        };
        console.log(formData);
        try {
            const response = await api.post('/tasks/', formData);
            const { data } = response;
            console.log("[DATA]", data, response.status, response.statusText);
            if (response.status === 201) {
                handleDismiss();
                onSuccess("Task successfully created");
            } else {
                throw Error(data!.message);
            };
        } catch (err) {
            console.log("[submitTask]", err);
            onError("idk something went wrong though lol");
        }
    };

    const handleDismiss = () => {
        onDismiss();
        reset();
    };

    return (
        <Portal>
            <View style={styles.container}>
                <Modal onDismiss={handleDismiss} visible={visible} contentContainerStyle={styles.modal}>
                    <ScrollView>
                        <Card>
                            <Card.Content>
                                <Title>
                                    {i18n.t('tasks.addTaskModal.title')}
                                </Title>
                                <View style={{height: 20}}></View>
                                <TextInput
                                    label={i18n.t('tasks.addTaskModal.taskName')}
                                    value={taskName}
                                    maxLength={50}
                                    onChangeText={(text) => setTaskName(text)}
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
                                <Button mode="contained" onPress={submitTask}>
                                    {i18n.t('button.submit')}
                                </Button>
                            </Card.Content>
                        </Card>
                    </ScrollView>
                </Modal>
            </View>
        </Portal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dayChip: {
        borderRadius: 50,
    },
    dayChipSelected: {
        borderRadius: 50,
        backgroundColor: 'rgba(0,128,128,0.5)',
    },
    daysRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingVertical: 24
    },
    dayChipText: {
        fontSize: 10
    }
})