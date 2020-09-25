import React from 'react'
import { View, Text } from 'react-native'
import Svg, { G, Path } from 'react-native-svg'

type Props = {
  width?: number;
  height?: number;
}

type State = {
  mirror?: boolean;
  flip?: boolean;
  fill?: string;
  stroke?: string;
}

class Chat extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      mirror: false,
      flip: false,
    }
  }

  render() {
    const {props, state} = this;
    const { width, height, fill = "white", stroke = "black" } = props;
    const { mirror, flip } = state;
    return (
      <Svg scaleX={mirror ? -1 : 1} scaleY={flip ? -1 : 1} id="Capa_1" x="0px" y="0px" width={width} height={height} viewBox="0 0 512 512">
        <Path d="m256 489.46c-47.559 0-93.084-14.074-131.6-40.722-2.8015-1.9677-6.1366-2.9683-9.4718-2.9683-2.1011 0-4.2023 0.40021-6.2034 1.2006l-72.906 29.216 29.216-72.906c2.0678-5.2028 1.4008-11.106-1.7676-15.675-26.648-38.521-40.722-84.045-40.722-131.6 0-128.74 104.72-233.46 233.46-233.46s233.46 104.72 233.46 233.46-104.72 233.46-233.46 233.46z" stroke-width="1.0422" fill={fill} />
        <Path d="m256 0c-141.15 0-256 114.85-256 256 0 49.216 13.792 96.48 39.936 137.22l-38.784 96.832c-2.368 5.952-0.992 12.736 3.552 17.28 3.04 3.04 7.136 4.672 11.296 4.672 2.016 0 4-0.384 5.952-1.152l96.832-38.784c40.736 26.144 88 39.936 137.22 39.936 141.15 0 256-114.85 256-256s-114.85-256-256-256zm0 480c-45.632 0-89.312-13.504-126.27-39.072-2.688-1.888-5.888-2.848-9.088-2.848-2.016 0-4.032 0.384-5.952 1.152l-69.952 28.032 28.032-69.952c1.984-4.992 1.344-10.656-1.696-15.04-25.568-36.96-39.072-80.64-39.072-126.27 0-123.52 100.48-224 224-224s224 100.48 224 224-100.48 224-224 224z" fill={stroke} />
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', scaleX: mirror ? -1 : 1, scaleY: flip ? -1 : 1 }}>
          {props.children}
        </View>
      </Svg>
    )    
  }
}

export default Chat
