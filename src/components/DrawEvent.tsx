import styled from '@emotion/styled';
import { CalendarEvent, Event } from '../lib';

const StyledEvent = styled('article')<{ calendarEvent: CalendarEvent }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: ${({ calendarEvent }) => `2px solid ${calendarEvent.event.rgbColor.darken(0.3)}`};
  background-color: ${({ calendarEvent }) => calendarEvent.event?.rgbColor.lighten(0.15).alpha(0.9).toString()};
  position: absolute;
  height: ${({ calendarEvent }) => `calc(${calendarEvent.event.duration / 60} * 100% / 12 - 5px)`};
  width: ${({ calendarEvent }) => `calc(${calendarEvent.width}% - 1%)`};
  top: ${({ calendarEvent }) =>
    `calc((${calendarEvent.event.timeSlot.startTime.hour()} - 10)* 100% / 12 + 100% / 12 + ${
      calendarEvent.event.timeSlot.startTime.minute() / 60
    } * 100% / 12 )`};
  left: ${({ calendarEvent }) => `calc(${calendarEvent.position}% + 0.25%)`};
`;

const EventContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 1;
  height: 100%;
`;

const CancelEventIcon = styled('div')`
  position: absolute;
  top: 0;
  right: 5px;
  cursor: pointer;
`;

export const DrawEvent = ({
  calendarEvent,
  onRemoveEvent,
}: {
  calendarEvent: CalendarEvent;
  onRemoveEvent: (event: Event) => void;
}) => {
  return (
    <StyledEvent calendarEvent={calendarEvent}>
      <EventContainer>
        <div>{calendarEvent.event.id}</div>
        <CancelEventIcon onClick={() => onRemoveEvent(calendarEvent.event)}>x</CancelEventIcon>
      </EventContainer>
    </StyledEvent>
  );
};
