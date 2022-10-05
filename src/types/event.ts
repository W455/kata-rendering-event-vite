import { TimeSlot } from './timeSlot';

export type RawEvent = {
  id: number;
  start: string;
  duration: number;
};

export class Event {
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

  getOverlappedEvents(events: Readonly<Array<Event>>) {
    return events.reduce(
      (res, event) => (event.timeSlot.isOverlapping(this.timeSlot) ? [...res, event] : res),
      [] as Array<Event>
    );
  }

  isOverlapping(event: Event) {
    return this.timeSlot.isOverlapping(event.timeSlot);
  }

  getOverlappedConsecutiveEvents(events: Readonly<Array<Event>>) {
    return events.reduce((res, event) => {
      return event.isOverlapping(this) && !res.some((e) => !e.isOverlapping(event) && res.length > 0)
        ? [...res, event]
        : res;
    }, [] as Array<Event>);
  }
}
