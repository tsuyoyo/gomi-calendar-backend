import { TrashType } from '../../TrashType';
import { LinkComponent } from '../common/LinkComponent';

export type HomeWeeklyScheduleTrashTypeInfo = {
  type: TrashType;
  name: string;
  schedule: string;
  guideUrl: string;
};

export type HomeWeeklyScheduleComponent = {
  title: string;
  description: string;
  schedules: HomeWeeklyScheduleTrashTypeInfo[];
  calendarLink: LinkComponent;
};
