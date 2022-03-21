
const themeConfig = {
  daybreak: '#1890ff',
  dust: '#F5222D',
  volcano: '#FA541C',
  sunset: '#FAAD14',
  cyan: '#13C2C2',
  green: '#52C41A',
  geekblue: '#2F54EB',
  purple: '#722ED1',
};

export function genStringToTheme(val?: string): string {
  return val && themeConfig[val] ? themeConfig[val] : val;
}

/**
 *
 * @param rest
 */
const merge =<T>(...rest: any[]): T => {
  const obj = {};
  const il = rest.length;
  let key;
  let i = 0;
  for (; i < il; i += 1) {
    // eslint-disable-next-line no-restricted-syntax
    for (key in rest[i]) {
      if (rest[i].hasOwnProperty(key)) {
        if (
          typeof obj[key] === 'object' &&
          typeof rest[i][key] === 'object' &&
          obj[key] !== undefined &&
          obj[key] !== null &&
          !Array.isArray(obj[key]) &&
          !Array.isArray(rest[i][key])
        ) {
          obj[key] = {
            ...obj[key],
            ...rest[i][key],
          };
        } else {
          obj[key] = rest[i][key];
        }
      }
    }
  }
  return obj as T;
}

export { merge };
