import { SecondsInHour, SecondsInMinute } from '../../shared/const/time';

export const convertHmsToSec = (time: string): number => {
    const [hour, minute, sec] = time.split(':');
    return parseInt(hour) * SecondsInHour + parseInt(minute) * SecondsInMinute + parseInt(sec);
};
