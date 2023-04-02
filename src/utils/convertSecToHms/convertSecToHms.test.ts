import { convertSecToHms } from './convertSecToHms';

describe('convertSecToHms', () => {
    test('3600 should return 01:00:00', () => {
        expect(convertSecToHms(3600)).toBe('01:00:00');
    });

    test('3950 should return 01:05:50', () => {
        expect(convertSecToHms(3950)).toBe('01:05:50');
    });

    test('45080 should return 12:31:20', () => {
        expect(convertSecToHms(45080)).toBe('12:31:20');
    });
});
