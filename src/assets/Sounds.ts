import Sound from "react-native-sound";
import { getSound, setVolumes } from "../api/sound";
import { SupportedSkin } from "../components/Block/skinMap";
import { pickRandomFromArray } from "../components/Block/utils";

const defaultSound = {
  dock: [
    getSound('wood_on_wood_1.mp3'),
    getSound('wood_on_wood_2.mp3'),
    getSound('wood_on_wood_3.mp3'),
    getSound('wood_on_wood_4.mp3'),
    getSound('wood_on_wood_5.mp3'),
    getSound('wood_on_wood_6.mp3'),
    getSound('wood_on_wood_1.mp3'),
    getSound('wood_on_wood_2.mp3'),
    getSound('wood_on_wood_3.mp3'),
    getSound('wood_on_wood_4.mp3'),
    getSound('wood_on_wood_5.mp3'),
    getSound('wood_on_wood_6.mp3'),
  ]
}

const soundMap: {
  [T in SupportedSkin]: {
    dock: Sound[];
  }
} & {
  success: {
    first: Sound;
    double: Sound;
    triple: Sound;
    additive: Sound;
  };
  fail: Sound;
  win: Sound;
  lose: Sound;
} = {
  basic: defaultSound,
  // spiky: defaultSound,
  // maguni: defaultSound,
  // babyblock: defaultSound,
  // bird: defaultSound,
  // plain: defaultSound,
  holder: defaultSound,
  batcap: defaultSound,
  pinblock: defaultSound,
  eggpan: defaultSound,
  elegantline: defaultSound,
  elegantbat: defaultSound,
  mountain: defaultSound,
  upward: defaultSound,
  baby: defaultSound,
  bearing: defaultSound,
  bow: defaultSound,
  castle: defaultSound,
  chubby: defaultSound,
  fat: defaultSound,
  horizon: defaultSound,
  invader: defaultSound,
  kiddo: defaultSound,
  lazyboy: defaultSound,
  overweight: defaultSound,
  pot: defaultSound,
  roundbasic: defaultSound,
  roundupward: defaultSound,
  sleepyworm: defaultSound,
  volcano: defaultSound,
  wave: defaultSound,
  success: {
    first: getSound('success_1.wav'),
    double: getSound('success_2.wav'),
    triple: getSound('success_3.wav'),
    additive: getSound('success_additive.wav'),
  },
  fail: getSound('fail.wav'),
  win: getSound('win.wav'),
  lose: getSound('lose.wav'),
}

export function getSoundEffect(skinName: SupportedSkin = "basic") {
  const availableDockSound = soundMap[skinName].dock
    .filter((sound) => !sound.isPlaying())
  return {
    dock: pickRandomFromArray<Sound>(availableDockSound),
    success: {
      1: soundMap.success.first,
      2: soundMap.success.double,
      3: soundMap.success.triple,
      4: soundMap.success.additive,
    },
    fail: soundMap.fail,
    win: soundMap.win,
    lose: soundMap.lose,
  }
}