import { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Dashboard from '../screens/Dashboard';
import Tasks from '../screens/Tasks';
import Account from '../screens/Account';
import i18n from '../locales/i18n';

export default function NavWrapper() {
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
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      );
}