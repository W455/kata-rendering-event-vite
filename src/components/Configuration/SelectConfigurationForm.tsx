import styled from '@emotion/styled';
import { useConfigurationContext } from '../../lib';

const ConfigContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  padding: 1rem 2rem 1rem;
`;

const StyledLabel = styled('label')`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const SelectConfigurationForm = () => {
  const {
    state: { displayCurrentTime, displayAddEventForm, displayTimeStamps },
    dispatch,
  } = useConfigurationContext();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <ConfigContainer>
        <StyledLabel>
          <input
            type={'checkbox'}
            checked={displayAddEventForm}
            onChange={() => dispatch({ type: 'TOGGLE_DISPLAY_ADD_EVENT_FORM' })}
          />
          Formulaire d'ajout d'événement
        </StyledLabel>
        <StyledLabel>
          <input
            type={'checkbox'}
            checked={displayCurrentTime}
            onChange={() => dispatch({ type: 'TOGGLE_DISPLAY_CURRENT_TIME' })}
          />
          Indicateur de l'heure
        </StyledLabel>
        <StyledLabel>
          <input
            type={'checkbox'}
            checked={displayTimeStamps}
            onChange={() => dispatch({ type: 'TOGGLE_DISPLAY_TIME_STAMPS' })}
          />
          Horodatage
        </StyledLabel>
      </ConfigContainer>
    </form>
  );
};
