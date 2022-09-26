import styled from "@emotion/styled";

const TimeStampContainer = styled("div")`
  height: 100%;
  min-width: 2.5rem;
  background-color: white;
`;

const TimeStampItem = styled("div")`
  position: relative;
  height: calc(100% / 12);
  transform: translate(0%, -16%);
`;

export const TimeStamps = () => {
  return (
    <TimeStampContainer id="timestamps">
      {[...Array(12)].map((x, i) => (
        <TimeStampItem key={`timestamp-${i}`}>
          {i !== 0 && <span>{i + 9}h00</span>}
        </TimeStampItem>
      ))}
    </TimeStampContainer>
  );
};
