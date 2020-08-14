import React, { Component } from 'react'
import { Text, View } from 'react-native'
import GameScene from './GameScene';
import { BlockTypes } from './Block/Types';
import { generateMap, MapOption } from '../api/sortio';

type MultiGameProps = {
  mapOption: MapOption;
}

type MultiGameState = {
  map: null | BlockTypes[][];
}

export class MutiGame extends Component<MultiGameProps, MultiGameState> {
  constructor(props: Readonly<MultiGameProps>) {
    super(props);
    this.state = {
      map: null,
    }
  }

  componentDidMount() {
    if (!this.state.map) {
      generateMap(this.props.mapOption).then((data) => {
        this.setState({map: data.question})
      })
    }
    const socket = new WebSocket('ws://ec2-3-34-99-63.ap-northeast-2.compute.amazonaws.com:3000/match')
    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: 'enter',
        roomId: 1,
        userId: 13,
      }));
    }
    socket.onerror = (e) => {
      console.log('에러남', e);
    }
    socket.onmessage = (e) => {
      console.log(JSON.parse(e.data));
    }
  }

  render() {
    const {state, props} = this;
    if (!state.map) {
      return <></>;
    }
    return (
      <GameScene
        skin="spiky"
        map={state.map}
        title={'하드'}
        timeLimit={60}
        maxScore={props.mapOption.maxScore}
        mode={'multi'}
        onComplete={() => console.log('끝남')}
      />
    );
  }
}

export default MutiGame
