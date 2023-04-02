import { convertSecToHms } from '../convertSecToHms/convertSecToHms';

export const convertSecToBeautifulDigit = (sec: number) => {
    const hms = convertSecToHms(sec);
    const [hour, minute] = hms.split(':');

    return `${parseInt(hour) !== 0 ? `${parseInt(hour)}h ` : ''}${parseInt(minute)} min`;
};
