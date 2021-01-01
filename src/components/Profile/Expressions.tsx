import chroma from 'chroma-js';
import React from 'react';
import { View } from 'react-native';
import { IconContainer, getIcon } from '@api/icon';

const getGrayscale = (color: string) => chroma(color).set('hsl.s', 0).hex();

const expressions = {
  like: (isActive: boolean) => {
    return (
      <IconContainer color={isActive ? "dodgerblue" : getGrayscale("dodgerblue")} border={isActive ? "blue" : getGrayscale("blue")}>
        {getIcon("antDesign", "like1", { size: 25, color: isActive ? "white" : getGrayscale("white")})}
      </IconContainer>
    )
  },
  dislike: (isActive: boolean) =>  (
    <IconContainer color={isActive ? "tomato" : getGrayscale("tomato")} border={isActive ? "black" : getGrayscale("black")}>
      {getIcon("antDesign", "dislike1", { size: 25, color: isActive ? "white" : getGrayscale("white") })}
    </IconContainer>
  ),
  trophy: (isActive: boolean) =>  (
    <IconContainer color={isActive ? "yellow" : getGrayscale("yellow")} border={isActive ? "goldenrod" : getGrayscale("goldenrod")}>
      {getIcon("antDesign", "Trophy", { color: isActive ? "goldenrod" : getGrayscale("goldenrod"), size: 30 })}
    </IconContainer>
  ),
  meh: (isActive: boolean) => (
    <IconContainer size={40} color={isActive ? "yellow" : getGrayscale("yellow")}>
      {getIcon("antDesign", "meh", { color: isActive ? "black" : getGrayscale("black"), size: 40 })}      
    </IconContainer>
  ),
  smileo: (isActive: boolean) => (
    <IconContainer size={40} color={isActive ? "yellow" : getGrayscale("yellow")}>
      {getIcon("antDesign", "smileo", { color: isActive ? "black" : getGrayscale("black"), size: 40 })}
    </IconContainer>
  ),
  frowno: (isActive: boolean) => (
    <IconContainer size={40} color={isActive ? "yellow" : getGrayscale("yellow")}>
      {getIcon("antDesign", "frowno", { color: isActive ? "black" : getGrayscale("black"), size: 40 })}
    </IconContainer>
  ),
  wink: (isActive: boolean) => (
    <IconContainer size={50} color={isActive ? "yellow" : getGrayscale("yellow")}>
      {getIcon("entypo", "emoji-flirt", {color: isActive ? "black" : getGrayscale("black")})}
    </IconContainer>
  ),
  smile: (isActive: boolean) => (
    <IconContainer size={50} color={isActive ? "yellow" : getGrayscale("yellow")}>
      {getIcon("entypo", "emoji-happy", { color: isActive ? "black" : getGrayscale("black") })}
    </IconContainer>
  ),
  neutral: (isActive: boolean) => (
    <IconContainer size={50} color={isActive ? "yellow" : getGrayscale("yellow")}>
      {getIcon("entypo", "emoji-neutral", { color: isActive ? "black" : getGrayscale("black") })}
    </IconContainer>
  ),
  sad: (isActive: boolean) => (
    <IconContainer size={50} color={isActive ? "yellow" : getGrayscale("yellow")}>
      {getIcon("entypo", "emoji-sad", { color: isActive ? "black" : getGrayscale("black") })}
    </IconContainer>
  ),
  hand: (isActive: boolean) => (
    <IconContainer color={isActive ? "black" : getGrayscale("black")} >
      {getIcon("entypo", "hand", { color: isActive ? "yellow" : getGrayscale("yellow"), size: 30 })}
    </IconContainer>
  ),
  heart: (isActive: boolean) => (
    <IconContainer color={isActive ? "tomato" : getGrayscale("tomato")}>
      {getIcon("entypo", "heart", { color: isActive ? "white" : getGrayscale("white"), size: 30 })}
    </IconContainer>
  ),
  handPeace: (isActive: boolean) => (
    <IconContainer color={isActive ? "yellow" : getGrayscale("yellow")} border={isActive ? "black" : getGrayscale("black")}>
      {getIcon("fontAwesome", "hand-peace-o", { color: isActive ? "black" : getGrayscale("black"), size: 30 })}
    </IconContainer>
  ),
  handShake: (isActive: boolean) => (
    <IconContainer color={isActive ? "green" : getGrayscale("green")} border={isActive ? "limegreen" : getGrayscale("limegreen")} size={50}>
      {getIcon("fontAwesome", "handshake-o", { color: isActive ? "white" : getGrayscale("white"), size: 25 })}
    </IconContainer>
  ),
  grinBeamSweat: (isActive: boolean) => (
    <IconContainer color={isActive ? "yellow" : getGrayscale("yellow")} size={50}>
      {getIcon("fontAwesome5", "grin-beam-sweat", { color: isActive ? "dodgerblue" : getGrayscale("dodgerblue"), size: 40 })}
    </IconContainer>
  ),
  grinSquitTears: (isActive: boolean) => (
    <IconContainer color={isActive ? "yellow" : getGrayscale("yellow")} size={50}>
      {getIcon("fontAwesome5", "grin-squint-tears", { color: isActive ? "dodgerblue" : getGrayscale("dodgerblue"), size: 40 })}
    </IconContainer>
  ),
  grinSquint: (isActive: boolean) => (
    <IconContainer color={isActive ? "yellow" : getGrayscale("yellow")} size={50}>
      {getIcon("fontAwesome5", "grin-squint", { color: isActive ? "dodgerblue" : getGrayscale("dodgerblue"), size: 40 })}
    </IconContainer>
  ),
  grinTears: (isActive: boolean) => (
    <IconContainer color={isActive ? "yellow" : getGrayscale("yellow")} size={50}>
      <View style={{position: 'absolute', width: 50}}>
        {getIcon("fontAwesome5", "grin-tears", { color: isActive ? "dodgerblue" : getGrayscale("dodgerblue"), size: 40 })}
      </View>
    </IconContainer>
  ),
  grinTongueSquint: (isActive: boolean) => (
    <IconContainer color={isActive ? "yellow" : getGrayscale("yellow")} size={50}>
      {getIcon("fontAwesome5", "grin-tongue-squint", { color: isActive ? "dodgerblue" : getGrayscale("dodgerblue"), size: 40 })}
    </IconContainer>
  ),
  grinWink: (isActive: boolean) => (
    <IconContainer color={isActive ? "yellow" : getGrayscale("yellow")} size={50}>
      {getIcon("fontAwesome5", "grin-wink", { color: isActive ? "dodgerblue" : getGrayscale("dodgerblue"), size: 40 })}
    </IconContainer>
  ),
  heartBroken: (isActive: boolean) => (
    <IconContainer color={isActive ? "black" : getGrayscale("black")} size={40} border={isActive ? "tomato" : getGrayscale("tomato")}>
      {getIcon("fontAwesome5", "heart-broken", { color: isActive ? "tomato" : getGrayscale("tomato"), size: 25 })}
    </IconContainer>
  ),
  hourglassHalf: (isActive: boolean) => (
    <IconContainer color={isActive ? "orange" : getGrayscale("orange")} size={45} border={isActive ? "red" : getGrayscale("red")} borderWidth={5}>
      {getIcon("fontAwesome5", "hourglass-half", { color: isActive ? "black" : getGrayscale("black"), size: 20 })}
    </IconContainer>
  ),
  question: (isActive: boolean) => (
    <IconContainer color={isActive ? "dodgerblue" : getGrayscale("dodgerblue")} size={45}>
      {getIcon("fontAwesome5", "question", { color: isActive ? "white" : getGrayscale("white"), size: 20 })}
    </IconContainer>
  ),
  redo: (isActive: boolean) => (
    <IconContainer color={isActive ? "dodgerblue" : getGrayscale("dodgerblue")} size={45}>
      {getIcon("fontAwesome5", "redo", { color: isActive ? "white" : getGrayscale("white"), size: 20 })}
    </IconContainer>
  ),
  tired: (isActive: boolean) => (
    <IconContainer color={isActive ? "yellow" : getGrayscale("yellow")} size={50}>
      {getIcon("fontAwesome5", "tired", { color: isActive ? "black" : getGrayscale("black"), size: 40 })}
    </IconContainer>
  ),
}

export type SupportedExpression = keyof typeof expressions;

export default expressions;