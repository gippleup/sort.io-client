import { GeolocationResponse } from "@react-native-community/geolocation";
import { getPlayerLocation } from "../api/geolocation"
import React from 'react';

let location: undefined | GeolocationResponse = undefined;

export const useLocation = () => {
  React.useEffect(() => {
    if (!location) {
      getPlayerLocation()
      .then((info) => {
        location = info;
      });
    }
  })

  return location;
}