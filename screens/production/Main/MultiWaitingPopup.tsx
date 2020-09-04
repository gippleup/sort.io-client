import React, { RefObject } from 'react'
import { View, Text } from 'react-native'
import Loading from '../../../components/Loading'
import NativeRefBox from '../../../components/NativeRefBox'
import { FullFlexCenter, Modal, LoadingAnimationContainer, LoadingText } from './MultiWaitingPopup/_StyledComponent'

const MultiWaitingPopup = () => {
  let foundMatch = false;
  let text = 'Finding Match';
  const loadingTextRef = React.createRef<Text>();
  const modalRef = React.createRef<NativeRefBox>();

  const setRefText = (text: string) => {
    loadingTextRef.current?.setNativeProps({
      text,
    })
  }

  const checkIfLoaded = () => {
    return foundMatch;
  }

  const onLastAnimationStarted = () => {
    setRefText("Connecting!");
    modalRef.current?.setStyle({
      backgroundColor: 'black',
      borderColor: 'white'
    });
    loadingTextRef.current?.setNativeProps({
      style: {
        color: 'yellow',
        fontSize: 25,
      }
    })
  }

  const onAnimationCompleted = () => {}

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      foundMatch = true;
    }, 3000)

    const updateLoadingText = () => {
      if (!foundMatch) {
        if (text !== 'Finding Match...') {
          text += '.';
        } else {
          text = 'Finding Match';
        }
      } else {
        text = 'Found Match!';
        clearInterval(interval);
      }
      setRefText(text);
    }

    const interval = setInterval(updateLoadingText, 800)

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    }
  }, [])

  return (
    <FullFlexCenter>
      <Modal ref={modalRef}>
        <LoadingAnimationContainer>
          <Loading
            checkIfLoaded={checkIfLoaded}
            onLastAnimationStarted={onLastAnimationStarted}
            onAnimationCompleted={onAnimationCompleted}
          />
        </LoadingAnimationContainer>
        <LoadingText
          ref={loadingTextRef}
          editable={false}
          value={text}
        />
      </Modal>
    </FullFlexCenter>
  )
}

export default MultiWaitingPopup
