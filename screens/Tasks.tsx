import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { useScrollToTop } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Button, FAB, Portal, Text } from 'react-native-paper';
import AddTaskModal from "../components/AddTaskModal";
import { useEffect, useRef, useState } from "react";
import i18n from "../locales/i18n";
import { Day, GrowlLevel } from "../lib/types";
import { daysOfWeek, unselectAllDays } from "../lib/constants";
import TaskCard from "../components/TaskCard";
import DatePicker from "../components/DatePicker";
import { getFutureDates, showGrowl } from "../lib/utils";
import Growl from "../components/Growl";
import api from "../lib/api.config";
import { theme } from "../styles/global.Style";

type TaskProps = {
  [key in Day]: {
    id: string;
    title: string;
    days_of_week: number[];
    duration?: string;
  }[];
};

type TasksResponse = {
  id: string,
  title: string,
  days_of_week: number[],
}

const transformTaskResponse = (res: TasksResponse[]) => {
  return res.reduce((acc, task) => {
    task.days_of_week.forEach((dayId) => {
      const dayName = daysOfWeek[dayId-1];
      if (!acc[dayName]) {
        acc[dayName] = [];
      }
      acc[dayName].push({
        id: task.id,
        title: task.title,
        days_of_week: task.days_of_week,
      });
    });
    return acc;
  }, {} as TaskProps);
}

export default function Tasks() {

  const currentDate = new Date();
  const currentDayOfWeek = daysOfWeek[currentDate.getDay()];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Day>(currentDayOfWeek);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(currentDate.getDay());
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackLevel, setFeedbackLevel] = useState<GrowlLevel>('warning');
  const [growlVisible, setGrowlVisible] = useState(false);
  const [tasks, setTasks] = useState<TaskProps>(unselectAllDays);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(true);

  const scrollRef = useRef<ScrollView>(null);
  useScrollToTop(scrollRef);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const response = await api.get('/tasks/');
      const transformed = transformTaskResponse(response.data);
      setTasks(transformed);
      setLoadingTasks(false);
    } catch (err) {
      console.error('[fetchTasks]', err);
      setLoadingTasks(false);
    }
  }

  const dismissAddTaskModal = () => setModalVisible(false);

  const selectDay = (d: Date) => {
    let day = d.getDay();
    setSelectedDayIndex(day);
    setSelectedDay(daysOfWeek[day]);
    setSelectedDate(d);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={styles.title}>
            {selectedDate.toLocaleString('default', { month: 'short' })} {selectedDate.getDate()}
          </Text>
          <Text style={styles.subtitle}>
            {selectedDay}
          </Text>
        </View>
        <View>
          <Button mode="outlined" onPress={()=>{
            selectDay(new Date());
            scrollRef.current?.scrollTo({ x: 0 });
          }}>
            {i18n.t('tasks.today')}
          </Button>
        </View>
      </View>
      <View style={{height: 32}}></View>
      <View>
        <ScrollView 
          showsHorizontalScrollIndicator={false} 
          horizontal 
          contentContainerStyle={styles.dateIndicatorContainer}
          ref={scrollRef}
        >
          {
            getFutureDates(currentDate, 6).map(
              (d) => {
                let selected = d.getDay() == selectedDayIndex;
                return <DatePicker key={d.toString()} select={selectDay} selected={selected} date={d} />
              }
            )
          }
        </ScrollView>
      </View>
      {loadingTasks ?
          <View style={{flex:1, justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} animating={true} color={theme.colors.primary} />
          </View> :
          <View style={{flex: 1}}>
            <ScrollView
              contentContainerStyle={{flex: 1}}
              refreshControl={
                <RefreshControl refreshing={loadingTasks} onRefresh={fetchTasks} />
              }
            >
              {tasks[selectedDay]?.length ? 
                <ScrollView style={{marginTop: 32}} showsVerticalScrollIndicator={false}>
                  {tasks[selectedDay].map((task) =>
                    <TaskCard key={task.id} id={task.id} title={task.title} days_of_week={task.days_of_week} />)}
                </ScrollView> :
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text variant="bodyLarge">{i18n.t('tasks.noRoutine')}</Text>
                </View>
              }
            </ScrollView>
          </View>
      }
      <AddTaskModal 
        onError={(msg) => {
          setFeedbackMessage(msg);
          showGrowl(setGrowlVisible, setFeedbackLevel, "error");
        }}
        onSuccess={(msg) => {
          setFeedbackMessage(msg);
          showGrowl(setGrowlVisible, setFeedbackLevel, "success");
          fetchTasks();
        }}
        visible={modalVisible} 
        onDismiss={dismissAddTaskModal}
      />
      <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => setModalVisible(true)}
      />
      <Portal>
        <Growl
          visible={growlVisible}
          level={feedbackLevel}
          duration={3000}
          message={feedbackMessage}/>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    fab: {
      right: 12,
      bottom: 12,
      borderRadius: 32,
      padding: 0,
      position: 'absolute',
    },
    subtitle: {
      color: 'grey',
      fontSize: 32
    },
    title: {
      fontSize: 20,
      fontWeight: '600'
    },
    dateIndicatorContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 20,
    }
});