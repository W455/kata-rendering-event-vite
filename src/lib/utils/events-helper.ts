import { CalendarEvent, Event } from '../models';
import { RawEvent } from '../types';

export function generateEvents(data: Array<RawEvent>) {
  return data
    .map((currentRawEvent) => new Event(currentRawEvent))
    .sort((a, b) => {
      if (a.timeSlot.startTime.equals(b.timeSlot.startTime))
        return a.timeSlot.endTime.isAfter(b.timeSlot.endTime) ? 1 : -1;
      return a.timeSlot.startTime.isAfter(b.timeSlot.startTime) ? 1 : -1;
    });
}

export const generateCalendarEvents = (events: Readonly<Array<Event>>) => {
  return Array.from(
    events
      .reduce((map, event) => {
        let width: number;
        let position: number;
        const concurrentConsecutiveEvents = event.getConsecutiveConcurrentEvents(events);
        let currentEventIndex = concurrentConsecutiveEvents.findIndex((e) => e === event);
        let numberOfConcurrentEvents = concurrentConsecutiveEvents.length;
        if (currentEventIndex === 0) {
          return map.set(event, new CalendarEvent({ event, position: 0, width: 100 / numberOfConcurrentEvents }));
        }
        const { width: prevWidth, position: prevPosition } = map.get(
          concurrentConsecutiveEvents.at(currentEventIndex - 1)!
        )!;
        const freeSpace = 100 - (prevPosition + prevWidth);
        const remaining = concurrentConsecutiveEvents.slice(currentEventIndex).length;
        width = freeSpace > 0 ? freeSpace / remaining : 100 - prevWidth * (numberOfConcurrentEvents - 1);
        position = freeSpace - width < 0 ? 0 : prevPosition + prevWidth;
        return map.set(event, new CalendarEvent({ event, position, width }));
      }, new Map<Event, CalendarEvent>())
      .values()
  );
};
