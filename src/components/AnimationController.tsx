import React from 'react'
import { View, Text, Dimensions, Modal, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getIcon } from '../api/icon'
import useGlobal from '../hooks/useGlobal'
import TranslationPack from '../Language/translation'
import { toggleAnimation } from '../redux/actions/global/creator'
import { FlexHorizontal, NotoSans, Space } from './Generic/StyledComponents'

const IconContainer: typeof View = styled(View)`
  width: 50px;
  height: 50px;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

const ModalContentContainer: typeof View = styled(View)`
  position: absolute;
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.8);
`;

const ModalContentBox: typeof View = styled(View)`
  background-color: white;
  width: ${Dimensions.get('window').width - 100}px;
  max-width: 320px;
  padding: 10px;
  border-radius: 10px;
  border-width: 1px;
  border-color: tomato;
`;

const ModalTitle: typeof NotoSans = styled(NotoSans)`
  background-color: tomato;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color: white;
  border-width: 1px;
`;

const AnimationController = () => {
  const global = useGlobal();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisibility] = React.useState(false);
  const {animationEnabled, language: lan} = global;
  const translation = TranslationPack[lan].screens.Main;

  const onPressIcon = () => {
    if (!global.animationEnabled) {
      setModalVisibility(true);
    } else {
      dispatch(toggleAnimation());
    }
  }

  const onPressYes = () => {
    dispatch(toggleAnimation());
    closeModal();
  }

  const closeModal = () => {
    setModalVisibility(false);
  }
  
  const animationIcon = getIcon("materialCommunityIcons", "animation", {
    color: animationEnabled ? "springgreen" : "grey",
    size: 30,
  })

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={onPressIcon}>
        <IconContainer style={{backgroundColor: animationEnabled ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.5)'}}>
          {animationIcon}
        </IconContainer>
      </TouchableOpacity>
      <FlexHorizontal>
        <NotoSans size={12} color="white" type="Thin">
          Anim
        </NotoSans>
        <Space width={5} />
        <NotoSans size={12} color="white" type="Medium">
          {animationEnabled ? 'ON' : 'OFF'}
        </NotoSans>
      </FlexHorizontal>
      <Modal visible={modalVisible} transparent>
        <ModalContentContainer>
          <ModalTitle size={20} type="Black">{translation.activateAnimTitle}</ModalTitle>
          <Space height={10} />
          <ModalContentBox>
            <NotoSans size={15} type="Light">
              {translation.activateAnimDescThin}
              <NotoSans size={15} type="Bold">
                {translation.activateAnimDescBold}
              </NotoSans>
            </NotoSans>
          </ModalContentBox>
          <Space height={10} />
          <FlexHorizontal>
            <TouchableOpacity onPress={onPressYes}>
              <ModalTitle
                size={20}
                style={{backgroundColor: 'grey'}}
                type="Black"
              >
                {translation.yes}
              </ModalTitle>
            </TouchableOpacity>
            <Space width={10} />
            <TouchableOpacity onPress={closeModal}>
              <ModalTitle
                size={20}
                style={{backgroundColor: 'dodgerblue'}}
                type="Black"
              >
                {translation.no}
              </ModalTitle>
            </TouchableOpacity>
          </FlexHorizontal>
        </ModalContentContainer>
      </Modal>
    </View>
  )
}

export default AnimationController
