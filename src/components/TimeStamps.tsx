import styled from '@emotion/styled';
import { useConfigurationContext } from '../lib';

const TimeStampContainer = styled('div')`
  height: 100%;
  min-width: 2.5rem;
  color: gray;
  background-color: white;
`;

const TimeStampItem = styled('div')<{ isLastItem: boolean }>`
  position: relative;
  height: ${({ isLastItem }) => `${isLastItem ? 'calc(100% / 12)' : '0'}`};
`;

const TimeStampLabel = styled('p')<{ index: number; range: number }>`
  text-align: right;
  transform: ${({ index, range }) => `translate(-10%, ${index === 0 ? '10' : index === range ? '-110' : '-50'}%)`};
  margin: 0;
  overflow: hidden;
`;

export const TimeStamps = () => {
  const {
    state: { displayCurrentTime },
  } = useConfigurationContext();

  const range = 12;

  return (
    <TimeStampContainer id="timestamps">
      {[...Array(range + 1)].map((x, i) => (
        <TimeStampItem key={`timestamp-${i}`} isLastItem={i !== range}>
          {
            <TimeStampLabel index={i} range={range}>
              {`${(i + 9).toString().padStart(2, '0')}h`.padStart(3, '0')}
            </TimeStampLabel>
          }
        </TimeStampItem>
      ))}
    </TimeStampContainer>
  );
};
