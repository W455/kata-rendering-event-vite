import styled from '@emotion/styled';
import { LocalTime } from '@js-joda/core';
import { useMemo, useState } from 'react';
import { Event, RawEvent } from '../types/event';
import rawEvents from '../input.json';
import { AddEventForm, TimeStamps } from './';

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

const ActualTimeOfTheDayIndicator = () => {
  const hour = LocalTime.of(16, 24).hour();
  const minutes = LocalTime.of(16, 45).minute();
  console.log(hour);
  return (
    <div
      style={{
        position: 'absolute',
        color: 'red',
        borderBottom: '2px solid red',
        zIndex: 10,
        width: '100%',
        top: `calc((${hour} - 10)* 100% / 12 + 100% / 12 + ${
          minutes / 60
        } * 100% / 12 )`,
      }}
    ></div>
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
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          // gap: 20,
          height: '100vh',
        }}
      >
        <TimeStamps />
        <ActualTimeOfTheDayIndicator />
        {/* <p>Calendar</p> */}
        <Container>
          {[...Array(12)].map((x, i) => (
            <HourSlice key={i} index={i}>
              {i}
            </HourSlice>
          ))}
          {/* <div>
          {events?.map((event, i) => (
            <div
              style={{
                height: `${100 / 12}%`,
                display: "flex",
                alignItems: "center"
              }}
              key={event.id}
            >
              {event.timeSlot.startTime.toString()}
            </div>
          ))}
        </div> */}
        </Container>
      </div>
      {/* <AddEventForm setEvents={setEvents} maxId={maxId} /> */}
    </>
  );
};
