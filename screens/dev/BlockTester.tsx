import React from 'react'
import { View, Text, findNodeHandle } from 'react-native';
import BottomBase from '../../components/Block/BottomBase';
import TopBase from '../../components/Block/TopBase';
import PieceBase from '../../components/Block/PieceBase';
import styled from 'styled-components';

const BlockContainer: typeof View = styled(View)`
  background-color: ivory;
  border-width: 1px;
  padding: 20px;
`;

type BasePos = null | {
  top: number;
  left: number;
};

const BlockTester = () => {
  const blockContainerRef = React.createRef<View>();
  const topBaseRef = React.createRef<View>();
  const pieceBaseRef1 = React.createRef<View>();
  const pieceBaseRef2 = React.createRef<View>();
  const pieceBaseRef3 = React.createRef<View>();
  const pieceBaseRef4 = React.createRef<View>();
  const pieceBaseRef5 = React.createRef<View>();
  const bottomBaseRef = React.createRef<View>();

  const [bottomBasePos, setBottomBasePos] = React.useState<BasePos>(null);
  const [pieceBasePos1, setPieceBasePos1] = React.useState<BasePos>(null);
  const [pieceBasePos2, setPieceBasePos2] = React.useState<BasePos>(null);
  const [pieceBasePos3, setPieceBasePos3] = React.useState<BasePos>(null);
  const [pieceBasePos4, setPieceBasePos4] = React.useState<BasePos>(null);
  const [pieceBasePos5, setPieceBasePos5] = React.useState<BasePos>(null);
  const [topBasePos, setTopBasePos] = React.useState<BasePos>(null);

  React.useEffect(() => {
    if (!bottomBasePos) {
      const blockBoardId = findNodeHandle(blockContainerRef.current);
      if (!blockBoardId) {
        return;
      }
      bottomBaseRef.current?.measureLayout(
        blockBoardId,
        (left, top, width, height) => {
          setBottomBasePos({top, left});
        },
        () => {},
      );
    }

    if (!topBasePos) {
      const blockBoardId = findNodeHandle(blockContainerRef.current);
      if (!blockBoardId) {
        return;
      }
      topBaseRef.current?.measureLayout(
        blockBoardId,
        (left, top, width, height) => {
          setTopBasePos({top, left});
        },
        () => {},
      );
    }
  });

  return (
    <BlockContainer ref={blockContainerRef}>
      <View>
        <View ref={topBaseRef}>
          <TopBase />
        </View>
        <View ref={pieceBaseRef1}>
          <PieceBase />
        </View>
        <View ref={pieceBaseRef2}>
          <PieceBase />
        </View>
        <View ref={pieceBaseRef3}>
          <PieceBase />
        </View>
        <View ref={pieceBaseRef4}>
          <PieceBase />
        </View>
        <View ref={pieceBaseRef5}>
          <PieceBase />
        </View>
        <View ref={bottomBaseRef}>
          <BottomBase />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: bottomBasePos?.top,
          left: bottomBasePos?.left,
          marginLeft: -1,
          marginTop: -1,
        }}>
        <BottomBase fill="red" />
      </View>
      <View
        style={{
          position: 'absolute',
          top: topBasePos?.top,
          left: topBasePos?.left,
          marginLeft: -1,
          marginTop: -1,
        }}>
        <TopBase fill="red" />
      </View>

    </BlockContainer>
  );
};

export default BlockTester;