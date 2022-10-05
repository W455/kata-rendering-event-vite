import { Event } from './';

interface ICalendarEvent {
  event: Event;
  width: number;
  position: number;
}

export class CalendarEvent implements ICalendarEvent {
  event: Event;
  width: number;
  position: number;

  constructor({ event, position, width }: ICalendarEvent) {
    this.event = event;
    this.width = width;
    this.position = position;
  }
}
