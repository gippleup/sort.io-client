import React from 'react'
import { View, Text, Modal, BackHandler,  } from 'react-native'
import styled from 'styled-components';

const PopupContentContainer = styled(View)`
  flex: 1;
  background-color: rgba(0,0,0,0.3);
  align-items: center;
  justify-content: center;
`;

type PopupContainer = {
  component: React.ReactElement;
  hide: () => void;
  show: (target: React.ComponentClass | React.FunctionComponent) => void;
  addListener: (type: 'show' | 'hide', cb: () => any) => void;
  removeListener: (type: 'show' | 'hide', cb: () => any) => void;
}

export const PopupContext = React.createContext<PopupContainer>({
  component: <></>,
  hide: () => {},
  show: () => {},
  addListener: () => {},
  removeListener: () => {},
});

type PopupProviderProps = {
  children: React.ReactElement;
}

export const PopupProvider = (props: PopupProviderProps) => {
  const [target, setTarget] = React.useState<React.ComponentClass | React.FunctionComponent>();
  const [visible, setVisible] = React.useState(false);

  const listener: {[index in "show" | "hide"]: Function[]} = {
    show: [],
    hide: [],
  };

  const popupContainer: PopupContainer = {
    component: (
      <Modal
        animationType="fade"
        onRequestClose={() => {
          setVisible(false);
          listener.hide.forEach((cb) => cb())
        }}
        visible={visible}
        transparent
      >
        <PopupContentContainer>
          {target}
        </PopupContentContainer>
      </Modal>
    ),
    hide: () => {
      setVisible(false)
      listener.hide.forEach((cb) => cb())
    },
    show: (target) => {
      setTarget(target);
      setVisible(true);
      listener.show.forEach((cb) => cb())
    },
    addListener: (type: 'show' | 'hide', callback: () => any) => {
      listener[type].push(callback);
    },
    removeListener: (type: 'show' | 'hide', callback: () => any) => {
      listener[type] = listener[type].filter((cb) => cb.toString() !== callback.toString());
    }
  }

  return <PopupContext.Provider value={popupContainer}>{props.children}</PopupContext.Provider>
}

const usePopup = () => {
  const ContextValue = React.useContext(PopupContext);
  return ContextValue;
}

export default usePopup
