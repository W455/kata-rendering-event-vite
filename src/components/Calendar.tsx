import styled from '@emotion/styled';
import { LocalTime } from '@js-joda/core';
import { useMemo, useState } from 'react';
import { Event, RawEvent } from '../types/event';
import rawEvents from '../input.json';
import { ActualTimeOfTheDayIndicator, AddEventForm, TimeStamps } from './';

const Container = styled.div`
  min-width: 100vw;
  height: 100%;
  background-color: lightgray;
  box-sizing: border-box !important;
  display: flex;
  flex-direction: row;
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
    .sort((a, b) =>
      a.timeSlot.startTime.isAfter(b.timeSlot.startTime) ? 1 : -1
    );
}

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
  '#6A2424',
];

export const DrawEvent = ({ event }: { event: Event }) => {
  return (
    <div
      style={{
        backgroundColor: colors[event.id % colors.length],
        position: 'absolute',
        height: `calc(${event.duration / 60} * 100% / 12 )`,
        width: '100%',
        top: `calc((${event.timeSlot.startTime.hour()} - 10)* 100% / 12 + 100% / 12 + ${
          event.timeSlot.startTime.minute() / 60
        } * 100% / 12 )`,
      }}
    >
      {event.id}
    </div>
  );
};

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
            <HourSlice key={i} index={i}>
              {i}
            </HourSlice>
          ))}
          {events?.map((event, i) => (
            <DrawEvent event={event} key={event.id} />
          ))}
        </Container>
      </div>
      {/* <AddEventForm setEvents={setEvents} maxId={maxId} /> */}
    </div>
  );
};
