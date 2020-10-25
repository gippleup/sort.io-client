type PartDefinition = {
  path: string;
  width: number;
  height: number;
  marginTop?: number;
  marginLeft?: number;
  marginBottom?: number;
  marginRight?: number;
  innerMarginTop?: number;
  innerMarginLeft?: number;
  innerMarginRight?: number;
  innerMarginBottom?: number;
}

type SimpleBlockDefinition = {
  top: PartDefinition;
  piece: PartDefinition;
  bottom: PartDefinition;
}

type BlockSkeleton = {
  [index: string]: SimpleBlockDefinition;
};

export const blockSkeleton: BlockSkeleton = {
  baby: {
    bottom: {
      path: "M19.6643 1.41519C10.7942 -0.555275 1 5.69079 1 14.7771V14.7771C1 21.5276 6.47238 27 13.2229 27H52.7771C59.5276 27 65 21.5276 65 14.7771V14.7771C65 5.6908 55.2058 -0.555276 46.3357 1.41519C42.1389 2.3475 37.5695 3 33 3C28.4305 3 23.8611 2.3475 19.6643 1.41519Z",
      width: 66,
      height: 28,
    },
    piece: {
      path: "M1 13.3666C1 5.38775 9.5852 -0.104225 17.3192 1.85708C22.1278 3.07652 27.5639 4 33 4C38.4361 4 43.8722 3.07652 48.6808 1.85709C56.4148 -0.104224 65 5.38775 65 13.3666V13.3666C65 17.432 62.7035 21.1519 58.906 22.6033C52.7959 24.9385 42.8979 28 33 28C23.1021 28 13.2041 24.9385 7.09405 22.6033C3.29654 21.1519 1 17.432 1 13.3666V13.3666Z",
      width: 66,
      height: 29,
      marginTop: 5,
    },
    top: {
      path: "M5.94427 1C3.21363 1 1 3.21363 1 5.94427V5.94427C1 7.81702 2.05877 9.52599 3.78039 10.263C9.0462 12.5173 21.0231 17 33 17C44.9769 17 56.9538 12.5173 62.2196 10.263C63.9412 9.52599 65 7.81702 65 5.94427V5.94427C65 3.21363 62.7864 1 60.0557 1H5.94427Z",
      width: 66,
      height: 18,
    },
  },
  basic: {
    bottom: {
      path: "M1 1V33H65V1H49V9H17V1H1Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 1H17V9H49V1H65V25H49V33H17V25H1V1Z",
      width: 66,
      height: 34,
    },
    top: {
      path: "M1 1V9H17V17H49V9H65V1H1Z",
      width: 66,
      height: 34,
    },
  },
  batcap: {
    bottom: {
      path: "M17 1L1 33H65L49 1V9H17V1Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 33L17 1V9H49V1L65 33V57L49 25V33H17V25L1 57V33Z",
      width: 66,
      height: 58,
    },
    top: {
      path: "M1 1V41L17 9V17H49V9L65 41V1H1Z",
      width: 66,
      height: 42,
    },
  },
  bearing: {
    bottom: {
      path: "M13.9443 1C6.79535 1 1 6.79535 1 13.9443V17C1 25.8366 8.16344 33 17 33H49C57.8366 33 65 25.8366 65 17V13.9443C65 6.79535 59.2047 1 52.0557 1V1C50.0462 1 48.0643 1.46787 46.2669 2.36656L41.9443 4.52786C36.3137 7.34314 29.6863 7.34314 24.0557 4.52787L19.7331 2.36656C17.9357 1.46787 15.9538 1 13.9443 1V1Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 13C1 6.37258 6.37258 1 13 1H13.9443C15.9538 1 17.9357 1.46787 19.7331 2.36656L24.0557 4.52786C29.6863 7.34314 36.3137 7.34314 41.9443 4.52787L46.2669 2.36656C48.0643 1.46787 50.0462 1 52.0557 1H53C59.6274 1 65 6.37258 65 13V13C65 19.6274 59.6274 25 53 25H52.0557C50.0462 25 48.0643 25.4679 46.2669 26.3666L41.9443 28.5279C36.3137 31.3431 29.6863 31.3431 24.0557 28.5279L19.7331 26.3666C17.9357 25.4679 15.9538 25 13.9443 25H13C6.37258 25 1 19.6274 1 13V13Z",
      width: 66,
      height: 32,
    },
    top: {
      path: "M5 1C2.79086 1 1 2.79086 1 5V5C1 7.20914 2.79086 9 5 9H13.9443C15.9538 9 17.9357 9.46787 19.7331 10.3666L24.0557 12.5279C29.6863 15.3431 36.3137 15.3431 41.9443 12.5279L46.2669 10.3666C48.0643 9.46787 50.0462 9 52.0557 9H61C63.2091 9 65 7.20914 65 5V5C65 2.79086 63.2091 1 61 1H5Z",
      width: 66,
      height: 16,
    },
  },
  bow: {
    bottom: {
      path: "M1 9V33H65V9C65 9 49 1 33 1C17 1 1 9 1 9Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 9C1 9 17 1 33 1C49 1 65 9 65 9V33C65 33 49 25 33 25C17 25 1 33 1 33L1 9Z",
      width: 66,
      height: 34,
    },
    top: {
      path: "M1 1V17C1 17 17 9 33 9C49 9 65 17 65 17V1H1Z",
      width: 66,
      height: 18,
    },
  },
  castle: {
    bottom: {
      path: "M1 9V33H65V9H49C49 9 49 1 33 1C17 1 17 9 17 9H1Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 13.3666C1 5.38775 9.5852 -0.104225 17.3192 1.85708C22.1278 3.07652 27.5639 4 33 4C38.4361 4 43.8722 3.07652 48.6808 1.85709C56.4148 -0.104224 65 5.38775 65 13.3666V13.3666C65 17.432 62.7035 21.1519 58.906 22.6033C52.7959 24.9385 42.8979 28 33 28C23.1021 28 13.2041 24.9385 7.09405 22.6033C3.29654 21.1519 1 17.432 1 13.3666V13.3666Z",
      width: 66,
      height: 34,
    },
    top: {
      path: "M1 1V17H17C17 17 17 9 33 9C49 9 49 17 49 17H65V1H1Z",
      width: 66,
      height: 18,
    },
  },
  chubby: {
    bottom: {
      path: "M13 7C6.37258 7 1 12.3726 1 19V19C1 25.6274 6.37258 31 13 31H53C59.6274 31 65 25.6274 65 19V19C65 12.3726 59.6274 7 53 7H52.0557C50.0462 7 48.0643 6.53213 46.2669 5.63344L41.9443 3.47214C36.3137 0.656861 29.6863 0.65686 24.0557 3.47213L19.7331 5.63344C17.9357 6.53213 15.9538 7 13.9443 7H13Z",
      width: 66,
      height: 32,
    },
    piece: {
      path: "M1 19C1 12.3726 6.37258 7 13 7H13.9443C15.9538 7 17.9357 6.53213 19.7331 5.63344L24.0557 3.47214C29.6863 0.656861 36.3137 0.65686 41.9443 3.47213L46.2669 5.63344C48.0643 6.53213 50.0462 7 52.0557 7H53C59.6274 7 65 12.3726 65 19V19C65 25.6274 59.6274 31 53 31H52.0557C50.0462 31 48.0643 30.5321 46.2669 29.6334L41.9443 27.4721C36.3137 24.6569 29.6863 24.6569 24.0557 27.4721L19.7331 29.6334C17.9357 30.5321 15.9538 31 13.9443 31H13C6.37258 31 1 25.6274 1 19V19Z",
      width: 66,
      height: 32,
    },
    top: {
      path: "M9 1C4.58172 1 1 4.58172 1 9V9C1 13.4183 4.58172 17 9 17H13.9443C15.9538 17 17.9357 16.5321 19.7331 15.6334L24.0557 13.4721C29.6863 10.6569 36.3137 10.6569 41.9443 13.4721L46.2669 15.6334C48.0643 16.5321 50.0462 17 52.0557 17H57C61.4183 17 65 13.4183 65 9V9C65 4.58172 61.4183 1 57 1H9Z",
      width: 66,
      height: 18,
    },
  },
  eggpan: {
    bottom: {
      path: "M1 1V33H65V1H49C49 1 49 9 33 9C17 9 17 1 17 1H1Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 1H17C17 1 17 9 33 9C49 9 49 1 49 1H65V25H49C49 25 49 33 33 33C17 33 17 25 17 25H1V1Z",
      width: 66,
      height: 34,
    },
    top: {
      path: "M1 1V9H17C17 9 17 17 33 17C49 17 49 9 49 9H65V1H1Z",
      width: 66,
      height: 18,
    },
  },
  elegantbat: {
    bottom: {
      path: "M1 33H65L49 1C49 1 49 9 33 9C17 9 17 1 17 1L1 33Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 33L17 1C17 1 17 9 33 9C49 9 49 1 49 1L65 33V57L49 25C49 25 49 33 33 33C17 33 17 25 17 25L1 57V33Z",
      width: 66,
      height: 58,
    },
    top: {
      path: "M1 1V41L17 9C17 9 17 17 33 17C49 17 49 9 49 9L65 41V1H1Z",
      width: 66,
      height: 42,
    },
  },
  elegantline: {
    bottom: {
      path: "M1 1V33H65V1C65 1 49 9 33 9C17 9 1 1 1 1Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 1C1 1 17 9 33 9C49 9 65 1 65 1V25C65 25 49 33 33 33C17 33 1 25 1 25L1 1Z",
      width: 66,
      height: 34,
    },
    top: {
      path: "M1 1V9C1 9 17 17 33 17C49 17 65 9 65 9V1H1Z",
      width: 66,
      height: 18,
    },
  },
  fat: {
    bottom: {
      path: "M9 9C4.58172 9 1 12.5817 1 17V21C1 27.6274 6.37258 33 13 33H53C59.6274 33 65 27.6274 65 21V17C65 12.5817 61.4183 9 57 9V9C52.5817 9 48.1639 5.00317 44.2028 3.046C41.8325 1.87488 38.2911 1 33 1C27.7089 1 24.1675 1.87488 21.7972 3.046C17.8361 5.00317 13.4183 9 9 9V9Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 17C1 12.5817 4.58172 9 9 9V9C13.4183 9 17.8361 5.00317 21.7972 3.04601C24.1675 1.87488 27.7089 1 33 1C38.2911 1 41.8325 1.87488 44.2028 3.046C48.1639 5.00317 52.5817 9 57 9V9C61.4183 9 65 12.5817 65 17V25C65 29.4183 61.4183 33 57 33V33C52.5817 33 48.1639 29.0032 44.2028 27.046C41.8325 25.8749 38.2911 25 33 25C27.7089 25 24.1675 25.8749 21.7972 27.046C17.8361 29.0032 13.4183 33 9 33V33C4.58172 33 1 29.4183 1 25V17Z",
      width: 66,
      height: 34,
    },
    top: {
      path: "M9 1C4.58172 1 1 4.58172 1 9V9C1 13.4183 4.58172 17 9 17V17C13.4183 17 17.8361 13.0032 21.7972 11.046C24.1675 9.87488 27.7089 9 33 9C38.2911 9 41.8325 9.87488 44.2028 11.046C48.1639 13.0032 52.5817 17 57 17V17C61.4183 17 65 13.4183 65 9V9C65 4.58172 61.4183 1 57 1H9Z",
      width: 66,
      height: 18,
    },
  },
  holder: {
    bottom: {
      path: "M1 1V33H65V1L49 9H17L1 1Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 1L17 9H49L65 1V25L49 33H17L1 25V1Z",
      width: 66,
      height: 34,
    },
    top: {
      path: "M1 1V9L17 17H49L65 9V1H1Z",
      width: 66,
      height: 34,
    },
  },
  horizon: {
    bottom: {
      path: "M1 9V33H65V9L49 1H17L1 9Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 9L17 1H49L65 9V33L49 25H17L1 33V9Z",
      width: 66,
      height: 34,
    },
    top: {
      path: "M1 1V17L17 9H49L65 17V1H1Z",
      width: 66,
      height: 18,
    },
  },
  invader: {
    bottom: {
      path: "M13 2.47214C13 0.859897 10.8266 0.346822 10.1056 1.78885L1.42229 19.1554C-0.609465 23.2189 2.3454 28 6.88855 28H51.1115C55.6546 28 58.6095 23.2189 56.5777 19.1554L47.8944 1.78885C47.1734 0.346824 45 0.859896 45 2.47214V2.47214C45 3.31595 44.316 4 43.4721 4H14.5279C13.684 4 13 3.31595 13 2.47214V2.47214Z",
      width: 66,
      height: 29,
      marginLeft: 4,
      marginTop: 6,
    },
    piece: {
      path: "M1 29.2669C1 28.4337 1.19397 27.6121 1.56656 26.8669L14.1056 1.78885C14.8266 0.346824 17 0.859896 17 2.47214V2.47214C17 3.31595 17.684 4 18.5279 4H47.4721C48.316 4 49 3.31595 49 2.47214V2.47214C49 0.859897 51.1734 0.346822 51.8944 1.78885L64.4334 26.8669C64.806 27.6121 65 28.4337 65 29.2669V34.1115C65 38.5676 58.9928 39.9857 57 36L51.8944 25.7889C51.1734 24.3468 49 24.8599 49 26.4721V26.4721C49 27.316 48.316 28 47.4721 28H18.5279C17.684 28 17 27.316 17 26.4721V26.4721C17 24.8599 14.8266 24.3468 14.1056 25.7889L9 36C7.00716 39.9857 1 38.5676 1 34.1115V29.2669Z",
      width: 66,
      height: 39,
      marginTop: 6,
    },
    top: {
      path: "M8.63932 1C4.42024 1 1 4.42024 1 8.63932V23.1115C1 27.5676 7.00716 28.9857 9 25L14.1056 14.7889C14.8266 13.3468 17 13.8599 17 15.4721V15.4721C17 16.316 17.684 17 18.5279 17H47.4721C48.316 17 49 16.316 49 15.4721V15.4721C49 13.8599 51.1734 13.3468 51.8944 14.7889L57 25C58.9928 28.9857 65 27.5676 65 23.1115V8.63932C65 4.42024 61.5798 1 57.3607 1H8.63932Z",
      width: 66,
      height: 28,
      marginTop: 2,
    },
  },
  kiddo: {
    bottom: {
      path: "M14.9628 1.98142C8.54782 -1.22609 1 3.43872 1 10.6109V14.7771C1 21.5276 6.47238 27 13.2229 27H52.7771C59.5276 27 65 21.5276 65 14.7771V10.6109C65 3.43872 57.4522 -1.22609 51.0372 1.98142V1.98142C49.6975 2.65127 48.2202 3 46.7224 3H19.2776C17.7798 3 16.3025 2.65127 14.9628 1.98142V1.98142Z",
      width: 66,
      height: 28,
      marginTop: 6,
    },
    piece: {
      path: "M1 10.6109C1 3.43872 8.54782 -1.22609 14.9628 1.98142V1.98142C16.3025 2.65127 17.7798 3 19.2776 3H46.7224C48.2202 3 49.6975 2.65127 51.0372 1.98142V1.98142C57.4522 -1.22609 65 3.43872 65 10.6109V12.3666C65 16.432 62.7031 20.1485 59.0669 21.9666L53.2229 24.8885C50.4458 26.2771 47.3835 27 44.2786 27H21.7214C18.6165 27 15.5542 26.2771 12.7771 24.8885L6.93313 21.9666C3.29691 20.1485 1 16.432 1 12.3666V10.6109Z",
      width: 66,
      height: 28,
      marginTop: 6,
    },
    top: {
      path: "M5.94427 1C3.21363 1 1 3.21363 1 5.94427V5.94427C1 7.81702 2.05877 9.52599 3.78039 10.263C9.0462 12.5173 21.0231 17 33 17C44.9769 17 56.9538 12.5173 62.2196 10.263C63.9412 9.52599 65 7.81702 65 5.94427V5.94427C65 3.21363 62.7864 1 60.0557 1H5.94427Z",
      width: 66,
      height: 18,
    },
  },
  lazyboy: {
    bottom: {
      path: "M1.89443 19.2111C0.564625 21.8707 2.49861 25 5.47214 25H56.5279C59.5014 25 61.4354 21.8708 60.1056 19.2111L54.5777 8.15542C52.6901 4.38013 37.7519 0.677916 33.5384 0.927659C32.7405 0.974952 31.8953 1 31 1C30.1047 1 29.2595 0.974952 28.4616 0.927659C24.2481 0.677916 9.30994 4.38013 7.42229 8.15541L1.89443 19.2111Z",
      width: 66,
      height: 26,
      marginLeft: 2,
      marginTop: 8,
    },
    piece: {
      path: "M1 25.9443C1 25.3233 1.14458 24.7108 1.42229 24.1554L9.42229 8.15542C11.3099 4.38013 26.2481 0.677916 30.4616 0.927659C31.2595 0.974952 32.1047 1 33 1C33.8953 1 34.7405 0.974952 35.5384 0.927659C39.7519 0.677916 54.6901 4.38013 56.5777 8.15541L64.5777 24.1554C64.8554 24.7108 65 25.3233 65 25.9443V32.0557C65 36.2766 59.3099 37.6199 57.4223 33.8446L56.5777 32.1554C54.6901 28.3801 39.7519 24.6779 35.5384 24.9277C34.7405 24.975 33.8953 25 33 25C32.1047 25 31.2595 24.975 30.4616 24.9277C26.2481 24.6779 11.3099 28.3801 9.42229 32.1554L8.57771 33.8446C6.69006 37.6199 1 36.2766 1 32.0557V25.9443Z",
      width: 66,
      height: 37,
      marginTop: 8,
    },
    top: {
      path: "M5 1C2.79086 1 1 2.79086 1 5V24.0557C1 28.2766 6.69006 29.6199 8.57771 25.8446L9.42229 24.1554C11.3099 20.3801 26.2481 16.6779 30.4616 16.9277C31.2595 16.975 32.1047 17 33 17C33.8953 17 34.7405 16.975 35.5384 16.9277C39.7519 16.6779 54.6901 20.3801 56.5777 24.1554L57.4223 25.8446C59.3099 29.6199 65 28.2766 65 24.0557V5C65 2.79086 63.2091 1 61 1H5Z",
      width: 66,
      height: 29,
      marginTop: 2,
    },
  },
  mountain: {
    bottom: {
      path: "M1 9V33H65V9H49L33 1L17 9H1Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 9H17L33 1L49 9H65V33H49L33 25L17 33H1V9Z",
      width: 66,
      height: 34,
    },
    top: {
      path: "M1 1V17H17L33 9L49 17H65V1H1Z",
      width: 66,
      height: 18,
    },
  },
  overweight: {
    bottom: {
      path: "M9.19938 4.90031C4.17426 7.41287 1 12.5489 1 18.1672V18.1672C1 26.3591 7.64088 33 15.8328 33H50.1672C58.3591 33 65 26.3591 65 18.1672V18.1672C65 12.5489 61.8257 7.41287 56.8006 4.90031L53.2229 3.11146C50.4458 1.7229 47.3835 1 44.2786 1H21.7214C18.6165 1 15.5542 1.7229 12.7771 3.11146L9.19938 4.90031Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 15.6334C1 11.568 3.29691 7.85154 6.93312 6.03344L12.7771 3.11146C15.5542 1.7229 18.6165 1 21.7214 1H44.2786C47.3835 1 50.4458 1.7229 53.2229 3.11146L59.0669 6.03344C62.7031 7.85154 65 11.568 65 15.6334V17.3891C65 24.5613 57.4522 29.2261 51.0372 26.0186V26.0186C49.6975 25.3487 48.2202 25 46.7224 25H19.2776C17.7798 25 16.3025 25.3487 14.9628 26.0186V26.0186C8.54782 29.2261 1 24.5613 1 17.3891V15.6334Z",
      width: 66,
      height: 28,
    },
    top: {
      path: "M7.11146 1C3.73619 1 1 3.73619 1 7.11146V7.11146C1 11.6546 5.78107 14.6095 9.84458 12.5777L14.9628 10.0186C16.3025 9.34873 17.7798 9 19.2776 9H46.7224C48.2202 9 49.6975 9.34873 51.0372 10.0186L56.1554 12.5777C60.2189 14.6095 65 11.6546 65 7.11146V7.11146C65 3.73619 62.2638 1 58.8885 1H7.11146Z",
      width: 66,
      height: 14,
    },
  },
  pinblock: {
    bottom: {
      path: "M1 1V33H65V1H49L33 9L17 1H1Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 1H17L33 9L49 1H65V25H49L33 33L17 25H1V1Z",
      width: 66,
      height: 34,
    },
    top: {
      path: "M1 1V9H17L33 17L49 9H65V1H1Z",
      width: 66,
      height: 18,
    },
  },
  pot: {
    bottom: {
      path: "M1 33H65L49 9V1H17V9L1 33Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 33L17 9V1H49V9L65 33V57L49 33V25H17V33L1 57V33Z",
      width: 66,
      height: 59,
    },
    top: {
      path: "M1 1V41L17 17V9H49V17L65 41V1H1Z",
      width: 66,
      height: 43,
    },
  },
  roundbasic: {
    bottom: {
      path: "M9 1C4.58172 1 1 4.58172 1 9V17C1 25.8366 8.16344 33 17 33H49C57.8366 33 65 25.8366 65 17V9C65 4.58172 61.4183 1 57 1H53C50.7909 1 49 2.79086 49 5V5C49 7.20914 47.2091 9 45 9H21C18.7909 9 17 7.20914 17 5V5C17 2.79086 15.2091 1 13 1H9Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 9C1 4.58172 4.58172 1 9 1H13C15.2091 1 17 2.79086 17 5V5C17 7.20914 18.7909 9 21 9H45C47.2091 9 49 7.20914 49 5V5C49 2.79086 50.7909 1 53 1H57C61.4183 1 65 4.58172 65 9V17C65 21.4183 61.4183 25 57 25H53C50.7909 25 49 26.7909 49 29V29C49 31.2091 47.2091 33 45 33H21C18.7909 33 17 31.2091 17 29V29C17 26.7909 15.2091 25 13 25H9C4.58172 25 1 21.4183 1 17V9Z",
      width: 66,
      height: 34,
    },
    top: {
      path: "M5 1C2.79086 1 1 2.79086 1 5V5C1 7.20914 2.79086 9 5 9H13C15.2091 9 17 10.7909 17 13V13C17 15.2091 18.7909 17 21 17H45C47.2091 17 49 15.2091 49 13V13C49 10.7909 50.7909 9 53 9H61C63.2091 9 65 7.20914 65 5V5C65 2.79086 63.2091 1 61 1H5Z",
      width: 66,
      height: 18,
    },
  },
  roundupward: {
    bottom: {
      path: "M9 9C4.58172 9 1 12.5817 1 17V21C1 27.6274 6.37258 33 13 33H53C59.6274 33 65 27.6274 65 21V17C65 12.5817 61.4183 9 57 9H53C50.7909 9 49 7.20914 49 5V5C49 2.79086 47.2091 1 45 1H21C18.7909 1 17 2.79086 17 5V5C17 7.20914 15.2091 9 13 9H9Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 17C1 12.5817 4.58172 9 9 9H13C15.2091 9 17 7.20914 17 5V5C17 2.79086 18.7909 1 21 1H45C47.2091 1 49 2.79086 49 5V5C49 7.20914 50.7909 9 53 9H57C61.4183 9 65 12.5817 65 17V25C65 29.4183 61.4183 33 57 33H53C50.7909 33 49 31.2091 49 29V29C49 26.7909 47.2091 25 45 25H21C18.7909 25 17 26.7909 17 29V29C17 31.2091 15.2091 33 13 33H9C4.58172 33 1 29.4183 1 25V17Z",
      width: 66,
      height: 34,
    },
    top: {
      path: "M9 1C4.58172 1 1 4.58172 1 9V9C1 13.4183 4.58172 17 9 17H13C15.2091 17 17 15.2091 17 13V13C17 10.7909 18.7909 9 21 9H45C47.2091 9 49 10.7909 49 13V13C49 15.2091 50.7909 17 53 17H57C61.4183 17 65 13.4183 65 9V9C65 4.58172 61.4183 1 57 1H9Z",
      width: 66,
      height: 18,
    },
  },
  sleepyworm: {
    bottom: {
      path: "M9.47129 5.52401C4.17216 7.39057 1 12.5489 1 18.1672V18.1672C1 26.3591 7.64088 33 15.8328 33H50.1672C58.3591 33 65 26.3591 65 18.1672V18.1672C65 12.5489 61.8278 7.39057 56.5287 5.52401C50.4009 3.36557 41.7005 1 33 1C24.2995 1 15.5991 3.36557 9.47129 5.52401Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 15.6334C1 11.568 3.29654 7.84812 7.09405 6.39675C13.2041 4.06154 23.1021 1 33 1C42.8979 1 52.7959 4.06154 58.906 6.39675C62.7035 7.84812 65 11.568 65 15.6334V15.6334C65 23.6123 56.4148 29.1042 48.6808 27.1429C43.8722 25.9235 38.4361 25 33 25C27.5639 25 22.1278 25.9235 17.3192 27.1429C9.5852 29.1042 1 23.6123 1 15.6334V15.6334Z",
      width: 66,
      height: 29,
    },
    top: {
      path: "M7.11146 1C3.73619 1 1 3.73619 1 7.11146V7.11146C1 11.6546 5.85789 14.7633 10.1542 13.2863C16.2359 11.1956 24.6179 9 33 9C41.3821 9 49.7641 11.1956 55.8458 13.2863C60.1421 14.7633 65 11.6546 65 7.11146V7.11146C65 3.73619 62.2638 1 58.8885 1H7.11146Z",
      width: 66,
      height: 15,
    },
  },
  upward: {
    bottom: {
      path: "M1 9V33H65V9H49V1H17V9H1Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 9H17V1H49V9H65V33H49V25H17V33H1V9Z",
      width: 66,
      height: 34,
    },
    top: {
      path: "M1 1V17H17V9H49V17H65V1H1Z",
      width: 66,
      height: 18,
    },
  },
  volcano: {
    bottom: {
      path: "M2.76888 12.3467C-3.11661 21.1749 3.21199 33 13.8222 33H28.1778C38.788 33 45.1166 21.1749 39.2311 12.3467L38.0313 10.547C37.3589 9.53828 37 8.35307 37 7.14074V7.14074C37 3.7493 34.2507 1 30.8593 1H11.1407C7.7493 1 5 3.7493 5 7.14073V7.14073C5 8.35307 4.64115 9.53828 3.96867 10.547L2.76888 12.3467Z",
      width: 66,
      height: 34,
      marginLeft: 12,
    },
    piece: {
      path: "M1 35.0154C1 33.7013 1.38899 32.4165 2.11794 31.3231L15.9687 10.547C16.6411 9.53828 17 8.35307 17 7.14074V7.14074C17 3.7493 19.7493 1 23.1407 1H42.8593C46.2507 1 49 3.7493 49 7.14073V7.14073C49 8.35307 49.3589 9.53828 50.0313 10.547L63.8821 31.3231C64.611 32.4165 65 33.7013 65 35.0154V35.0154C65 41.6013 56.4583 44.1875 52.8051 38.7077L50.0313 34.547C49.3589 33.5383 49 32.3531 49 31.1407V31.1407C49 27.7493 46.2507 25 42.8593 25H23.1407C19.7493 25 17 27.7493 17 31.1407V31.1407C17 32.3531 16.6411 33.5383 15.9687 34.547L13.1949 38.7077C9.54166 44.1875 1 41.6013 1 35.0154V35.0154Z",
      width: 66,
      height: 43,
    },
    top: {
      path: "M10.2963 1C5.16211 1 1 5.16211 1 10.2963V14.5778C1 22.4931 11.2658 25.6013 15.6564 19.0154L15.9687 18.547C16.6411 17.5383 17 16.3531 17 15.1407V15.1407C17 11.7493 19.7493 9 23.1407 9H42.8593C46.2507 9 49 11.7493 49 15.1407V15.1407C49 16.3531 49.3589 17.5383 50.0313 18.547L50.3436 19.0154C54.7342 25.6013 65 22.4931 65 14.5778V10.2963C65 5.16211 60.8379 1 55.7037 1H10.2963Z",
      width: 66,
      height: 24,
    },
  },
  wave: {
    bottom: {
      path: "M9 1C4.58172 1 1 4.58172 1 9V17C1 25.8366 8.16344 33 17 33H49C57.8366 33 65 25.8366 65 17V9C65 4.58172 61.4183 1 57 1V1C52.5817 1 48.1639 4.99683 44.2028 6.95399C41.8325 8.12512 38.2911 9 33 9C27.7089 9 24.1675 8.12512 21.7972 6.954C17.8361 4.99683 13.4183 1 9 1V1Z",
      width: 66,
      height: 34,
    },
    piece: {
      path: "M1 9C1 4.58172 4.58172 1 9 1V1C13.4183 1 17.8361 4.99683 21.7972 6.95399C24.1675 8.12512 27.7089 9 33 9C38.2911 9 41.8325 8.12512 44.2028 6.954C48.1639 4.99683 52.5817 1 57 1V1C61.4183 1 65 4.58172 65 9V17C65 21.4183 61.4183 25 57 25V25C52.5817 25 48.1639 28.9968 44.2028 30.954C41.8325 32.1251 38.2911 33 33 33C27.7089 33 24.1675 32.1251 21.7972 30.954C17.8361 28.9968 13.4183 25 9 25V25C4.58172 25 1 21.4183 1 17V9Z",
      width: 66,
      height: 34,
    },
    top: {
      path: "M5 1C2.79086 1 1 2.79086 1 5V5C1 7.20914 2.79086 9 5 9H9C13.4183 9 17.8361 12.9968 21.7972 14.954C24.1675 16.1251 27.7089 17 33 17C38.2911 17 41.8325 16.1251 44.2028 14.954C48.1639 12.9968 52.5817 9 57 9H61C63.2091 9 65 7.20914 65 5V5C65 2.79086 63.2091 1 61 1H5Z",
      width: 66,
      height: 18,
    },
  },
}