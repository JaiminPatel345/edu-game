import en from "./en/common.json";
import hi from "./hi/common.json";
import pa from "./pa/common.json";
import gu from "./gu/common.json";

export const resources = {
  en: { translation: en },
  hi: { translation: hi },
  pa: { translation: pa },
  gu: { translation: gu },
};

export type AppResource = typeof resources;
