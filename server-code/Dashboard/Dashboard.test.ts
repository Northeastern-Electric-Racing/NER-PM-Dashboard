import { getMondayOfCurrWeek } from './Dashboard'

test('Getting monday from monday', () => {
    expect(getMondayOfCurrWeek(new Date("2020-10-05"))).toEqual(new Date("2020-10-05"));
});

test('Getting monday from tuesday', () => {
    expect(getMondayOfCurrWeek(new Date("2020-10-06"))).toEqual(new Date("2020-10-05"));
});

test('Getting monday from wednesday', () => {
    expect(getMondayOfCurrWeek(new Date("2020-11-11"))).toEqual(new Date("2020-11-09"));
});

test('Getting monday from thursday', () => {
    expect(getMondayOfCurrWeek(new Date("2020-09-10"))).toEqual(new Date("2020-09-07"));
});

test('Getting monday from friday', () => {
    expect(getMondayOfCurrWeek(new Date("2020-12-25"))).toEqual(new Date("2020-12-21"));
});

test('Getting monday from saturday', () => {
    expect(getMondayOfCurrWeek(new Date("2020-09-12"))).toEqual(new Date("2020-09-07"));
});

test('Getting monday from sunday', () => {
    expect(getMondayOfCurrWeek(new Date("2020-09-13"))).toEqual(new Date("2020-09-07"));
});

test('Getting monday across a month', () => {
    expect(getMondayOfCurrWeek(new Date("2020-07-03"))).toEqual(new Date("2020-06-29"));
});

test('Getting monday across a year', () => {
    expect(getMondayOfCurrWeek(new Date("2021-01-03"))).toEqual(new Date("2020-12-28"));
});

test('Getting monday in 2023', () => {
    expect(getMondayOfCurrWeek(new Date("2023-05-17"))).toEqual(new Date("2023-05-15"));
});