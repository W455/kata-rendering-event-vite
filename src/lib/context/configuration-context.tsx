import * as React from 'react';
import { createContext, ReactNode, useContext, useReducer } from 'react';

type Dispatch = (action: ConfigurationContextAction) => void;
type ConfigurationContextAction = { type: 'TOGGLE_DISPLAY_CURRENT_TIME' } | { type: 'TOGGLE_DISPLAY_ADD_EVENT_FORM' };

type ConfigurationContextState = {
  displayCurrentTime: boolean;
  displayAddEventForm: boolean;
};

const ConfigurationContext = createContext<{ state: ConfigurationContextState; dispatch: Dispatch } | null>(null);

ConfigurationContext.displayName = 'ConfigurationContext';

function configurationReducer(state: ConfigurationContextState, action: ConfigurationContextAction) {
  switch (action.type) {
    case 'TOGGLE_DISPLAY_CURRENT_TIME': {
      return { ...state, displayCurrentTime: !state.displayCurrentTime };
    }
    case 'TOGGLE_DISPLAY_ADD_EVENT_FORM': {
      return { ...state, displayAddEventForm: !state.displayAddEventForm };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

function ConfigurationContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(configurationReducer, { displayCurrentTime: false, displayAddEventForm: false });
  const value = { state, dispatch };
  return <ConfigurationContext.Provider value={value!}>{children}</ConfigurationContext.Provider>;
}

function useConfigurationContext() {
  const context = useContext(ConfigurationContext);
  if (context === null) {
    throw new Error('configurationContext must be used within a ExperienceReservationProvider');
  }
  return context;
}

export { ConfigurationContextProvider, useConfigurationContext };
