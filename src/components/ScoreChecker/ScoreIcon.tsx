import React from 'react';
import {View, Text} from 'react-native';
import BlockBase from '@components/Block/BlockBase';
import {SupportedSkin} from '@components/Block/skinMap';
import {BlockTypes} from '@components/Block/Types';

type ScoreIconProps = {
  skin: SupportedSkin;
  scale: number;
  type: BlockTypes;
};

const ScoreIcon: React.FC<ScoreIconProps> = (props) => {
  const Block = React.lazy(() => import('@components/Block'));
  const TopFallback = (
    <BlockBase
      width={66}
      height={8}
      scale={props.scale}
      color="grey"
    />
  )
  
  const PieceFallback = (
    <BlockBase
      width={66}
      height={24}
      scale={props.scale}
      color="darkgrey"
    />
  )

  const BottomFallback = (
    <BlockBase
      width={66}
      height={34}
      scale={props.scale}
      color="grey"
    />
  )

  return (
    <View>
      <React.Suspense fallback={TopFallback} >
        <Block
          skin={props.skin}
          part="top"
          type={props.type}
          scale={props.scale}
        />
      </React.Suspense>
      <React.Suspense fallback={PieceFallback} >
        <Block
          skin={props.skin}
          part="piece"
          type={props.type}
          scale={props.scale}
        />
      </React.Suspense>
      <React.Suspense fallback={BottomFallback} >
        <Block
          skin={props.skin}
          part="bottom"
          type={props.type}
          scale={props.scale}
        />
      </React.Suspense>
    </View>
  );
};

export default ScoreIcon;
