import React from 'react'
import { View, Text, Modal, Dimensions, TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components';
import useGlobal from '../../hooks/useGlobal'
import TranslationPack from '../../Language/translation';
import { FlexHorizontal, NotoSans, Space } from '../Generic/StyledComponents';

const Container: typeof View = styled(View)`
  flex: 1;
  background-color: rgba(0,0,0,0.8);
  justify-content: center;
  align-items: center;
`;

const Popup: typeof View = styled(View)`
  background-color: white;
  border-radius: 20px;
  border-width: 1px;
  border-color: tomato;
  padding: 10px;
  padding-left: 30px;
  padding-right: 30px;
  max-width: 300px;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer: typeof View = styled(View)`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const ButtonStyle = css`
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  border-width: 1px;
`;

const YesButton: typeof NotoSans = styled(NotoSans)`
  ${ButtonStyle};
  background-color: grey;
  color: lightgrey;
`;

const NoButton: typeof NotoSans = styled(NotoSans)`
  ${ButtonStyle};
  background-color: dodgerblue;
  color: white;
`;

const AskText: typeof NotoSans = styled(NotoSans)`
  
`;

type LogoutModalProps = {
  visible?: boolean;
  onPressYes?: () => any;
  onPressNo?: () => any;
}

const LogoutModal = (props: LogoutModalProps) => {
  const {visible, onPressNo, onPressYes} = props;
  const {language: lan} = useGlobal();
  const translation = TranslationPack[lan].screens.Main;

  return (
    <Modal
      animationType="fade"
      onRequestClose={onPressNo}
      onDismiss={onPressNo}
      transparent
      visible={visible}
    >
      <Container>
        <Popup>
          <AskText type="Black" color="tomato" size={25}>
            {translation.logoutDesc}
          </AskText>
        </Popup>
        <ButtonContainer>
          <TouchableOpacity onPress={onPressYes}>
            <YesButton type="Black" size={20}>
              {translation.yes}
            </YesButton>
          </TouchableOpacity>
          <Space width={10} />
          <TouchableOpacity onPress={onPressNo}>
            <NoButton type="Black" size={20}>
              {translation.no}
            </NoButton>
          </TouchableOpacity>
        </ButtonContainer>
      </Container>
    </Modal>
  )
}

export default LogoutModal
