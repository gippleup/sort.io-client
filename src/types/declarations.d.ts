declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "react-native-svg-transformer"

declare module "react-native-crypto-js" {
  import CryptoJS from 'crypto-js'
  export default CryptoJS;
}

declare module "react-native-config" {
  interface Env {
    BUILD_ENV: "DEV" | "RELEASE";
    API_BASE_ONLINE: string;
    API_BASE_LOCAL: string;
  }

  const BuildConfig: Env;
  export default BuildConfig;
}