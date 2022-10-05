import { useMemo } from 'react';
import { Event } from '../models';
import { generateCalendarEvents } from '../utils';

export const useGenerateCalendarEvents = (events: Readonly<Array<Event>>) => {
  return useMemo(() => generateCalendarEvents(events), events);
};
