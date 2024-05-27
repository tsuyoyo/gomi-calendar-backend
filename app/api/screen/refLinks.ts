import { TrashType } from '../data/TrashType';

const DOMAIN = 'https://www.city.narashino.lg.jp';
const REF_BASE = `${DOMAIN}/soshiki/kurin_suishin/gyomu/gomi/gomi/wakekata.html`;
const KURASHI_GOMI_BASE = `${DOMAIN}/kurashi/gomi`;

export const refLinks = {
  burnable: `${REF_BASE}#h_idx_iw_flex_1_2`,
  incombustible: `${REF_BASE}#h_idx_iw_flex_1_4`,
  recyclable: `${REF_BASE}#h_idx_iw_flex_1_7`,
  harmful: `${REF_BASE}#h_idx_iw_flex_1_8`,
  narashinoCityTop: `${DOMAIN}/index.html`,
  gomiTop: `${KURASHI_GOMI_BASE}/index.html`,
  calendarTop: `${KURASHI_GOMI_BASE}/gomi/r6calendar.html`,
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
