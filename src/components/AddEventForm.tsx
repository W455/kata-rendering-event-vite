import styled from '@emotion/styled';
import { useRef } from 'react';
import { Event } from '../types/event';

const InputsContainer = styled('form')`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const AddEventForm = ({
  maxId,
  setEvents,
}: {
  maxId: number;
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}) => {
  const startTime = useRef<HTMLInputElement>(null);
  const duration = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const color = useRef<HTMLInputElement>(null);
  return (
    <InputsContainer
      onSubmit={(e) => {
        e.preventDefault();
        setEvents((oldEvents) => {
          return [
            ...oldEvents,
            new Event({
              id: maxId + 1,
              start: startTime.current?.value ?? '00:00',
              duration: parseInt(duration.current?.value ?? '0', 10),
            }),
          ].sort((a, b) => (a.timeSlot.startTime.isAfter(b.timeSlot.startTime) ? 1 : -1));
        });
      }}
    >
      <label>
        Starting time
        <input ref={startTime} name="startTime" type="time" required />
      </label>
      <label>
        Duration
        <input ref={duration} type="number" required />
      </label>
      <label>
        Name
        <input type="text" ref={name} />
      </label>
      <label>
        Color
        <input type="color" ref={color} />
      </label>
      <input type="submit" value="Add" />
    </InputsContainer>
  );
};
