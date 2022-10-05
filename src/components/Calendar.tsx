import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import rawEvents from '../input.json';
import { useGenerateCalendarEvents } from '../lib/hooks';
import { generateEvents } from '../lib/utils';
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

export const Calendar = () => {
  const [events, setEvents] = useState(() => generateEvents(rawEvents));
  const maxId = useMemo(() => events.reduce((res, ev) => Math.max(ev.id, res), 0), [events]);
  const calendarEvents = useGenerateCalendarEvents(events);

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
