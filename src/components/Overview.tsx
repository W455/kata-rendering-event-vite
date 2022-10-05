import styled from '@emotion/styled';
import { useState } from 'react';
import rawEvents from '../input.json';
import { generateEvents, useConfigurationContext } from '../lib';
import { AddEventForm, DailyCalendar, SelectConfigurationForm } from './';

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
    state: { displayAddEventForm },
  } = useConfigurationContext();

  return (
    <MainContainer>
      <SelectConfigurationForm />
      <DailyCalendar setEvents={setEvents} events={events} />
      {displayAddEventForm && <AddEventForm setEvents={setEvents} events={events} />}
    </MainContainer>
  );
};
