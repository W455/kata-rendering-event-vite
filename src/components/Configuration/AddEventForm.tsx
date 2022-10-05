import styled from '@emotion/styled';
import React, { useRef } from 'react';
import { Event } from '../../lib';

const InputsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  padding: 1rem 2rem 1rem;
`;

const StyledLabel = styled('label')`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const AddEventForm = ({
  events,
  setEvents,
}: {
  events: Readonly<Array<Event>>;
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}) => {
  const maxId = events.reduce((res, ev) => Math.max(ev.id, res), 0);
  const startTime = useRef<HTMLInputElement>(null);
  const duration = useRef<HTMLInputElement>(null);
  const color = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setEvents((oldEvents) => {
          return [
            ...oldEvents,
            new Event({
              id: maxId + 1,
              start: startTime.current?.value ?? '00:00',
              duration: parseInt(duration.current?.value ?? '0', 10),
              color: color.current?.value,
            }),
          ].sort((a, b) => (a.timeSlot.startTime.isAfter(b.timeSlot.startTime) ? 1 : -1));
        });
      }}
    >
      <InputsContainer>
        <StyledLabel>
          Heure de début de l'événement
          <input ref={startTime} name="startTime" type="time" required />
        </StyledLabel>
        <StyledLabel>
          Durée
          <input ref={duration} type="number" required style={{ width: '4rem' }} />
        </StyledLabel>

        <StyledLabel>
          Couleur
          <input type="color" ref={color} />
        </StyledLabel>
        <input
          type="submit"
          value="Ajouter"
          style={{ backgroundColor: 'lightgray', border: '1px solid #A9A9A9', borderRadius: 5, padding: '0 1rem' }}
        />
      </InputsContainer>
    </form>
  );
};
