type SpikeSkinColorTheme = {
  cap: string;
  spike: string;
  bodyFill: string;
  bottomFill: string;
  feet: string;
};

const colorTheme: {[index: number]: SpikeSkinColorTheme} = {
  0: {
    cap: 'red',
    spike: 'lightgrey',
    bodyFill: 'white',
    bottomFill: '#FF8E8E',
    feet: '#BC0000',
  },
  1: {
    feet: '#4FB5FF',
    bodyFill: '#FFB545',
    bottomFill: '#83FF8F',
    cap: '#E3FF3A',
    spike: '#8A8A8A',
  },
  2: {
    feet: '#FF60A3',
    bodyFill: '#FFE7C3',
    bottomFill: '#9F64FF',
    cap: '#3A992B',
    spike: '#8A8A8A',
  },
  3: {
    feet: '#A893FF',
    bodyFill: '#808080',
    bottomFill: 'dodgerblue',
    cap: '#F2BDFF',
    spike: '#E7E7E7',
  },
  4: {
    feet: '#FFF9BD',
    bodyFill: '#A8ABFF',
    bottomFill: '#5B5B5B',
    cap: '#FFFFFF',
    spike: '#FFFFFF',
  },
  9: {
    feet: 'grey',
    bodyFill: 'darkgrey',
    bottomFill: 'grey',
    cap: 'grey',
    spike: 'grey',
  },
};

export default colorTheme;
