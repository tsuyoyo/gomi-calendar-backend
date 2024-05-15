import { TrashType, fromTrashTypeString } from './TrashType';

describe('TrashType.fromString', () => {
  test("'burnable' should be translated to TrashType.BURNABLE", () => {
    const result = fromTrashTypeString('burnable');
    expect(result).toBe(TrashType.BURNABLE);
  });
  test("'harmful' should be translated to TrashType.HARMFUL", () => {
    const result = fromTrashTypeString('harmful');
    expect(result).toBe(TrashType.HARMFUL);
  });
  test("'incombustible' should be translated to TrashType.INCOMBUSTIBLE", () => {
    const result = fromTrashTypeString('incombustible');
    expect(result).toBe(TrashType.INCOMBUSTIBLE);
  });
  test("'recyclable' should be translated to TrashType.RECYCLABLE", () => {
    const result = fromTrashTypeString('recyclable');
    expect(result).toBe(TrashType.RECYCLABLE);
  });
  test('The wrong name should be translated to null', () => {
    const result = fromTrashTypeString('aaaaaaaaa--');
    expect(result).toBeNull();
  });
});
