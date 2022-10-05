import { LocalTime } from '@js-joda/core';
import { useEffect, useState } from 'react';

export const ActualTimeOfTheDayIndicator = () => {
  const [currentTime, setCurrentTime] = useState(LocalTime.now());
  const hour = currentTime.hour();
  const minutes = currentTime.minute();

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentTime(LocalTime.now()), 1000 * 60);
    console.log(currentTime.toString());
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        color: 'red',
        borderBottom: '2px solid red',
        zIndex: 10,
        width: '100%',
        top: `calc((${hour} - 10)* 100% / 12 + 100% / 12 + ${minutes / 60} * 100% / 12 )`,
      }}
    ></div>
  );
};
