import styled from '@emotion/styled';
import { useState } from 'react';
import rawEvents from '../input.json';
import { generateEvents, useConfigurationContext, useGenerateCalendarEvents } from '../lib';
import { AddEventForm, DailyCalendar } from './';

const MainContainer = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  min-height: 100vh;
  position: absolute;
  flex-direction: column;
`;

export const Overview = () => {
  const [events, setEvents] = useState(() => generateEvents(rawEvents));
  const calendarEvents = useGenerateCalendarEvents(events);
  const {
    state: { displayCurrentTime, displayAddEventForm },
    dispatch,
  } = useConfigurationContext();

  return (
    <MainContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>
          Display Add event form
          <input
            type={'checkbox'}
            checked={displayAddEventForm}
            onChange={() => dispatch({ type: 'TOGGLE_DISPLAY_ADD_EVENT_FORM' })}
          />
        </label>
        <label>
          Display current time indicator
          <input
            type={'checkbox'}
            checked={displayCurrentTime}
            onChange={() => dispatch({ type: 'TOGGLE_DISPLAY_CURRENT_TIME' })}
          />
        </label>
      </form>
      <DailyCalendar />
      {displayAddEventForm && <AddEventForm setEvents={setEvents} events={events} />}
    </MainContainer>
  );
};
