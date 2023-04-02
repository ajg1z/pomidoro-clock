import { normalizeTimeStr } from './normalizeTimeStr';

describe('normalizeTimeStr', () => {
    test('9 should return 09', () => {
        expect(normalizeTimeStr(9)).toBe('09');
    });

    test('12 should return 12', () => {
        expect(normalizeTimeStr(12)).toBe(12);
    });
});
