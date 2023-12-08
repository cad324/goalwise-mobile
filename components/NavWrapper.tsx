import { useEffect, useState } from 'react';
import { BottomNavigation, Portal } from 'react-native-paper';
import Dashboard from '../screens/Dashboard';
import Tasks from '../screens/Tasks';
import Account from '../screens/Account';
import i18n from '../locales/i18n';
import { RouteProp } from '@react-navigation/native';
import { showGrowl } from '../lib/utils';
import { GrowlLevel } from '../lib/types';
import Growl from './Growl';

type RootStackParamList = {
  'LoggedInView': { 
    id: string
    showDeletedGrowl?: boolean 
  };
};

type LoggedInRouteProp = RouteProp<RootStackParamList, 'LoggedInView'>;

type LoggedInViewProps = {
  route: LoggedInRouteProp;
};

export default function NavWrapper({ route }: LoggedInViewProps) {
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackLevel, setFeedbackLevel] = useState<GrowlLevel>('warning');
    const [growlVisible, setGrowlVisible] = useState(false);

    useEffect(() => {
      if (route.params?.showDeletedGrowl) {
        setFeedbackMessage(i18n.t('tasks.taskDeleted'));
        showGrowl(setGrowlVisible, setFeedbackLevel, "success");
      }
    }, [route.params?.id]);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {
          key: 'tasks', 
          title: `${i18n.t('navigation.tasks')}`, 
          focusedIcon: 'view-list'
        },
        {
          key: 'dashboard', 
          title: `${i18n.t('navigation.performance')}`, 
          focusedIcon: 'chart-arc'
        },
        {
          key: 'account', 
          title: `${i18n.t('navigation.account')}`, 
          focusedIcon: 'account'
        },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        dashboard: Dashboard,
        tasks: Tasks,
        account: Account
    });

    return (
        <>
          <Portal>
            <Growl level={feedbackLevel} message={feedbackMessage} visible={growlVisible} />
          </Portal>
          <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
          />
        </>
      );
}