import { TimeSlot } from './timeSlot';
import { LocalTime } from '@js-joda/core';

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

  overlappingEvent(Readonly<>)
}
