import { CalendarEntry } from '../../../../data/CalendarEntry';
import { TrashType } from '../../../../data/TrashType';
import { getNextDayForType } from './getNextDayForType';

describe('getNextDayForType', () => {
  const testData: CalendarEntry = {
    area: {
      id: '1',
      name: 'TestArea',
    },
    burnable: {
      weeks: [],
      days: [1],
    },
    incombustible: {
      weeks: [],
      days: [],
    },
    recyclable: {
      weeks: [2],
      days: [6],
    },
    harmful: {
      weeks: [3],
      days: [6],
    },
    calendar: '',
  };
  test('it should return 2024/5/13 as the next day to collect burnable trashes', () => {
    const result = getNextDayForType(
      testData,
      TrashType.BURNABLE,
      2024,
      5,
      12,
    );
    expect(result?.getFullYear()).toBe(2024);
    expect(result?.getMonth()).toBe(4);
    expect(result?.getDate()).toBe(13);
  });
  test('it should return the next day, if it is the day to collect the trash type', () => {
    const result = getNextDayForType(
      testData,
      TrashType.BURNABLE,
      2024,
      5,
      13,
    );
    expect(result?.getFullYear()).toBe(2024);
    expect(result?.getMonth()).toBe(4);
    expect(result?.getDate()).toBe(20);
  });
  test('it should return 2024/6/8 as the next day to collect recyclable trashes', () => {
    const result = getNextDayForType(
      testData,
      TrashType.RECYCLABLE,
      2024,
      5,
      12,
    );
    expect(result?.getFullYear()).toBe(2024);
    expect(result?.getMonth()).toBe(5);
    expect(result?.getDate()).toBe(8);
  });
  test('it should return 2025/1/11 as the next day to collect recyclable trashes', () => {
    // The next collection day is in the next year.
    const result = getNextDayForType(
      testData,
      TrashType.RECYCLABLE,
      2024,
      12,
      15,
    );
    expect(result?.getFullYear()).toBe(2025);
    expect(result?.getMonth()).toBe(0);
    expect(result?.getDate()).toBe(11);
  });
  test('it should return null when incombustible will never be collected', () => {
    const result = getNextDayForType(
      testData,
      TrashType.INCOMBUSTIBLE,
      2024,
      5,
      10,
    );
    expect(result).toBeNull();
  });
});
