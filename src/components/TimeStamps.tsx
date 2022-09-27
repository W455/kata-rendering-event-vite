import styled from '@emotion/styled';

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
  return (
    <TimeStampContainer id="timestamps">
      {[...Array(12)].map((x, i) => (
        <TimeStampItem key={`timestamp-${i}`}>
          {i !== 0 && (
            <p style={{ transform: 'translate(0%, -50%)', margin: 0 }}>
              {i + 9}h00
            </p>
          )}
        </TimeStampItem>
      ))}
    </TimeStampContainer>
  );
};
