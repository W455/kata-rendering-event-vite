import { LocalTime, ChronoUnit } from '@js-joda/core';
import { RawEvent } from './event';

export class TimeSlot {
  startTime: LocalTime;
  endTime: LocalTime;

  constructor({ start, duration }: Pick<RawEvent, 'duration' | 'start'>) {
    this.startTime = LocalTime.parse(start);
    this.endTime =
      this.startTime.until(LocalTime.MAX, ChronoUnit.MINUTES) > duration
        ? this.startTime.plusMinutes(duration)
        : LocalTime.MAX;
  }
}
