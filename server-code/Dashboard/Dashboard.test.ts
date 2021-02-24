import { getMondayOfCurrWeek } from './Dashboard'

describe('Testing correct response of getMondayOfCurrWeek', () => {
    test('Getting monday from monday', () => {
        expect(getMondayOfCurrWeek(new Date("October 5, 2020"))).toEqual(new Date("October 5, 2020"));
    });

    test('Getting monday from tuesday', () => {
        expect(getMondayOfCurrWeek(new Date("October 6, 2020"))).toEqual(new Date("October 5, 2020"));
    });

    test('Getting monday from wednesday', () => {
        expect(getMondayOfCurrWeek(new Date("November 11, 2020"))).toEqual(new Date("November 9, 2020"));
    });

    test('Getting monday from thursday', () => {
        expect(getMondayOfCurrWeek(new Date("September 10, 2020"))).toEqual(new Date("September 7, 2020"));
    });

    test('Getting monday from friday', () => {
        expect(getMondayOfCurrWeek(new Date("December 25, 2020"))).toEqual(new Date("December 21, 2020"));
    });

    test('Getting monday from saturday', () => {
        expect(getMondayOfCurrWeek(new Date("September 12, 2020"))).toEqual(new Date("September 7, 2020"));
    });

    test('Getting monday from sunday', () => {
        expect(getMondayOfCurrWeek(new Date("September 13, 2020"))).toEqual(new Date("September 7, 2020"));
    });

    test('Getting monday across a month', () => {
        expect(getMondayOfCurrWeek(new Date("July 3, 2020"))).toEqual(new Date("June 29, 2020"));
    });

    test('Getting monday across a year', () => {
        expect(getMondayOfCurrWeek(new Date("January 3, 2021"))).toEqual(new Date("December 28, 2020"));
    });

    test('Getting monday in 2023', () => {
        expect(getMondayOfCurrWeek(new Date("May 17, 2023"))).toEqual(new Date("May 15, 2023"));
    });
})