import React from 'react'
import { View, Text, Modal, BackHandler,  } from 'react-native'
import styled from 'styled-components';

const PopupContentContainer = styled(View)`
  flex: 1;
  background-color: rgba(0,0,0,0.3);
  align-items: center;
  justify-content: center;
`;

export const PopupContext = React.createContext<any>(null);

type PopupProviderProps = {
  children: React.ReactElement;
}

export const PopupProvider = (props: PopupProviderProps) => {
  const [target, setTarget] = React.useState<React.ComponentClass | React.FunctionComponent>();
  const [visible, setVisible] = React.useState(false);

  const popupContainer = {
    component: (
      <Modal
        animationType="fade"
        onRequestClose={() => setVisible(false)}
        visible={visible}
        transparent
      >
        <PopupContentContainer>
          {target}
        </PopupContentContainer>
      </Modal>
    ),
    hide: () => setVisible(false),
    show: (target: React.ComponentClass | React.FunctionComponent) => {
      setTarget(target);
      setVisible(true);
    },
  }

  return <PopupContext.Provider value={popupContainer}>{props.children}</PopupContext.Provider>
}

const usePopup = () => {
  const ContextValue = React.useContext(PopupContext);
  return ContextValue;
}

export default usePopup
