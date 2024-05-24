import { TrashType } from '../data/TrashType';

const DOMAIN = 'https://www.city.narashino.lg.jp';
const REF_BASE = `${DOMAIN}/material/files/group/35`;
const KURASHI_GOMI_BASE = `${DOMAIN}/kurashi/gomi`;

export const refLinks = {
  burnable: `${REF_BASE}/R6dashikataguidebook_02.pdf`,
  incombustible: `${REF_BASE}/R6dashikataguidebook_03.pdf`,
  recyclable: `${REF_BASE}/R6dashikataguidebook_04.pdf`,
  harmful: `${REF_BASE}/R6dashikataguidebook_05.pdf`,
  narashinoCityTop: `${DOMAIN}/index.html`,
  gomiTop: `${KURASHI_GOMI_BASE}/index.html`,
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
