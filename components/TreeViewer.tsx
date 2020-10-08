import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { FlexHorizontal, NotoSans, Space } from './Generic/StyledComponents';
import NativeRefBox from './NativeRefBox';

type TreeViewerProps = {
  data: object;
}

const TreeViewer = (props: TreeViewerProps) => {
  const {data} = props;
  const children = typeof data === "object" && data ? Object.entries(data) : data;
  const hasChild = Array.isArray(children) && children.length;

  const Tree = () => {
    if (hasChild) {
      return (
        <>
          {children.map(([name, data], i) => {
            const treeRef = React.useRef<NativeRefBox>(null);
            const keyRef = React.useRef<NativeRefBox>(null);
            const plusRef = React.useRef<NativeRefBox>(null);

            let opened = true;
            const onPressKey = () => {
              if (opened) {
                opened = false;
                treeRef.current?.animate({
                  style: {
                    height: 0,
                  },
                  duration: 300,
                  easing: "easeInOutSine",
                }).start();
                keyRef.current?.animate({
                  style: {
                    backgroundColor: 'green'
                  },
                  duration: 300,
                  easing: "easeInOutSine",
                }).start();
                plusRef.current?.animate({
                  style: {
                    width: 20,
                    height: 20,
                    scaleX: 1,
                    scaleY: 1,
                  },
                  duration: 1000,
                  easing: "easeOutElastic",
                }).start();
              } else {
                opened = true;
                treeRef.current?.animate({
                  style: {
                    height: treeRef.current.original.height,
                  },
                  duration: 600,
                  easing: "easeInOutSine",
                }).start();
                keyRef.current?.animate({
                  style: {
                    backgroundColor: 'black'
                  },
                  duration: 600,
                  easing: "easeInOutSine",
                }).start();
                plusRef.current?.animate({
                  style: {
                    width: 0,
                    height: 0,
                    scaleX: 0,
                    scaleY: 0,
                  },
                  duration: 300,
                  easing: "easeInOutSine",
                }).start();
              }
            }

            return (
              <FlexHorizontal key={i} style={{alignItems: 'flex-start'}}>
                <FlexHorizontal>
                  <TouchableOpacity onPress={onPressKey}>
                    <NativeRefBox ref={keyRef} style={{backgroundColor: 'black', padding: 5, borderRadius: 5}}>
                      <NotoSans color="white" type="Black" size={12}>
                        {name}
                      </NotoSans>
                    </NativeRefBox>
                  </TouchableOpacity>
                  <Space width={5} />
                  <NativeRefBox
                    style={{
                      width: 0,
                      height: 0,
                      backgroundColor: 'black',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 15,
                    }}
                    ref={plusRef}
                  >
                    <NotoSans color="white" type="Black">
                      +
                    </NotoSans>
                  </NativeRefBox>
                </FlexHorizontal>
                <NativeRefBox ref={treeRef}>
                  <TreeViewer data={data} />
                </NativeRefBox>
              </FlexHorizontal>
            )
          })}
        </>
      )
    } else {
      return (
        <NotoSans type="Medium">
          {JSON.stringify(children)}
        </NotoSans>
      );
    }
  }

  return (
    <ScrollView>
      <Tree />
    </ScrollView>
  )
}

export default TreeViewer
