import i18n from "../locales/i18n";
import { Day } from "./types";

export const daysOfWeek: Day[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const daysAbbreviated = [
    [i18n.t('days.abbrevLetter.sunday'), i18n.t('days.abbrev.sunday')],
    [i18n.t('days.abbrevLetter.monday'), i18n.t('days.abbrev.monday')], 
    [i18n.t('days.abbrevLetter.tuesday'), i18n.t('days.abbrev.tuesday')], 
    [i18n.t('days.abbrevLetter.wednesday'), i18n.t('days.abbrev.wednesday')], 
    [i18n.t('days.abbrevLetter.thursday'), i18n.t('days.abbrev.thursday')], 
    [i18n.t('days.abbrevLetter.friday'), i18n.t('days.abbrev.friday')], 
    [i18n.t('days.abbrevLetter.saturday'), i18n.t('days.abbrev.saturday')]
];

export const unselectAllDays: Record<Day, []> = {
    'Sunday': [],
    'Monday': [],
    'Tuesday': [],
    'Wednesday': [],
    'Thursday': [],
    'Friday': [],
    'Saturday': []
}

export const API_ENDPOINT = "http://10.0.2.2:8000/api"