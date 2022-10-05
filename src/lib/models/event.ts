import { RawEvent } from '../types';
import { TimeSlot } from './time-slot';

export interface IEvent {
  id: number;
  duration: number;
  timeSlot: TimeSlot;
  color?: string;
}

export class Event implements IEvent {
  id: number;
  duration: number;
  timeSlot: TimeSlot;
  color?: string;

  constructor({ id, start, duration, color }: RawEvent & { color?: string }) {
    this.id = id;
    this.timeSlot = new TimeSlot({ start, duration });
    this.duration = duration;
    this.color = color ?? 'red';
  }

  getConcurrentEvents(events: Readonly<Array<Event>>) {
    return events.reduce(
      (res, event) => (event.timeSlot.overlaps(this.timeSlot) ? [...res, event] : res),
      [] as Array<Event>
    );
  }

  isConcurrentWith(event: Event) {
    return this.timeSlot.overlaps(event.timeSlot);
  }

  getConsecutiveConcurrentEvents(events: Readonly<Array<Event>>) {
    return events.reduce((res, event) => {
      return event.isConcurrentWith(this) && !res.some((e) => !e.isConcurrentWith(event) && res.length > 0)
        ? [...res, event]
        : res;
    }, [] as Array<Event>);
  }
}
