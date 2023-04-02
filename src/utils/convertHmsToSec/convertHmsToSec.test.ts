import { convertHmsToSec } from './convertHmsToSec';

describe('convertHmsToSec', () => {
    test('23:50:00 should return 85800', () => {
        expect(convertHmsToSec('23:50:00')).toBe(85800);
    });

    test('00:00:00 should return 0', () => {
        expect(convertHmsToSec('00:00:00')).toBe(0);
    });
});
