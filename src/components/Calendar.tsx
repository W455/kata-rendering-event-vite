import styled from '@emotion/styled';
import { LocalTime } from '@js-joda/core';
import { useMemo, useState } from 'react';
import { Event, RawEvent } from '../types/event';
import rawEvents from '../input.json';
import {
  ActualTimeOfTheDayIndicator,
  AddEventForm,
  DrawEvent,
  TimeStamps,
} from './';

const Container = styled.div`
  min-width: 100vw;
  height: 100%;
  background-color: lightgray;
  box-sizing: border-box !important;
  display: flex;
  flex-direction: row;
  position: relative
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

const computeEventsWidthsAndPosition = (events: Readonly<Array<Event>>) => {
  const overlappingEventMap = events.reduce(
    (map, event) =>
      map.set(
        event,
        event.overlappingEvents(events).filter((e) => event !== e)
      ),
    new Map<Event, Array<Event>>()
  );
  const map1 = Array.from(overlappingEventMap.values());
  let computation0: Map<Event, number> = new Map();
  overlappingEventMap.forEach((array, event) =>
    computation0.set(event, 100 / (array.length + 1))
  );
  let computation1: Map<Event, number> = new Map();
  overlappingEventMap.forEach((array, event, map) =>
    computation1.set(
      event,
      100 /
        (new Set(map1.filter((tab) => tab.includes(event)).flat(1)).size + 1)
    )
  );
  let computation2 = events.reduce(
    (map, event) =>
      map.set(
        event,
        Math.max(computation0.get(event) || 0, computation1.get(event) || 0)
      ),
    new Map<Event, number>()
  );

  console.log({
    overlappingEventMap,
    map1,
    computation0,
    computation1,
    computation2,
  });
  return computation2;
};

const generateCalendarEvents = (events: Readonly<Array<Event>>) => {
  const computation = computeEventsWidthsAndPosition(events);
  return events.map((event) => {
    const width = computation.get(event);
    return { event, width };
  });
};

export const Calendar = () => {
  const [events, setEvents] = useState(() => parseEvents(rawEvents));
  const maxId = useMemo(
    () => events.reduce((res, ev) => Math.max(ev.id, res), 0),
    [events]
  );

  const calendarEvents = generateCalendarEvents(events);
  computeEventsWidthsAndPosition(events);
  return (
    <div
      style={{
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
          {calendarEvents?.map(({ event, width }, i) => (
            <DrawEvent event={event} width={width} key={event.id} />
          ))}
        </Container>
      </div>
      {/* <AddEventForm setEvents={setEvents} maxId={maxId} /> */}
    </div>
  );
};
