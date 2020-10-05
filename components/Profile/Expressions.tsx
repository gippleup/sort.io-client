import React from 'react';
import { View } from 'react-native';
import { IconContainer, getIcon } from '../../api/icon';

const expressions = {
  like: (
    <IconContainer color="dodgerblue" border="blue">
      {getIcon("antDesign", "like1", {size: 25, color: "white"})}
    </IconContainer>
  ),
  dislike: (
    <IconContainer color="tomato" border="black">
      {getIcon("antDesign", "dislike1", { size: 25, color: "white" })}
    </IconContainer>
  ),
  trophy: (
    <IconContainer color="yellow" border="goldenrod">
      {getIcon("antDesign", "Trophy", { color: "goldenrod", size: 30 })}
    </IconContainer>
  ),
  meh: (
    <IconContainer size={40} color="yellow">
      {getIcon("antDesign", "meh", { color: "black", size: 40 })}      
    </IconContainer>
  ),
  smileo: (
    <IconContainer size={40} color="yellow">
      {getIcon("antDesign", "smileo", { color: "black", size: 40 })}
    </IconContainer>
  ),
  frowno: (
    <IconContainer size={40} color="yellow">
      {getIcon("antDesign", "frowno", { color: "black", size: 40 })}
    </IconContainer>
  ),
  wink: (
    <IconContainer size={50} color="yellow">
      {getIcon("entypo", "emoji-flirt", {color: "black"})}
    </IconContainer>
  ),
  smile: (
    <IconContainer size={50} color="yellow">
      {getIcon("entypo", "emoji-happy", { color: "black" })}
    </IconContainer>
  ),
  neutral: (
    <IconContainer size={50} color="yellow">
      {getIcon("entypo", "emoji-neutral", { color: "black" })}
    </IconContainer>
  ),
  sad: (
    <IconContainer size={50} color="yellow">
      {getIcon("entypo", "emoji-sad", { color: "black" })}
    </IconContainer>
  ),
  hand: (
    <IconContainer color="black" >
      {getIcon("entypo", "hand", { color: "yellow", size: 30 })}
    </IconContainer>
  ),
  heart: (
    <IconContainer color="tomato">
      {getIcon("entypo", "heart", { color: "white", size: 30 })}
    </IconContainer>
  ),
  handPeace: (
    <IconContainer color="yellow" border="black">
      {getIcon("fontAwesome", "hand-peace-o", { color: "black", size: 30 })}
    </IconContainer>
  ),
  handShake: (
    <IconContainer color="green" border="limegreen" size={50}>
      {getIcon("fontAwesome", "handshake-o", { color: "white", size: 25 })}
    </IconContainer>
  ),
  grinBeamSweat: (
    <IconContainer color="yellow" size={50}>
      {getIcon("fontAwesome5", "grin-beam-sweat", { color: "dodgerblue", size: 40 })}
    </IconContainer>
  ),
  grinSquitTears: (
    <IconContainer color="yellow" size={50}>
      {getIcon("fontAwesome5", "grin-squint-tears", { color: "dodgerblue", size: 40 })}
    </IconContainer>
  ),
  grinSquint: (
    <IconContainer color="yellow" size={50}>
      {getIcon("fontAwesome5", "grin-squint", { color: "dodgerblue", size: 40 })}
    </IconContainer>
  ),
  grinTears: (
    <IconContainer color="yellow" size={50}>
      <View style={{position: 'absolute', width: 50}}>
        {getIcon("fontAwesome5", "grin-tears", { color: "dodgerblue", size: 40 })}
      </View>
    </IconContainer>
  ),
  grinTongueSquint: (
    <IconContainer color="yellow" size={50}>
      {getIcon("fontAwesome5", "grin-tongue-squint", { color: "dodgerblue", size: 40 })}
    </IconContainer>
  ),
  grinWink: (
    <IconContainer color="yellow" size={50}>
      {getIcon("fontAwesome5", "grin-wink", { color: "dodgerblue", size: 40 })}
    </IconContainer>
  ),
  heartBroken: (
    <IconContainer color="black" size={40} border="tomato">
      {getIcon("fontAwesome5", "heart-broken", { color: "tomato", size: 25 })}
    </IconContainer>
  ),
  hourglassHalf: (
    <IconContainer color="orange" size={45} border="red" borderWidth={5}>
      {getIcon("fontAwesome5", "hourglass-half", { color: "black", size: 20 })}
    </IconContainer>
  ),
  question: (
    <IconContainer color="dodgerblue" size={45}>
      {getIcon("fontAwesome5", "question", { color: "white", size: 20 })}
    </IconContainer>
  ),
  redo: (
    <IconContainer color="dodgerblue" size={45}>
      {getIcon("fontAwesome5", "redo", { color: "white", size: 20 })}
    </IconContainer>
  ),
  tired: (
    <IconContainer color="yellow" size={50}>
      {getIcon("fontAwesome5", "tired", { color: "black", size: 40 })}
    </IconContainer>
  ),
}

export type SupportedExpression = keyof typeof expressions;

export default expressions;