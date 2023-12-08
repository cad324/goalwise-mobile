import { GrowlLevel } from "./types";
import { SetStateAction } from "react";

export function getFutureDates(today: Date, numOfDays: number) {
    if (numOfDays < 1) throw RangeError();

    let dates = [today];

    for (let i = 0; i < numOfDays; i++) {
        let nextDate = new Date();
        nextDate.setDate(today.getDate() + i + 1);
        dates = [...dates, nextDate];
    }

    return dates;
}

export function setOpacity(hex: string, opacity: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function truncate(txt: string, length: number) {
    if (txt.length < length) return txt;
    return `${txt.substring(0, length-3)}...`;
}

export function showGrowl(setterVisible: (value: SetStateAction<boolean>) => void, 
    setterLevel: (value: SetStateAction<GrowlLevel>) => void,
    level: GrowlLevel,
    duration=5000
) {
    setterVisible(true);
    setterLevel(level);
    setTimeout(() => {
        setterVisible(false);
    }, duration);
  }

export const handleDaySelection = (dayOfTheWeek: number, setter: (arg0: any[]) => void, selectedDays: boolean[]) => {
    let newSelectedDays = [...selectedDays];
    newSelectedDays[dayOfTheWeek] = !newSelectedDays[dayOfTheWeek];
    console.log(newSelectedDays);
    setter(newSelectedDays);
};
 
export const selectedDaysAsList = (selectedDays: boolean[]) => {
    return selectedDays
            .map((selected, index) => selected ? index+1 : null)
            .filter(item => !!item);
}