import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Modal, Portal, Text, Button, Checkbox, TextInput, Title, RadioButton, Switch, Chip } from 'react-native-paper';
import { useState } from 'react';
import i18n from '../locales/i18n';
import { theme } from '../styles/global.Style';

type AddTaskModalProps = {
    visible: boolean,
    onDismiss: () => void
}

const daysAbbreviated = [
    [i18n.t('days.abbrevLetter.sunday'), i18n.t('days.abbrev.sunday')],
    [i18n.t('days.abbrevLetter.monday'), i18n.t('days.abbrev.monday')], 
    [i18n.t('days.abbrevLetter.tuesday'), i18n.t('days.abbrev.tuesday')], 
    [i18n.t('days.abbrevLetter.wednesday'), i18n.t('days.abbrev.wednesday')], 
    [i18n.t('days.abbrevLetter.thursday'), i18n.t('days.abbrev.thursday')], 
    [i18n.t('days.abbrevLetter.friday'), i18n.t('days.abbrev.friday')], 
    [i18n.t('days.abbrevLetter.saturday'), i18n.t('days.abbrev.saturday')]
];

export default function AddTaskModal({ visible, onDismiss }: AddTaskModalProps) {

    const [taskName, setTaskName] = useState('');
    const [selectedDays, setSelectedDays] = useState([false, false, false, false, false, false, false]);

    const reset = () => {
        setTaskName('');
        setSelectedDays([false, false, false, false, false, false, false]);
    }
    
    const handleDaySelection = (dayOfTheWeek: number) => {
        setSelectedDays({
          ...selectedDays,
          [dayOfTheWeek]: !selectedDays[dayOfTheWeek],
        });
    };

    const handleSubmit = () => {
        const formData = {
          taskName,
          selectedDays,
        };
        console.log(formData);
        handleDismiss();
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
                            <Button mode="contained" onPress={handleSubmit}>
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
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15
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
