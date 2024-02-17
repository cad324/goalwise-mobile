import { Card, Text } from "react-native-paper";
import { theme } from "../styles/global.Style";

type StatusCardProps = {
    title: string,
    content: string,
    level: StatusCardLevel
}

export enum StatusCardLevel {
    Good = 'good',
    Fair = 'fair',
    Bad = 'bad'
}

export default function StatusCard({content, level, title}: StatusCardProps) {
    const borderLeftColor = level === StatusCardLevel.Good ? theme.colors.green : 
        level === StatusCardLevel.Fair ? theme.colors.orange : theme.colors.red 
    return (
        <Card style={{flexBasis: '48%', borderRadius: 4, borderLeftColor, borderLeftWidth: 4}}>
            <Card.Title title={title} />
            <Card.Content>
                <Text variant="bodyMedium">
                    {content}
                </Text>
            </Card.Content>
        </Card>
    )
}