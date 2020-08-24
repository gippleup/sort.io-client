import React from 'react'
import { View, Text } from 'react-native'
import BasicPopup from '../../../components/Generic/BasicPopup'
import { NotoSans } from '../../../components/Generic/StyledComponents'
import usePopup from '../../../hooks/usePopup'


type CancelGamePopupProps = {
  onPressYes: () => void;
  text: string;
}

const CancelGamePopup: React.FC<CancelGamePopupProps> = (props) => {
  const {text, onPressYes} = props;
  const popup = usePopup();
  return (
    <BasicPopup
      title="PAUSE"
      buttonAlign="horizontal"
      buttons={[
        {
          text: "예",
          onPress: () => {
            popup.hide();
            if (onPressYes) {
              onPressYes();
            }
          },
          style: {
            backgroundColor: 'pink',
          }
        },
        {
          text: "아니요",
          onPress: () => {
            popup.hide();
          },
          style: {
            backgroundColor: 'lightgrey',
          }
        },
      ]}>
      <NotoSans type="Black">{text}</NotoSans>
    </BasicPopup>
  )
}

export default CancelGamePopup
