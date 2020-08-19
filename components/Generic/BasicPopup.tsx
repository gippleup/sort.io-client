import React, { Fragment } from 'react'
import { View, Text, ViewStyle, TouchableOpacity, Dimensions } from 'react-native'
import styled, { css } from 'styled-components'
import { NotoSans, TitleText, Space, FlexHorizontal } from './StyledComponents';

const TitleContainer = styled(View)`
  background-color: white;
  border-radius: 100px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-width: 3px;
  align-self: center;
`;

const Content = styled(View)`
  margin-top: 10px;
  padding: 15px;
  background-color: white;
  border-radius: 20px;
  border-width: 3px;
  align-items: center;
  justify-content: center;
`;

const ButtonShell: typeof View = styled(View)`
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 30px;
  align-self: center;
  border-width: 3px;
  background-color: ghostwhite;
  elevation: 5;
`;

type PopupButton = {
  text: string;
  onPress: () => any;
  style?: ViewStyle;
}

type BasicPopupProps = {
  title?: string;
  content: React.ReactNode;
  buttons?: PopupButton[];
  buttonAlign?: 'vertical' | 'horizontal';
}

const BasicPopup = (props: BasicPopupProps) => {
  const {title, content, buttons, buttonAlign} = props;
  const renderTitle = () => {
    if (!title) return <></>;
    return (
      <TitleContainer>
        <TitleText>{title}</TitleText>
      </TitleContainer>
    )
  }

  const renderButtons = () => {
    if (!buttons) return <></>;
    const Aligner: React.FC<{}> = (props) => {
      if (buttonAlign === 'horizontal') {
        return (
          <FlexHorizontal 
            children={props.children}
            style={{
              justifyContent: 'center',
              maxWidth: Dimensions.get('screen').width - 60
            }}
          />
        )
      } else {
        return <View children={props.children} />
      }
    }
    return (
      <>
        <Space height={10}/>
        <Aligner>
          {buttons.map((button, i) => (
            <Fragment key={i}>
              <View>
                <TouchableOpacity onPress={button.onPress}>
                  <ButtonShell style={button.style}>
                    <NotoSans type="Bold" size={20}>{button.text}</NotoSans>
                  </ButtonShell>
                </TouchableOpacity>
              </View>
              {buttons[i + 1]
                ? buttonAlign === 'horizontal'
                  ? <Space width={10}/> : <Space height={10}/>
                : <></>
              }
            </Fragment>
          ))}
        </Aligner>
      </>
    )
  }

  return (
    <View>
      {renderTitle()}
      <Content>
        {content}
      </Content>
      {renderButtons()}
    </View>
  )
}

export default BasicPopup
