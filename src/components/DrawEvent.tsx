import { Event } from '../types/event';

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
  width,
  position,
  onRemoveEvent,
}: {
  event: Event;
  width: number;
  position: number;
  onRemoveEvent: (event: Event) => void;
}) => {
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
        width: `${width}%`,
        top: `calc((${event.timeSlot.startTime.hour()} - 10)* 100% / 12 + 100% / 12 + ${
          event.timeSlot.startTime.minute() / 60
        } * 100% / 12 )`,
        left: `${position}%`,
      }}
    >
      {event.id}
      {/*<div onClick={() => onRemoveEvent(event)}>X</div>*/}
    </div>
  );
};
