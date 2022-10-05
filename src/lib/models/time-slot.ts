import { ChronoField, ChronoUnit, Duration, LocalTime } from '@js-joda/core';
import { RawEvent } from '../types';

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

  duration() {
    return Duration.between(this.startTime, this.endTime);
  }

  overlaps(timeSlotToTest: TimeSlot) {
    return (
      Math.min(
        this.endTime.get(ChronoField.MINUTE_OF_DAY) - 1,
        timeSlotToTest.endTime.get(ChronoField.MINUTE_OF_DAY) - 1
      ) -
        Math.max(
          this.startTime.get(ChronoField.MINUTE_OF_DAY),
          timeSlotToTest.startTime.get(ChronoField.MINUTE_OF_DAY)
        ) >=
      0
    );
  }
}
