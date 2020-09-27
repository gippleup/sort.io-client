import Sound from "react-native-sound";
import { getSound, setVolumes } from "../../api/sound";
import { skins } from "./skinMap";
import { pickRandomFromArray } from "./utils";

const soundMap = {
  basic: {
    dock: {
      1: getSound('wood_on_wood_1.mp3'),
      2: getSound('wood_on_wood_2.mp3'),
      3: getSound('wood_on_wood_3.mp3'),
      4: getSound('wood_on_wood_4.mp3'),
      5: getSound('wood_on_wood_5.mp3'),
      6: getSound('wood_on_wood_6.mp3'),
    }
  },
  spiky: {
    dock: {
      1: getSound('wood_on_wood_1.mp3'),
      2: getSound('wood_on_wood_2.mp3'),
      3: getSound('wood_on_wood_3.mp3'),
      4: getSound('wood_on_wood_4.mp3'),
      5: getSound('wood_on_wood_5.mp3'),
      6: getSound('wood_on_wood_6.mp3'),
    }
  },
  success: {
    first: getSound('success_1.wav'),
    double: getSound('success_2.wav'),
    triple: getSound('success_3.wav'),
    additive: getSound('success_additive.wav'),
  },
  fail: getSound('fail.wav'),
}

export function getSoundEffect(skinName: skins = "basic") {
  return {
    dock: pickRandomFromArray<Sound>(Object.values(soundMap[skinName].dock)),
    success: {
      1: soundMap.success.first,
      2: soundMap.success.double,
      3: soundMap.success.triple,
      4: soundMap.success.additive,
    },
    fail: soundMap.fail,
  }
}