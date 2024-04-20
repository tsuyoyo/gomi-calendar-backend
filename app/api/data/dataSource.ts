import fs from 'fs';
import path from 'path';

export const calendarSource = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), '/data-generator/opt/schedule.json'),
    'utf8',
  ),
);
