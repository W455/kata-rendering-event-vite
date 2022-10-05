import styled from '@emotion/styled';
import { useState } from 'react';
import rawEvents from '../input.json';
import { generateEvents, useConfigurationContext } from '../lib';
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
  const {
    state: { displayCurrentTime, displayAddEventForm, displayTimeStamps },
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
        <label>
          Display timeStamps
          <input
            type={'checkbox'}
            checked={displayTimeStamps}
            onChange={() => dispatch({ type: 'TOGGLE_DISPLAY_TIME_STAMPS' })}
          />
        </label>
      </form>
      <DailyCalendar setEvents={setEvents} events={events} />
      {displayAddEventForm && <AddEventForm setEvents={setEvents} events={events} />}
    </MainContainer>
  );
};
