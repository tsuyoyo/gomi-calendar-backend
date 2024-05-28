import { InfoComponentType } from '../../../data/screen/info/InfoComponentType';
import { InfoResponse } from '../../../data/screen/info/InfoResponse';
import { refLinks } from '../../refLinks';

const buildInfoResponse = (locale: string | null): InfoResponse => {
  return {
    layout: [
      { type: InfoComponentType.AREA_CONFIG, index: 0 },
      { type: InfoComponentType.LINK, index: 0 },
      { type: InfoComponentType.LINK, index: 1 },
      { type: InfoComponentType.OSS_LICENSE, index: 0 },
    ],
    links:
      locale === 'en'
        ? [
            {
              title: 'Narashino City Homepage',
              url: 'https://translation2.j-server.com/LUCNRSNC/ns/tl.cgi/https://www.city.narashino.lg.jp/index.html?SLANG=ja&TLANG=en&XMODE=0&XPARAM=number-search-input,&XCHARSET=utf-8&XPORG=,&XJSID=0',
            },
            {
              title: 'Garbage, Recycling (Narashino City Web page)',
              url: 'https://translation2.j-server.com/LUCNRSNC/ns/tl.cgi/https://www.city.narashino.lg.jp/kurashi/gomi/index.html?SLANG=ja&TLANG=en&XMODE=0&XPARAM=number-search-input,&XCHARSET=utf-8&XPORG=,&XJSID=0',
            },
          ]
        : [
            {
              title: '習志野市ホームページ トップ',
              url: refLinks.narashinoCityTop,
            },
            {
              title: '習志野市 "ごみ・リサイクル" トップ',
              url: refLinks.gomiTop,
            },
          ],
  };
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const locale = request.headers.get('locale');
  return Response.json(buildInfoResponse(locale), {
    status: 200,
  });
}
