import { InfoComponentType } from '../../../data/screen/info/InfoComponentType';
import { InfoResponse } from '../../../data/screen/info/InfoResponse';
import { refLinks } from '../../refLinks';

const buildInfoResponse = (): InfoResponse => {
  return {
    layout: [
      { type: InfoComponentType.AREA_CONFIG, index: 0 },
      { type: InfoComponentType.LINK, index: 0 },
      { type: InfoComponentType.LINK, index: 1 },
      { type: InfoComponentType.OSS_LICENSE, index: 0 },
    ],
    links: [
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
  _request: Request,
  { params }: { params: { id: string } },
) {
  return Response.json(buildInfoResponse(), {
    status: 200,
  });
}
