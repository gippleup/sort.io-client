import Sound from 'react-native-sound';
Sound.setCategory('Playback');

const loadedSound: Sound[] = [];
let initialVolume = 1;

export const getSound = (filename: string) => {
  const sound = new Sound(filename, Sound.MAIN_BUNDLE, (err) => {
    if (err) {
      throw err;
    } else {
      sound.setVolume(initialVolume);
      loadedSound.push(sound);
    }
  })

  return sound;
}

export const setVolumes = (volume: number) => {
  initialVolume = volume;
  const adjustedToNormal = Math.max(Math.min(volume, 1), 0);
  return new Promise((resolve) => {
    loadedSound.forEach((sound) => {
      sound.setVolume(adjustedToNormal)
    })
    resolve('ok');
  })
}