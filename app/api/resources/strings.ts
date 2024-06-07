type StringEntry = {
  ja: string;
  en: string;
};

const strings = new Map<string, StringEntry>([
  [
    'burnable-trash',
    {
      ja: '燃えるごみ',
      en: 'Combustible waste',
    },
  ],
  [
    'incombustible-trash',
    {
      ja: '燃えないごみ',
      en: 'Incombustible waste',
    },
  ],
  ['harmful-trash', { ja: '有害ごみ', en: 'Harmful dust' }],
  ['recyclable-trash', { ja: '資源物', en: 'Recyclable waste' }],
  [
    'how-to-take-out-trash',
    {
      ja: 'ゴミの出し方',
      en: 'How to take out rash',
    },
  ],
  [
    'no-schedule-to-collect',
    {
      ja: '収集の予定はありません',
      en: 'No schedule for the next collection',
    },
  ],
  [
    'next-trash-collection-schedule',
    {
      ja: '次のゴミ収集予定',
      en: 'Next trash collection',
    },
  ],
  [
    'today-collected-trashes',
    { ja: '本日のごみ収集', en: 'Trash to be collected today' },
  ],
  [
    'weekly-schedule-title',
    { ja: 'ゴミ回収スケジュール', en: 'Trash pickup schedule' },
  ],
  [
    'weekly-schedule-description',
    {
      ja: '祝日は変更になる可能性があります。カレンダーで確認してください。',
      en: 'A pickup schedule can be changed on a national holiday. Check the calendar to get the right schedule.',
    },
  ],
  [
    'weekly-schedule-open-calendar',
    {
      ja: 'カレンダーを開く (市のWebサイト)',
      en: 'Open the calendar (city web page)',
    },
  ],
  [
    'reminder-message',
    {
      ja: '地域で決められた時間までに出しましょう。',
      en: 'Put them the place by the time when a truck comes.',
    },
  ],
]);

export const getStringResource = (
  key: string,
  locale?: string | null,
) => {
  if (locale === 'en') {
    return strings.get(key)?.en ?? '';
  } else {
    return strings.get(key)?.ja ?? '';
  }
};
