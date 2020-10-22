import { ViewStyle, TextStyle } from "react-native"

export const titleStyle = {
  win: {
    fillColor: "dodgerblue",
    strokeColor: 'white',
    text: "WIN",
  },
  lose: {
    fillColor: "red",
    strokeColor: 'black',
    text: "LOSE",
  },
  draw: {
    fillColor: "lightgrey",
    strokeColor: "grey",
    text: "DRAW",
  }
}

export const boardStyle: { [index: string]: ViewStyle } = {
  win: {
    backgroundColor: 'royalblue',
    borderWidth: 3,
    borderColor: 'white',
  },
  lose: {
    backgroundColor: 'tomato',
    borderWidth: 3,
    borderColor: 'black',
  },
  draw: {
    backgroundColor: 'slategrey',
    borderWidth: 3,
    borderColor: 'lightgrey',
  }
}

export const textColor = {
  win: "white",
  lose: "black",
  draw: "white",
}

export const rankViewerHighlightStyle: {
  [index in 'win' | 'lose' | 'draw']: {
    containerStyle: ViewStyle,
    textStyle: TextStyle
  }
} = {
  win: {
    containerStyle: {
      backgroundColor: 'white',
    },
    textStyle: {
      color: 'black',
      fontWeight: 'bold',
    }
  },
  lose: {
    containerStyle: {
      backgroundColor: 'black',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
    }
  },
  draw: {
    containerStyle: {
      backgroundColor: 'white',
    },
    textStyle: {
      color: 'black',
      fontWeight: 'bold',
    }
  }
}