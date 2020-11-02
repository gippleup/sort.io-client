import { Platform, NativeModules } from "react-native";

export enum LanguageCode {
  af = "Afrikaans",
  sq = "Albanian",
  ar = "Arabic",
  eu = "Basque",
  be = "Belarusian",
  bg = "Bulgarian",
  ca = "Catalan",
  zh = "Chinese",
  hr = "Croatian",
  cs = "Czech",
  da = "Danish",
  nl = "Dutch",
  en = "English",
  et = "Estonian",
  fo = "Faeroese",
  fa = "Farsi",
  fi = "Finnish",
  fr = "French",
  gd = "Gaelic",
  de = "German",
  el = "Greek",
  he = "Hebrew",
  hi = "Hindi",
  hu = "Hungarian",
  is = "Icelandic",
  id = "Indonesian",
  ga = "Irish",
  it = "Italian",
  ja = "Japanese",
  ko = "Korean",
  ku = "Kurdish",
  lv = "Latvian",
  lt = "Lithuanian",
  mk = "Macedonian",
  ml = "Malayalam",
  ms = "Malaysian",
  mt = "Maltese",
  no = "Norwegian",
  pl = "Polish",
  pt = "Portuguese",
  pa = "Punjabi",
  ro = "Romanian",
  ru = "Russian",
  sr = "Serbian",
  sk = "Slovak",
  sl = "Slovenian",
  sb = "Sorbian",
  es = "Spanish",
  sv = "Swedish",
  th = "Thai",
  ts = "Tsonga",
  tn = "Tswana",
  tr = "Turkish",
  uk = "Ukrainian",
  ur = "Urdu",
  ve = "Venda",
  vi = "Vietnamese",
  cy = "Welsh",
  xh = "Xhosa",
  ji = "Yiddish",
  zu = "Zulu",
}

export const getSystemLocaleCode = (): keyof typeof LanguageCode => {
  const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

  if (deviceLanguage) {
    const code: keyof typeof LanguageCode = deviceLanguage.split("_")[0];
    return code;
  }

  return "en";
}

export const getSystemLocale = (): LanguageCode | null => {
  const code = getSystemLocaleCode();
  return LanguageCode[code];
}