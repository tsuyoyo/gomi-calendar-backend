enum Week {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

type TrashSchedule = {
  // 0 origin. Empty -> every week.
  weeks: number[];

  // It should have one ore more values.
  days: Week[];
};

export type Area = {
  id: string;
  name: string;
};

export type CalendarEntry = {
  area: Area;
  burnable: TrashSchedule;
  incombustible: TrashSchedule;
  recyclable: TrashSchedule;
  harmful: TrashSchedule;
  calendar: string;
};
