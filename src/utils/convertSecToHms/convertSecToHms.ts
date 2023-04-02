import { SecondsInHour, SecondsInMinute } from '../../shared/const/time';
import { normalizeTimeStr } from '../normalizeTimeStr/normalizeTimeStr';

export const convertSecToHms = (sec: number): string => {
    const hour = Math.floor(sec / SecondsInHour);
    const minute = Math.floor((sec - SecondsInHour * hour) / SecondsInMinute);
    const seconds = Math.floor(sec - (hour * SecondsInHour + minute * SecondsInMinute));

    return `${normalizeTimeStr(hour)}:${normalizeTimeStr(minute)}:${normalizeTimeStr(seconds)}`;
};
