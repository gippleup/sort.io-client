import { ViewStyle, TextStyle, Dimensions } from "react-native"

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

const boardMaxWidth = 320;

export const boardStyle: { [index: string]: ViewStyle } = {
  win: {
    backgroundColor: 'royalblue',
    borderColor: 'white',
    borderWidth: 3,
    width: "100%",
    maxWidth: boardMaxWidth,
  },
  lose: {
    backgroundColor: 'tomato',
    borderColor: 'black',
    borderWidth: 3,
    width: "100%",
    maxWidth: boardMaxWidth,
  },
  draw: {
    backgroundColor: 'slategrey',
    borderColor: 'lightgrey',
    borderWidth: 3,
    width: "100%",
    maxWidth: boardMaxWidth,
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