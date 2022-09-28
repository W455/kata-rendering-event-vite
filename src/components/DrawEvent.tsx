import { Event, RawEvent } from '../types/event';

const colors = [
  '#a6b1e1',
  '#ffb85c',
  '#bf93b1',
  '#8cb25d',
  '#d07676',
  '#576bc7',
  '#b86800',
  '#673C59',
  '#386600',
  '#6A2424',
];

export const DrawEvent = ({
  event,
  events,
}: {
  event: Event;
  events: Array<Event>;
}) => {
  const overlappingEvents = event.overlappingEvents(events);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: colors[event.id % colors.length],
        position: 'absolute',
        height: `calc(${event.duration / 60} * 100% / 12 )`,
        width: `${100 / event.overlappingEvents(events).length}%`,
        top: `calc((${event.timeSlot.startTime.hour()} - 10)* 100% / 12 + 100% / 12 + ${
          event.timeSlot.startTime.minute() / 60
        } * 100% / 12 )`,
        left: `${
          (100 / overlappingEvents.length) * overlappingEvents.indexOf(event)
        }%`,
      }}
    >
      {event.id}
    </div>
  );
};
