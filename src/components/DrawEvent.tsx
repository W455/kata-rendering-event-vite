import { Event } from '../lib/models/event';

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
        backgroundColor: event.color,
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
