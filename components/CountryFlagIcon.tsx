import React from 'react'
import { View, Text, Image } from 'react-native'
import { getCountryIconSvg } from './CounryFlagIcon/util'
import { SvgCss } from 'react-native-svg'

type CountryFlagIconProps = {
  lat: number;
  lng: number;
  width?: number;
  height?: number;
}

const CountryFlagIcon = (props: CountryFlagIconProps) => {
  const [iconSvg, setIconSvg] = React.useState('');
  if (!iconSvg) {
    getCountryIconSvg(props.lat, props.lng)
    .then((svg) => setIconSvg(svg))
    return <></>
  }

  const {width, height} = props;

  return (
    <SvgCss width={width || 32} height={height || 32} xml={iconSvg}/>
  )
}

export default CountryFlagIcon
