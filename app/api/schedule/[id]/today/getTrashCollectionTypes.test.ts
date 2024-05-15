import { CalendarEntry } from '../../../data/CalendarEntry';
import { TrashType } from '../../../data/TrashType';
import { getTrashCollectionTypes } from './getTrashCollectionTypes';

describe('getTrashCollectionTypes', () => {
  describe('when today is the day for trash collection', () => {
    const testData: CalendarEntry = {
      area: {
        id: '1',
        name: 'TestArea',
      },
      burnable: {
        weeks: [],
        days: [6],
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
    test('it should return [BURNABLE, RECYCLABLE]', () => {
      const res = getTrashCollectionTypes(testData, 2024, 5, 11);
      expect(res).toHaveLength(2);
      expect(res).toContain(TrashType.BURNABLE);
      expect(res).toContain(TrashType.RECYCLABLE);
    });
  });
  describe('when today is NOT the day for any trash collection', () => {
    const testData: CalendarEntry = {
      area: {
        id: '1',
        name: 'TestArea',
      },
      burnable: {
        weeks: [],
        days: [],
      },
      incombustible: {
        weeks: [],
        days: [],
      },
      recyclable: {
        weeks: [],
        days: [],
      },
      harmful: {
        weeks: [3],
        days: [6],
      },
      calendar: '',
    };
    test('it should return the empty array', () => {
      const res = getTrashCollectionTypes(testData, 2024, 5, 11);
      expect(res).toHaveLength(0);
    });
  });
});
