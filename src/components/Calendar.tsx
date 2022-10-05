import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import rawEvents from '../input.json';
import { Event, RawEvent } from '../types/event';
import { ActualTimeOfTheDayIndicator, AddEventForm, DrawEvent, TimeStamps } from './';

const Container = styled.div`
  height: 100%;
  flex: 1 2;
  background-color: lightgray;
  box-sizing: border-box !important;
  display: flex;
  flex-direction: row;
  position: relative;
`;

const HourSlice = styled('div')<{ index: number }>`
  border-bottom: solid 1px grey;
  width: 100%;
  position: absolute;
  height: calc(100% / 12);
  top: ${({ index }) => (index * 100) / 12}%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

function parseEvents(data: Array<RawEvent>) {
  return data
    .map((currentRawEvent) => new Event(currentRawEvent))
    .sort((a, b) => {
      if (a.timeSlot.startTime.equals(b.timeSlot.startTime))
        return a.timeSlot.endTime.isAfter(b.timeSlot.endTime) ? 1 : -1;
      return a.timeSlot.startTime.isAfter(b.timeSlot.startTime) ? 1 : -1;
    });
}

const generateCalendarEvents = (events: Readonly<Array<Event>>) => {
  return events.reduce((map, event) => {
    const concurrentsConsecutiveEvents = event.getOverlappedConsecutiveEvents(events);
    let width = 0;
    let position = 0;
    if (concurrentsConsecutiveEvents.findIndex((e) => e === event) === 0) {
      position = 0;
      width = 100 / concurrentsConsecutiveEvents.length;
    } else {
      const prev = map.get(
        concurrentsConsecutiveEvents.at(concurrentsConsecutiveEvents.findIndex((e) => e === event) - 1)!
      )!;

      const remaining = concurrentsConsecutiveEvents.slice(
        concurrentsConsecutiveEvents.findIndex((e) => e === event)
      ).length;
      const freeSpace = 100 - (prev.position + prev.width);
      width = freeSpace > 0 ? freeSpace / remaining : 100 - prev.width * (concurrentsConsecutiveEvents.length - 1);
      position = freeSpace - width < 0 ? 0 : prev.position + prev.width;
      if (event.id === 18)
        console.log('prev', {
          prev,
          concurrentsConsecutiveEvents,
          freeSpace,
          remaining,
        });
    }
    return map.set(event, { event, position, width });
  }, new Map<Event, { event: Event; position: number; width: number }>());
};

export const Calendar = () => {
  const [events, setEvents] = useState(() => parseEvents(rawEvents));
  const maxId = useMemo(() => events.reduce((res, ev) => Math.max(ev.id, res), 0), [events]);

  const calendarEvents = Array.from(generateCalendarEvents(events).values());
  console.log(calendarEvents);
  return (
    <div
      style={{
        width: '100vw',
        display: 'flex',
        minHeight: '100vh',
        height: '100vh',
        flexDirection: 'column',
        position: 'absolute',
      }}
    >
      <p>Calendar</p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          // gap: 20,
          // height: '100vh',
          position: 'relative',
          flexGrow: 1,
        }}
      >
        <TimeStamps />
        <ActualTimeOfTheDayIndicator />
        <Container>
          {[...Array(12)].map((x, i) => (
            <HourSlice key={i} index={i} />
          ))}
          {calendarEvents?.map(({ event, width, position }, i) => (
            <DrawEvent
              event={event}
              width={width}
              position={position}
              key={event.id}
              onRemoveEvent={(eventToRemove) => setEvents(events.filter((e) => e !== eventToRemove))}
            />
          ))}
        </Container>
      </div>
      <AddEventForm setEvents={setEvents} maxId={maxId} />
    </div>
  );
};
