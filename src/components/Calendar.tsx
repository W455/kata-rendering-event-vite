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

export const Calendar = () => {
  const [events, setEvents] = useState(() => parseEvents(rawEvents));
  const maxId = useMemo(
    () => events.reduce((res, ev) => Math.max(ev.id, res), 0),
    [events]
  );

  console.log({ events, maxId });
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
          {events?.map((event, i) => (
            <DrawEvent event={event} events={events} key={event.id} />
          ))}
        </Container>
      </div>
      {/* <AddEventForm setEvents={setEvents} maxId={maxId} /> */}
    </div>
  );
};
