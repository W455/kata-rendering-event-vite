import styled from '@emotion/styled';
import { useState } from 'react';
import rawEvents from '../input.json';
import { generateEvents, useConfigurationContext, useGenerateCalendarEvents } from '../lib';
import { CurrentTimeOfTheDayIndicator } from './CurrentTimeOfTheDayIndicator';
import { DrawEvent } from './DrawEvent';
import { TimeStamps } from './TimeStamps';

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
  width: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: calc(100% / 12);
  border-bottom: solid 1px grey;
  top: ${({ index }) => (index * 100) / 12}%;
`;

const Main = styled('div')`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const DailyCalendar = () => {
  const [events, setEvents] = useState(() => generateEvents(rawEvents));
  const calendarEvents = useGenerateCalendarEvents(events);
  const {
    state: { displayCurrentTime },
  } = useConfigurationContext();

  return (
    <Main>
      <TimeStamps />
      <Container>
        {displayCurrentTime && <CurrentTimeOfTheDayIndicator />}
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
    </Main>
  );
};
