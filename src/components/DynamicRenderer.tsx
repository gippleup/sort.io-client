import React from 'react'
import { View, Text } from 'react-native'

type DynamicRendererProps<T> = {
  data: T;
  renderer: (data: T) => JSX.Element | JSX.Element[];
}

class DynamicRenderer<T> extends React.Component<
  DynamicRendererProps<T>,
  Omit<DynamicRendererProps<T>, "renderer">>{
  constructor(props: Readonly<DynamicRendererProps<T>>) {
    super(props);
    this.state = {
      data: props.data,
    }
    this.setData = this.setData.bind(this);
  }
  setData(newData: T) {
    this.setState({data: newData});
  }

  render() {
    const {data} = this.state;
    const {renderer} = this.props;
    return renderer(data);
  }
}

export default DynamicRenderer
