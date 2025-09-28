import { useTranslation } from "react-i18next";
import type { LocalizedText } from "../../types/app";

export function useLocalizedText() {
  const { i18n } = useTranslation();
  return (text: LocalizedText | string) => {
    if (typeof text === "string") {
      return text;
    }
    const language = i18n.language as keyof typeof text;
    return text[language] ?? text.en ?? Object.values(text)[0] ?? "";
  };
}
