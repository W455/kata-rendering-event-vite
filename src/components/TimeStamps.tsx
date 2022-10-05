import styled from '@emotion/styled';
import { useConfigurationContext } from '../lib';

const TimeStampContainer = styled('div')`
  height: 100%;
  min-width: 2.5rem;
  background-color: white;
`;

const TimeStampItem = styled('div')`
  position: relative;
  height: calc(100% / 12);
`;

export const TimeStamps = () => {
  const {
    state: { displayCurrentTime },
  } = useConfigurationContext();

  const span = 13;

  return (
    <TimeStampContainer id="timestamps">
      {[...Array(span + 1)].map((x, i) => (
        <TimeStampItem key={`timestamp-${i}`}>
          {
            <p style={{ transform: `translate(0%, ${i === 0 ? '10' : i === span - 1 ? '-110' : '-50'}%)`, margin: 0 }}>
              {`${(i + 9).toString().padStart(2, '0')}h00`.padStart(5, '0')}
            </p>
          }
        </TimeStampItem>
      ))}
    </TimeStampContainer>
  );
};
