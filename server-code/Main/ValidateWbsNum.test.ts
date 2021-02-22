import { validateWbsNum } from './Main'

// describe for these test
// for excepts; do toThrow(error?)

// succesful cases; doesn't return anything, so asert doesn't throw an error
// 1, 2, X -> 2 periods
describe('positive test cases; websites that don\'t throw an error', () => {
    test('nothing thrown on website that starts with 1' +
    ', has 2 periods', () => {
        expect(validateWbsNum("1web.com.usa")).toBeNull();
    });

    test('nothing thrown on website that starts with 2' + 
    ', has 2 periods', () => {
        expect(validateWbsNum("2www.home.com")).toBeNull();
    });

    test('nothing thrown on website that starts with 2' +
    ', has 2 periods', () => {
        expect(validateWbsNum("xwww.khoury.edu")).toBeNull();
    });
});

// tests; no periods, not exactly 2, doesn't start with 1, 2, or X
describe('tests that will not work; webnsites that will throw an error', () => {
    test('throw an error on website without periods', () => {
        expect(validateWbsNum("noperiodsdotcom")).toThrow("WBS Invalid: WBS #s include periods, none found");
    });

    test('throw an error on site with less than 2 periods', () => {
        expect(validateWbsNum("websitewithone.com")).toThrow("WBS Invalid: incorrect number of periods");
    });

    test('throw an error on site with 3 periods', () => {
        expect(validateWbsNum("website.with.three.com")).toThrow("WBS Invalid: incorrect number of periods");
    });
    
    test('throw an error on site with significantly more than 2 periods', () => {
        expect(validateWbsNum("bad.wed.site.design.com.edu.us.k12.org/.text")).toThrow(
            "WBS Invalid: incorrect number of periods");
    });

    test('throw an error on a website w/ 2 .\'s that doesn\t start with 1, 2 or X', () => {
        expect(validateWbsNum('website.without.12X')).toThrow(
            "WBS Invalid: function areas are only 1 or 2, found w");
    });

    test('throw an error on a website w/ 2 .\'s that doesn\t start with 1, 2 or X', () => {
        expect(validateWbsNum('badwebsite.without.12X')).toThrow(
            "WBS Invalid: function areas are only 1 or 2, found b");
    });

    test('throw an error on a website w/ 2 .\'s that doesn\t start with 1, 2 or X', () => {
        expect(validateWbsNum('3badwebsite.without.12X')).toThrow(
            "WBS Invalid: function areas are only 1 or 2, found 3");
    });
});