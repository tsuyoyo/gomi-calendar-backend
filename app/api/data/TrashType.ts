export enum TrashType {
  BURNABLE = 'burnable',
  INCOMBUSTIBLE = 'incombustible',
  RECYCLABLE = 'recyclable',
  HARMFUL = 'harmful',
}

export function fromTrashTypeString(name: string): TrashType | null {
  return Object.values(TrashType)
    .map((s) => s.toString())
    .includes(name)
    ? (name as TrashType)
    : null;
}
