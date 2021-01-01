import chroma from 'chroma-js'
import React from 'react'
import { View, Text, Animated, Easing } from 'react-native'
import Svg, { G, Path, Circle } from 'react-native-svg'
import useGlobal from '@hooks/useGlobal'
import { ExpressionDirection } from '@redux/actions/global/creator'
import NativeRefBox from './NativeRefBox'
import expressions, { SupportedExpression } from './Profile/Expressions'

type ExpressionEquipWheelProps = {
  size?: number;
  onPress?: (direction: ExpressionDirection) => any;
} & {
  [T in ExpressionDirection]?: SupportedExpression;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

class ExpressionEquipWheel extends React.Component<ExpressionEquipWheelProps, {}> {
  private size = 100;
  private initialWidthConstant = 311.42857142857144;
  private ratio = this.size / this.initialWidthConstant;
  private marginFromBorder = 10;
  private marginRatio = this.marginFromBorder / this.initialWidthConstant;
  private adjustedMargin = this.size * this.marginRatio;
  private iconScale = 1.2 * this.ratio;
  private iconPadding = 3;
  private iconPaddingColor = 'rgba(0,0,0,0.2)';
  
  boxRef = {
    left: React.createRef<NativeRefBox>(),
    right: React.createRef<NativeRefBox>(),
    top: React.createRef<NativeRefBox>(),
    bottom: React.createRef<NativeRefBox>(),
    center: React.createRef<NativeRefBox>(),
  }
  glowAnim = new Animated.Value(0);

  constructor(props: Readonly<ExpressionEquipWheelProps>) {
    super(props);
    this.size = props.size || 100;
    this.ratio = this.size / this.initialWidthConstant;
    this.marginFromBorder = 8;
    this.marginRatio = this.marginFromBorder / this.initialWidthConstant;
    this.adjustedMargin = this.size * this.marginRatio;
    this.iconScale = 1.2 * this.ratio;
    this.renderIcon = this.renderIcon.bind(this);
  }

  indicateDropArea() {
    this.glowAnim.stopAnimation();
    Animated.timing(this.glowAnim, {
      toValue: 1,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }

  deindicateDropArea() {
    this.glowAnim.stopAnimation();
    Animated.timing(this.glowAnim, {
      toValue: 0,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }

  emphasizePiece(direction: ExpressionDirection, onDisappear?: () => any) {
    const normalScale = direction === "center" ? this.iconScale * 1.5 : this.iconScale;
    this.boxRef[direction].current?.animate({
      style: {
        scaleX: 0,
        scaleY: 0,
      },
      duration: 100,
      easing: "easeInOutSine",
    }).start(() => {
      setTimeout(() => {
        if (onDisappear) {
          onDisappear();
        }
      })
      setTimeout(() => {
        this.boxRef[direction].current?.animate({
          style: {
            scaleX: normalScale,
            scaleY: normalScale,
          },
          duration: 1000,
          easing: "easeOutElastic",
        }).start();
      }, 500)
    })
  }

  renderIcon(direction: ExpressionDirection) {
    const {iconScale, iconPadding, iconPaddingColor} = this;
    const {props} = this;
    const iconName = props[direction];
    const scale = direction === "center" ? iconScale * 1.5 : iconScale;
    return (
      <NativeRefBox
        ref={this.boxRef[direction]}
        style={{
          scaleX: scale,
          scaleY: scale,
          padding: iconName ? iconPadding : 0,
          backgroundColor: iconName ? iconPaddingColor : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
        }}
      >
        {iconName ? expressions[iconName](true) : <View style={{width: 50, height: 50, backgroundColor: iconPaddingColor, borderRadius: 100}} />}
      </NativeRefBox>
    )
  }

  render() {
    const {
      size,
      adjustedMargin,
      iconScale,
      iconPadding,
      iconPaddingColor,
      props,
      glowAnim,
      renderIcon,
    } = this;
    const {bottom, center, left, right, top} = props;
    const pieceColor = glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [chroma('rgba(0,0,0,0.3)').hex(), chroma('rgba(255,255,255,0.1)').hex()],
    })

    return (
      <View
        style={{
          padding: 10 * this.ratio,
          backgroundColor: 'goldenrod',
          borderRadius: 300,
          borderWidth: 3 * this.ratio,
          borderColor: chroma('goldenrod').darken().darken().hex(),
        }}
      >
        <View>
          <Svg
            width={size}
            height={size}
            viewBox="0 0 44.158306 44.156643"
          >
            <G
              id="layer1"
              transform="translate(-82.197843,-125.69779)"
            >
              {/* PieceBackgrounds */}
              <Path
              // left
                id="path2822-7"
                fill="rgba(0,0,0,0.3)"
                stroke="rgba(0,0,0,0.3)"
                d="m 316.82617,641.2832 a 113.17082,113.17082 0 0 1 -33.14648,-80.02343 113.17082,113.17082 0 0 1 33.14843,-80.02344 L 203.22461,367.63477 a 273.82849,273.82849 0 0 0 -80.20313,193.625 273.82849,273.82849 0 0 0 80.20313,193.625 z"
                transform="matrix(0.08043414,0,0,0.0804314,72.356661,102.6332)"
              />
              <Path
              // bottom
                id="path3065"
                fill="rgba(0,0,0,0.3)"
                stroke="rgba(0,0,0,0.3)"
                d="M 316.82617,641.2832 203.22461,754.88477 a 273.82849,273.82849 0 0 0 193.625,80.20312 273.82849,273.82849 0 0 0 193.62695,-80.20312 L 476.875,641.2832 a 113.17082,113.17082 0 0 1 -80.02539,33.14844 113.17082,113.17082 0 0 1 -80.02344,-33.14844 z"
                transform="matrix(0.08043414,0,0,0.0804314,72.356661,102.6332)"
              />
              <Path
              // right
                id="path3038"
                fill="rgba(0,0,0,0.3)"
                stroke="rgba(0,0,0,0.3)"
                d="M 590.47656,367.63477 476.87305,481.23633 a 113.17082,113.17082 0 0 1 33.14843,80.02344 113.17082,113.17082 0 0 1 -33.14648,80.02343 l 113.60156,113.60157 a 273.82849,273.82849 0 0 0 80.20313,-193.625 273.82849,273.82849 0 0 0 -80.20313,-193.625 z"
                transform="matrix(0.08043414,0,0,0.0804314,72.356661,102.6332)"
              />
              <Path
              // top
                id="path3062"
                fill="rgba(0,0,0,0.3)"
                stroke="rgba(0,0,0,0.3)"
                d="m 396.69336,287.43164 a 273.82849,273.82849 0 0 0 -193.46875,80.20313 l 113.60351,113.60156 a 113.17082,113.17082 0 0 1 80.02149,-33.14649 113.17082,113.17082 0 0 1 80.02344,33.14649 L 590.47656,367.63477 a 273.82849,273.82849 0 0 0 -193.62695,-80.20313 273.82849,273.82849 0 0 0 -0.15625,0 z"
                transform="matrix(0.08043414,0,0,0.0804314,72.356661,102.6332)"
              />
              <Circle
              // center
                id="path2871"
                fill="rgba(0,0,0,0.3)"
                stroke="rgba(0,0,0,0.3)"
                cx="105"
                cy="148.5"
                transform="matrix(0.24254515,0,0,-0.24253689,78.809742,183.79284)"
                r="37.530327"
              />
              {/* Pieces */}
              <AnimatedPath
              //center
                id="path2871-9"
                fill={pieceColor}
                stroke="rgba(0,0,0,0.3)"
                d="m 104.02734,115.34766 c -9.489339,0.23906 -18.764534,4.79659 -24.724775,12.18925 -6.105488,7.3973 -8.702396,17.52789 -6.921701,26.9514 1.6052,8.94883 7.084644,17.11064 14.774455,21.96551 8.053332,5.20183 18.413871,6.61639 27.564411,3.75135 8.96028,-2.69334 16.60092,-9.3936 20.4448,-17.92332 3.79722,-8.20814 3.99095,-17.9759 0.53439,-26.3323 -3.47079,-8.6047 -10.73697,-15.5665 -19.48469,-18.66022 -3.89395,-1.40276 -8.05025,-2.05966 -12.18689,-1.94167 z"
                transform="matrix(0.24254515,0,0,-0.24253689,78.809742,183.79284)"
              />
              <AnimatedPath
              //right
                id="path3038-2"
                fill={pieceColor}
                stroke="rgba(0,0,0,0.3)"
                d="m 5.8007812,34.966797 c 6.8235508,8.364235 9.8573148,19.689836 8.0703128,30.341797 -1.07451,6.567891 -3.876436,12.851329 -8.0722659,18.019531 9.6510419,9.651042 19.3020829,19.302085 28.9531249,28.953125 0.812011,-0.89856 1.60054,-1.82028 2.283203,-2.64258 3.147296,-3.8062 5.936147,-7.90747 8.324219,-12.230467 0.22447,-0.432949 0.626932,-1.177327 0.9196,-1.729599 C 53.664349,81.5322 56.601765,65.122144 54.587823,49.291929 53.858487,43.459041 52.473488,37.709519 50.474609,32.181641 50.098068,31.128338 49.602631,29.853107 49.133209,28.731454 46.303551,21.921563 42.515111,15.513527 37.919922,9.7460938 37.6565,9.4321855 37.207408,8.8604782 36.926468,8.5278623 36.219402,7.6758784 35.495209,6.8381844 34.751953,6.0175781 25.101562,15.667318 15.451172,25.317057 5.8007812,34.966797 Z"
                transform="matrix(0.26458333,0,0,0.26458333,110.56247,132.19955)"
              />
              <AnimatedPath
              //top
                id="path3062-0"
                fill={pieceColor}
                stroke="rgba(0,0,0,0.3)"
                d="m 56.371094,4.2519531 c -11.36898,0.402093 -22.640763,3.2755467 -32.804688,8.3886719 -0.730242,0.376693 -1.717354,0.881193 -2.533877,1.336243 -5.39767,2.960552 -10.448653,6.55234 -15.0149509,10.681335 9.6503909,9.64974 19.3007809,19.299479 28.9511719,28.949219 8.418836,-6.869232 19.84306,-9.899353 30.555093,-8.029813 6.493104,1.089558 12.693232,3.884651 17.804282,8.035672 C 92.979818,43.96224 102.63151,34.311198 112.2832,24.660156 110.0561,22.637434 107.70393,20.753733 105.25977,19 104.94502,18.778396 104.31764,18.32822 103.9946,18.11435 90.262953,8.6484647 73.48117,3.7103271 56.810544,4.2422717 c -0.146483,0.00323 -0.292967,0.00645 -0.43945,0.00968 z"
                transform="matrix(0.26458333,0,0,0.26458333,88.553306,125.77256)"
              />
              <AnimatedPath
              //left
                id="path2822-7-2"
                fill={pieceColor}
                stroke="rgba(0,0,0,0.3)"
                d="M 24.324219,6.390625 C 23.375708,7.4527557 22.466073,8.5295622 21.534989,9.6931085 16.425211,16.089508 12.316175,23.281459 9.4003906,30.931641 9.2530727,31.328975 8.9732638,32.072374 8.784123,32.608897 5.2195698,42.616465 3.7060436,53.34578 4.3496094,63.949219 c 0.1225947,1.977561 0.3326862,4.15455 0.6229595,6.194262 0.2973087,2.129243 0.6815639,4.230566 1.1617759,6.380571 0.20296,0.912368 0.4729093,1.989496 0.6789875,2.789245 C 10.014147,91.519234 16.190132,102.92621 24.660156,112.2793 34.309896,102.62956 43.959635,92.979818 53.609375,83.330078 46.66893,74.83113 43.659561,63.265609 45.629576,52.465376 46.762995,46.086817 49.530364,40.001643 53.611328,34.96875 43.960937,25.31901 34.310547,15.669271 24.660156,6.0195312 24.548177,6.1432292 24.436198,6.2669271 24.324219,6.390625 Z"
                transform="matrix(0.26458333,0,0,0.26458333,82.145414,132.19955)"
              />
              <AnimatedPath
              //bottom
                id="path3065-3"
                fill={pieceColor}
                stroke="rgba(0,0,0,0.3)"
                d="m 6.0175781,34.75 c 0.9504571,0.854956 1.975994,1.745244 3.0642333,2.631055 12.8107826,10.483905 28.9815836,16.7713 45.5106336,17.685479 3.034959,0.177499 6.166141,0.178996 9.112633,0.0077 3.392812,-0.193484 6.926341,-0.634418 10.167969,-1.253907 3.634412,-0.69254 7.255567,-1.637174 10.694837,-2.804859 C 94.790936,47.567694 104.2809,41.980689 112.28516,34.75 102.63477,25.10026 92.984375,15.450521 83.333984,5.8007812 74.831918,12.73997 63.264392,15.753735 52.46228,13.778726 46.085288,12.647192 40.001228,9.8796931 34.970703,5.7988281 25.319661,15.449219 15.66862,25.099609 6.0175781,34.75 Z"
                transform="matrix(0.26458333,0,0,0.26458333,88.553307,154.18865)"
              />
            </G>
          </Svg>
          <View
            style={{
              position: 'absolute',
              left: adjustedMargin,
              top: size * ((100 - 40) / 100) / 2,
              width: size * (25 / 100),
              height: size * (40 / 100),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            children={renderIcon('left')}
            onTouchStart={props.onPress?.bind(null, 'left')}
          />
          <View
            style={{
              position: 'absolute',
              right: adjustedMargin,
              top: size * ((100 - 40) / 100) / 2,
              width: size * (25 / 100),
              height: size * (40 / 100),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            children={renderIcon('right')}
            onTouchStart={props.onPress?.bind(null, 'right')}
          />
          <View
            style={{
              position: 'absolute',
              right: size * ((100 - 40) / 100) / 2,
              top: adjustedMargin,
              width: size * (40 / 100),
              height: size * (25 / 100),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            children={renderIcon('top')}
            onTouchStart={props.onPress?.bind(null, 'top')}
          />
          <View
            style={{
              position: 'absolute',
              right: size * ((100 - 40) / 100) / 2,
              top: size - size * (25 / 100) - adjustedMargin,
              width: size * (40 / 100),
              height: size * (25 / 100),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            children={renderIcon('bottom')}
            onTouchStart={props.onPress?.bind(null, 'bottom')}
          />
          <View
            style={{
              position: 'absolute',
              top: size * ((100 - 27) / 100) / 2,
              left: size * ((100 - 27) / 100) / 2,
              width: size * (27 / 100),
              height: size * (27 / 100),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            children={renderIcon('center')}
            onTouchStart={props.onPress?.bind(null, 'center')}
          />
        </View>
      </View>
    )
  }
}

export default ExpressionEquipWheel
