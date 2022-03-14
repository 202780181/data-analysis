import {useContext, createContext} from 'react';

function useLocale(locale = null) {

  const { lang } = useContext(createContext<{
    lang?: string;
    setLang?: (value: string) => void;
  }>({}));

  // @ts-ignore
  return (locale || {})[lang] || {};
}

export default useLocale;
