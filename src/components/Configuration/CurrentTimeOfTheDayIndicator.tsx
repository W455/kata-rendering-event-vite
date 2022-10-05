import styled from '@emotion/styled';
import { LocalTime } from '@js-joda/core';
import { useEffect, useState } from 'react';

const CurrentTimeIndicatorBase = styled('div')<{ hours: number; minutes: number }>`
  z-index: 12;
  color: red;
  position: absolute;
  top: ${({ hours, minutes }) => `calc((${hours} - 10) * 100% / 12 + 100% / 12 + ${minutes / 60} * 100% / 12)`};
`;

const CurrentTimeIndicatorBar = styled(CurrentTimeIndicatorBase)<{ hours: number; minutes: number }>`
  border-bottom: 2px solid red;
  width: 100%;
`;

const CurrentTimeIndicatorText = styled(CurrentTimeIndicatorBase)<{ hours: number; minutes: number }>`
  width: fit-content;
  background-color: white;
  transform: translate(-100%, -40%);

  &::before {
    content: '';
    margin: 0 -5px;
    width: 12px;
    height: 12px;
    display: inline-block;
    border-radius: 7.5px;
    background-color: red;
  }
`;

export const CurrentTimeOfTheDayIndicator = () => {
  const [currentTime, setCurrentTime] = useState(LocalTime.now);
  const [hours, minutes] = [currentTime.hour(), currentTime.minute()];

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentTime(LocalTime.now()), 1000 * 60);
    console.log(currentTime.toString());
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <CurrentTimeIndicatorBar hours={hours} minutes={minutes} />
      <CurrentTimeIndicatorText hours={hours} minutes={minutes} />
    </>
  );
};
