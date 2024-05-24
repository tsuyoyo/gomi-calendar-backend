import { TrashType } from '../data/TrashType';

const REF_BASE =
  'https://www.city.narashino.lg.jp/material/files/group/35';

export const refLinks = {
  burnable: `${REF_BASE}/R6dashikataguidebook_02.pdf`,
  incombustible: `${REF_BASE}/R6dashikataguidebook_03.pdf`,
  recyclable: `${REF_BASE}/R6dashikataguidebook_04.pdf`,
  harmful: `${REF_BASE}/R6dashikataguidebook_05.pdf`,
};

export const getLinkByTrashType = (type: TrashType) => {
  switch (type) {
    case TrashType.BURNABLE:
      return refLinks.burnable;
    case TrashType.INCOMBUSTIBLE:
      return refLinks.incombustible;
    case TrashType.RECYCLABLE:
      return refLinks.recyclable;
    case TrashType.HARMFUL:
      return refLinks.harmful;
  }
};
