export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  isRtl: boolean;
  active: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: "en", name: "English", nativeName: "English", isRtl: false, active: true },
  { code: "es", name: "Spanish", nativeName: "Español", isRtl: false, active: true },
  { code: "fr", name: "French", nativeName: "Français", isRtl: false, active: true },
  { code: "de", name: "German", nativeName: "Deutsch", isRtl: false, active: true },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", isRtl: false, active: true },
  { code: "ar", name: "Arabic", nativeName: "العربية", isRtl: true, active: true },
  { code: "zh", name: "Chinese (Simplified)", nativeName: "简体中文", isRtl: false, active: true },
];

export const DEFAULT_LANGUAGE = "en";
