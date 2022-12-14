import Color from 'color';
import { RawEvent } from '../types';
import { TimeSlot } from './time-slot';

const colors = [
  '#a6b1e1',
  '#ffb85c',
  '#bf93b1',
  '#8cb25d',
  '#d07676',
  '#576bc7',
  '#b86800',
  '#673C59',
  '#386600',
  '#a12f2f',
];

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
  rgbColor: Color;

  constructor({ id, start, duration, color }: RawEvent & { color?: string }) {
    this.id = id;
    this.timeSlot = new TimeSlot({ start, duration });
    this.duration = duration;
    this.rgbColor = Color(color ?? colors[id % colors.length]).rotate((id / colors.length) * 20);
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
