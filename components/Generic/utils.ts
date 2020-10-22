import React from 'react';
import RNFetchBlob from 'react-native-fetch-blob';

export const getBase64ImageData = (url: string) => {
  let imagePath: null | string = null;
  return new Promise<string>((resolve, reject) => {
    RNFetchBlob.config({
      fileCache: true
    })
      .fetch("GET", url)
      .then((res) => {
        imagePath = res.path();
        return res.readFile("base64");
      })
      .then((base64Data) => {
        resolve(base64Data);
        if (imagePath) {
          // RNFetchBlob.fs.unlink(imagePath);
        }
      })
  })
}

export const convertRemoteImageUrlToLocal = (url: string) => {
  let imagePath: null | string = null;
  return new Promise<string>((resolve, reject) => {
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch("GET", url)
      .then((res) => {
        imagePath = res.path();
        resolve(imagePath);
      })
  })
}

export const lazify = <P>(lazyComponent: Promise<JSX.Element>) => {
  return React.lazy<React.ComponentType<P>>(
    () => new Promise<{default: React.ComponentType<P>}>((resolve, reject) => {
      lazyComponent.then((element) => {
        resolve({
          default: () => element,
        });
      })
    })
  )
}