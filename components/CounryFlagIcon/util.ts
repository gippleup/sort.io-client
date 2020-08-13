import * as RNSvgTransformer from 'react-native-svg-transformer';
export const getCountryIconSvg = (lat: number, lng: number) => {
  const baseurl = 'http://ec2-3-35-52-143.ap-northeast-2.compute.amazonaws.com:3000/country/icon'
  return fetch(`${baseurl}?lat=${lat}&lng=${lng}`)
  .then((res)=> res.text())
}