import { isBrowser } from '@ant-design/pro-utils';
import zhLocal from './zh-CN';
import enUSLocal from './en-US';

const locales = {
  'zh-CN': zhLocal,
  'en-US': enUSLocal,
};
type GLocaleWindow = {
  g_locale: keyof typeof locales;
};

export type LocaleType = keyof typeof locales;

const getLanguage = (): string => {
  // support ssr
  if (!isBrowser()) return 'zh-CN';
  const lang = window.localStorage.getItem('umi_locale');
  return lang || (window as unknown as GLocaleWindow).g_locale || navigator.language;
};

export { getLanguage };
const gLocaleObject = (): Record<string, string> => {
  const gLocale = getLanguage();
  return locales[gLocale] || locales['zh-CN'];
};

export { gLocaleObject };
