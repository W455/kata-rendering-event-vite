import styled from '@emotion/styled';
import React from 'react';
import { Event, useConfigurationContext, useGenerateCalendarEvents } from '../lib';
import { CurrentTimeOfTheDayIndicator } from './CurrentTimeOfTheDayIndicator';
import { DrawEvent } from './DrawEvent';
import { TimeStamps } from './TimeStamps';

const Container = styled.div`
  height: 100%;
  flex: 1 2;
  box-sizing: border-box !important;
  display: flex;
  flex-direction: row;
  position: relative;
  border-left: 1px solid grey;
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

export const DailyCalendar = ({
  events,
  setEvents,
}: {
  events: Readonly<Array<Event>>;
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}) => {
  const calendarEvents = useGenerateCalendarEvents(events);
  const {
    state: { displayCurrentTime, displayTimeStamps },
  } = useConfigurationContext();

  return (
    <Main>
      {displayTimeStamps && <TimeStamps />}
      <Container>
        {displayCurrentTime && <CurrentTimeOfTheDayIndicator />}
        {[...Array(12)].map((x, i) => (
          <HourSlice key={i} index={i} />
        ))}
        {calendarEvents?.map((calendarEvent, i) => (
          <DrawEvent
            calendarEvent={calendarEvent}
            key={calendarEvent.event.id}
            onRemoveEvent={(eventToRemove) => setEvents(events.filter((e) => e !== eventToRemove))}
          />
        ))}
      </Container>
    </Main>
  );
};
