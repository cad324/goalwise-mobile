import { ActivityIndicator, Text } from "react-native-paper";
import ScoreArc from "../components/ScoreArc";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import i18n from "../locales/i18n";
import StatusCard, { StatusCardLevel } from "../components/StatusCard";
import { useEffect } from "react";
import api from "../lib/api.config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setScore } from "../app/features/accountabilityScore";
import { theme } from "../styles/global.Style";
import { StatusBar } from "expo-status-bar";

function Dashboard() {

    const dispatch = useDispatch();
    const score = useSelector((state: RootState) => state.accountabilityScore.score);

    useEffect(() => {
      fetchScore();
    }, []);

    const fetchScore = async () => {
      try {
        const response = await api.get('/accountability_score/');
        const fetchedScore: number = response.data[0]["score"];
        dispatch(setScore( fetchedScore ));
      } catch (err) {
        console.error('[fetchScore]', err);
      }
    }

    return (
      <SafeAreaView style={{padding: 20, alignItems: 'center'}}>
        <StatusBar/>
        <View style={{height:30}}></View>
        {score ? <ScoreArc score={score} /> : 
          <View style={{height: 159, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        }
        <Text>{i18n.t('performance.accountabilityScore')}</Text>
        <View style={{height:56}}></View>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <StatusCard
            title={i18n.t('performance.consistency.title')}
            content={i18n.t('performance.consistency.content')}
            level={StatusCardLevel.Good}
          />
          <View style={{width:'4%'}}></View>
          <StatusCard
            title={i18n.t('performance.taskCount.title')}
            content={i18n.t('performance.taskCount.content')}
            level={StatusCardLevel.Good}
          />
        </View>
        <View style={{height:24}}></View>
        <View style={{flexDirection: 'row', width: '100%', flexWrap: 'wrap'}}>
          <StatusCard
            title={i18n.t('performance.accountAge.title')}
            content={i18n.t('performance.accountAge.content')}
            level={StatusCardLevel.Bad}
          />
          <View style={{width:'4%'}}></View>
          <StatusCard
            title={i18n.t('performance.taskRetention.title')}
            content={i18n.t('performance.taskRetention.content')}
            level={StatusCardLevel.Fair}
          />
        </View>
      </SafeAreaView>
    );
}

export default Dashboard;