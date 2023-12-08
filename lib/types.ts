import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { RootStackParamList } from "../App";

type ScreenNavigationProps = NativeStackScreenProps<RootStackParamList>

export type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type TokenPair = {
    access: string,
    refresh: string
}

export type GrowlLevel = 'error' | 'warning' | 'success';