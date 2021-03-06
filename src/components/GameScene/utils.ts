import { Dimensions } from "react-native";

const ratio = Dimensions.get('window').width / 360;

export const decideMapScale = (mapLength: number) => {
  let mapScale = 1;
  if (mapLength <= 3) {
    mapScale = 1;
  } else if (mapLength <= 4) {
    mapScale = 0.85;
  } else if (mapLength <= 8) {
    mapScale = 0.75;
  } else if (mapLength <= 10) {
    mapScale = 0.7
  } else if (mapLength <= 12) {
    mapScale = 0.55
  } else if (mapLength <= 21) {
    mapScale = 0.5
  } else if (mapLength <= 24) {
    mapScale = 0.44
  } else if (mapLength <= 27) {
    mapScale = 0.38
  } else if (mapLength <= 36) {
    mapScale = 0.36
  }
  return mapScale * ratio;
}