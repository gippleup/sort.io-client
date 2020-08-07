import React, {Component} from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import AnimatedBox from 'react-native-animated-box';

const style = StyleSheet.create({
  box: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export class GameInfoContainer extends Component {
  _boxRef = React.createRef<AnimatedBox>();
  show() {
    if (this._boxRef.current) {
      this._boxRef.current.style.opacity.setValue(0);
      return Animated.timing(this._boxRef.current.style.opacity, {
        toValue: 1,
        useNativeDriver: false,
      });
    }
  }

  hide() {
    if (this._boxRef.current) {
      this._boxRef.current.style.opacity.setValue(1);
      return Animated.timing(this._boxRef.current.style.opacity, {
        toValue: 0,
        useNativeDriver: false,
      });
    }
  }

  render() {
    return (
      <AnimatedBox
        style={style.box}
        children={this.props.children}
        ref={this._boxRef}
      />
    );
  }
}

export default GameInfoContainer;
