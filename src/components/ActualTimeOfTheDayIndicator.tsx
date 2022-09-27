import { LocalTime } from '@js-joda/core';

export const ActualTimeOfTheDayIndicator = () => {
  const hour = LocalTime.of(16, 24).hour();
  const minutes = LocalTime.of(16, 45).minute();
  console.log(hour);
  return (
    <div
      style={{
        position: 'absolute',
        color: 'red',
        borderBottom: '2px solid red',
        zIndex: 10,
        width: '100%',
        top: `calc((${hour} - 10)* 100% / 12 + 100% / 12 + ${
          minutes / 60
        } * 100% / 12 )`,
      }}
    ></div>
  );
};
