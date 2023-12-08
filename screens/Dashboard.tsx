import { Card, Text } from "react-native-paper";
import ScoreArc from "../components/ScoreArc";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

function Dashboard() {
    return (
      <SafeAreaView style={{padding: 20, alignItems: 'center'}}>
        <View style={{height:20}}></View>
        <Text style={{fontSize: 32}}>Your Accountability Score</Text>
        <View style={{height:30}}></View>
        <ScoreArc score={580} />
        <Text>Accountability Score</Text>
        <View style={{height:56}}></View>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Card style={{flexBasis: '48%', borderRadius: 4, borderLeftColor: 'green', borderLeftWidth: 4}}>
            <Card.Title title="Consistency" />
            <Card.Content>
              <Text variant="bodyMedium">How often you stand on business</Text>
            </Card.Content>
          </Card>
          <View style={{width:'4%'}}></View>
          <Card style={{flexBasis: '48%', borderRadius: 4, borderLeftColor: 'orange', borderLeftWidth: 4}}>
            <Card.Title title="Task Count" />
            <Card.Content>
              <Text variant="bodyMedium">You should have a number of different tasks in your routine</Text>
            </Card.Content>
          </Card>
        </View>
        <View style={{height:24}}></View>
        <View style={{flexDirection: 'row', width: '100%', flexWrap: 'wrap'}}>
          <Card style={{flexBasis: '48%', borderRadius: 4, borderLeftColor: 'red', borderLeftWidth: 4}}>
            <Card.Title title="Account Age" />
            <Card.Content>
              <Text variant="bodyMedium">The longer you use this, the better</Text>
            </Card.Content>
          </Card>
          <View style={{width:'4%'}}></View>
          <Card style={{flexBasis: '48%', borderRadius: 4, borderLeftColor: 'green', borderLeftWidth: 4}}>
            <Card.Title title="Task Retention" />
            <Card.Content>
              <Text variant="bodyMedium">The less you delete tasks, the stronger this is</Text>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    );
}

export default Dashboard;