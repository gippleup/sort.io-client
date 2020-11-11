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
  dock_complete: Sound;
  dock_complete_cancel: Sound;
  self_dock_complete: Sound;
  leftover:Sound;
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
    first: getSound('success_1.mp3'),
    double: getSound('success_2.mp3'),
    triple: getSound('success_3.mp3'),
    additive: getSound('success_additive.mp3'),
  },
  fail: getSound('fail.mp3'),
  win: getSound('win.mp3'),
  lose: getSound('lose.mp3'),
  dock_complete: getSound('dock_complete.wav'),
  dock_complete_cancel: getSound('dock_complete_cancel.wav'),
  self_dock_complete: getSound('self_dock_complete.wav'),
  leftover: getSound('leftover.wav'),
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
    dock_complete: soundMap.dock_complete,
    dock_complete_cancel: soundMap.dock_complete_cancel,
    self_dock_complete: soundMap.self_dock_complete,
    leftover: soundMap.leftover,
  }
}