import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, Text } from 'react-native-paper';
import AddTaskModal from "../components/AddTaskModal";
import { useState } from "react";
import i18n from "../locales/i18n";
import { Agenda, CalendarProvider, AgendaSchedule, AgendaEntry, DateData } from 'react-native-calendars';

type TaskProps = {
    title: string;
    daysOfWeek: string;
}

export default function Tasks() {
    const [modalVisible, setModalVisible] = useState(false);
    const [tasks, setTasks] = useState<TaskProps>();
    const [items, setItems] = useState<AgendaSchedule>({
      '2023-11-05': [{
        name: 'Cook at home',
        height: 2,
        day: 'Monday'
      }]
    });

    const dismissAddTaskModal = () => setModalVisible(false);

    const today = new Date().toDateString();

    const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
      const fontSize = isFirst ? 16 : 14;
      const color = isFirst ? 'black' : '#43515c';
    
      return (
        <TouchableOpacity
          style={[styles.item, {height: reservation.height}]}
          onPress={() => Alert.alert(reservation.name)}
        >
          <Text style={{fontSize, color}}>{reservation.name}</Text>
        </TouchableOpacity>
      );
    };
    
    const renderEmptyDate = () => {
      return (
        <View style={styles.emptyDate}>
          <Text>This is empty date!</Text>
        </View>
      );
    };
    
    const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
      return r1.name !== r2.name;
    };

    const timeToString = (time: number) => {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text variant="displaySmall">My Tasks</Text>
            <CalendarProvider date="2023-11-27">
              <Agenda
                items={items}
                selected={today}
                renderItem={renderItem}
                renderEmptyDate={renderEmptyDate}
                rowHasChanged={rowHasChanged}
                showClosingKnob={true}
              />
            </CalendarProvider>
            <AddTaskModal visible={modalVisible} onDismiss={dismissAddTaskModal} />
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    fab: {
      right: 24,
      bottom: 24,
      borderRadius: 16,
      position: 'absolute',
    },
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30
    },
    customDay: {
      margin: 10,
      fontSize: 24,
      color: 'green'
    },
    dayItem: {
      marginLeft: 34
    }
})

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(numberOfDays: number) {
  const array: string[] = [];
  for (let index = 1; index <= numberOfDays; index++) {
    let d = Date.now();
    if (index > 8) {
      // set dates on the next month
      const newMonth = new Date(d).getMonth() + 1;
      d = new Date(d).setMonth(newMonth);
    }
    const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(numberOfDays: number) {
  return new Date(Date.now() - 864e5 * numberOfDays).toISOString().split('T')[0];
}

const agendaItems = [
    {
      title: dates[0],
      data: [{hour: '12am', duration: '1h', title: 'First Yoga'}]
    },
    {
      title: dates[1],
      data: [
        {hour: '4pm', duration: '1h', title: 'Pilates ABC'},
        {hour: '5pm', duration: '1h', title: 'Vinyasa Yoga'}
      ]
    },
    {
      title: dates[2],
      data: [
        {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
        {hour: '2pm', duration: '1h', title: 'Deep Stretches'},
        {hour: '3pm', duration: '1h', title: 'Private Yoga'}
      ]
    },
    {
      title: dates[3],
      data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}]
    },
    {
      title: dates[4],
      data: [{}]
    },
    {
      title: dates[5],
      data: [
        {hour: '9pm', duration: '1h', title: 'Middle Yoga'},
        {hour: '10pm', duration: '1h', title: 'Ashtanga'},
        {hour: '11pm', duration: '1h', title: 'TRX'},
        {hour: '12pm', duration: '1h', title: 'Running Group'}
      ]
    },
    {
      title: dates[6], 
      data: [
        {hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}
      ]
    },
    {
      title: dates[7], 
      data: [{}]
    },
    {
      title: dates[8],
      data: [
        {hour: '9pm', duration: '1h', title: 'Pilates Reformer'},
        {hour: '10pm', duration: '1h', title: 'Ashtanga'},
        {hour: '11pm', duration: '1h', title: 'TRX'},
        {hour: '12pm', duration: '1h', title: 'Running Group'}
      ]
    },
    {
      title: dates[9],
      data: [
        {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
        {hour: '2pm', duration: '1h', title: 'Deep Stretches'},
        {hour: '3pm', duration: '1h', title: 'Private Yoga'}
      ]
    },
    {
      title: dates[10], 
      data: [
        {hour: '12am', duration: '1h', title: 'Last Yoga'}
      ]
    },
    {
      title: dates[11],
      data: [
        {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
        {hour: '2pm', duration: '1h', title: 'Deep Stretches'},
        {hour: '3pm', duration: '1h', title: 'Private Yoga'}
      ]
    },
    {
      title: dates[12], 
      data: [
        {hour: '12am', duration: '1h', title: 'Last Yoga'}
      ]
    },
    {
      title: dates[13], 
      data: [
        {hour: '12am', duration: '1h', title: 'Last Yoga'}
      ]
    }
];