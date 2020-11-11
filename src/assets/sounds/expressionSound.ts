import Sound from "react-native-sound";
import { getSound } from "../../api/sound";
import { SupportedExpression } from "../../components/Profile/Expressions";

const sounds: {[T in SupportedExpression]?: Sound} & {default: Sound} = {
  default: getSound("message.wav"),
} 

export const getExpressionSoundEffect = (expression?: SupportedExpression): Sound => {
  const definedSound = expression ? sounds[expression] : undefined;
  return definedSound || sounds.default;
}

