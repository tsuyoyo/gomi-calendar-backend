import { getStringResource } from '../resources/strings';

export enum TrashType {
  BURNABLE = 'burnable',
  INCOMBUSTIBLE = 'incombustible',
  RECYCLABLE = 'recyclable',
  HARMFUL = 'harmful',
}

export const fromTrashTypeString = (
  name: string,
): TrashType | null =>
  Object.values(TrashType)
    .map((s) => s.toString())
    .includes(name)
    ? (name as TrashType)
    : null;

export type TrashTypeDisplayInfo = {
  id: string;
  displayName: string;
};

export const buildResponseTrashTypeData = (
  type: TrashType,
  locale: string | null,
): TrashTypeDisplayInfo => {
  const getDisplayName = (type: TrashType) => {
    switch (type) {
      case TrashType.BURNABLE:
        return getStringResource('burnable-trash', locale);
      case TrashType.HARMFUL:
        return getStringResource('harmful-trash', locale);
      case TrashType.INCOMBUSTIBLE:
        return getStringResource('incombustible-trash', locale);
      case TrashType.RECYCLABLE:
        return getStringResource('recyclable-trash', locale);
    }
  };
  return {
    id: type,
    displayName: getDisplayName(type),
  };
};
