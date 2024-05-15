import { getNthWeekdayInTheMonth } from '../getNthWeekdayInMonth';

describe('getNthWeekdayInTheMonth', () => {
  test('it should say 4/1/2024 is the first Monday', () => {
    expect(getNthWeekdayInTheMonth(2024, 4, 1)).toBe(1);
  });

  test('it should say 4/23/2024 is the third Sunday', () => {
    expect(getNthWeekdayInTheMonth(2024, 4, 21)).toBe(3);
  });

  // test('it should say 4/32/2024 does not exist', () => {
  //   expect(() => getNthWeekdayInTheMonth(2024, 4, 32)).toThrow(
  //     Error(`32 doesn't exist in 4/2024`),
  //   );
  // });
});
