import React,{FC, useEffect, useState, useRef} from 'react';
import {createFromIconfontCN} from '@ant-design/icons';
import styles from './index.less';
import classNames from "classnames";
import {Drawer, ConfigProvider, Divider, List, Switch} from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type {ProSettings} from './defaultSettings';
import defaultSettings from './defaultSettings';
import {gLocaleObject, getLanguage} from '@/locales';
import BlockCheckbox from './BlockCheckbox';
import {isBrowser} from "@ant-design/pro-utils";
import {useUrlSearchParams} from '@umijs/use-params';
import {genStringToTheme, merge} from '@/utils/utils';
import {disable as darkreaderDisable, enable as darkreaderEnable} from '@umijs/ssr-darkreader';
import ThemeColor from './ThemeColor';
import LayoutSetting, {renderLayoutSettingItem} from './LayoutChange'
import RegionalSetting from './RegionalChange';



type BodyProps = {
  title: string;
  prefixCls: string;
};

// @ts-ignore
type MergerSettingsType<T> = Partial<T> & {
  primaryColor?: string;
  colorWeak?: boolean;
};

export type SettingItemProps = {
  title: React.ReactNode;
  action: React.ReactElement;
  disabled?: boolean;
  disabledReason?: React.ReactNode;
};

export type SettingDrawerProps = {
  defaultSettings?: MergerSettingsType<ProSettings>;
  settings?: MergerSettingsType<ProSettings>;
  collapse?: boolean;
  hideHintAlert?: boolean;
  hideCopyButton?: boolean;
  onCollapseChange?: (collapse: boolean) => void;
  className?: string;
  getContainer?: any;
  colorList?: false | { key: string; color: string }[];
  prefixCls?: string;
  enableDarkTheme?: boolean;
  onSettingChange?: (settings: MergerSettingsType<ProSettings>) => void;
  pathname?: string;
  disableUrlParams?: boolean;
  themeOnly?: boolean;
};

const getDifferentSetting =(state: Partial<ProSettings>): Record<string, any> => {
  const stateObj: Partial<ProSettings> = {};
  Object.keys(state).forEach((key) => {
    if (state[key] !== defaultSettings[key] && key !== 'collapse') {
      stateObj[key] = state[key];
    } else {
      stateObj[key] = undefined;
    }
    if (key.includes('Render')) stateObj[key] = state[key] === false ? false : undefined;
  });
  stateObj.menu = undefined;
  return stateObj;
}

const Body: React.FC<BodyProps> = ({children, prefixCls, title}) => (
  <div style={{marginBottom: 24}}>
    <h3 className={`${prefixCls}-drawer-title`}>{title}</h3>
    {children}
  </div>
);

export const getFormatMessage = (): ((data: { id: string; defaultMessage?: string }) => string) => {
  const formatMessage = ({id}: { id: string; defaultMessage?: string }): string => {
    const locales = gLocaleObject();
    return locales[id];
  }
  return formatMessage;
}

const updateTheme = async (dark: boolean, color?: string) => {
  if (typeof window === 'undefined') return;
  if (typeof window.MutationObserver === 'undefined') return;

  if (!ConfigProvider.config) return;
  ConfigProvider.config({
    theme: {
      primaryColor: genStringToTheme(color) || '#1890ff'
    },
  });

  if (dark) {
    const defaultTheme = {
      brightness: 100,
      contrast: 90,
      sepia: 10
    }
    const defaultFixes = {
      invert: [],
      css: '',
      ignoreInlineStyle: ['.react-switch-handle'],
      ignoreImageAnalysis: [],
      disableStyleSheetsProxy: true,
    }
    if (window.MutationObserver) {
      darkreaderEnable(defaultTheme, defaultFixes)
    } else {
      if (window.MutationObserver) darkreaderDisable();
    }
  }
}


/**
 * 初始化的时候需要做的工作
 *
 * @param param0
 */
const initState = (
  urlParams: Record<string, any>,
  settings: Partial<ProSettings>,
  onSettingChange: SettingDrawerProps['onSettingChange'],
) => {
  if (!isBrowser()) return;

  const replaceSetting = {};
  Object.keys(urlParams).forEach((key) => {
    if (defaultSettings[key] || defaultSettings[key] === undefined) {
      if (key === 'primaryColor') {
        replaceSetting[key] = genStringToTheme(urlParams[key]);
        return;
      }
      replaceSetting[key] = urlParams[key]
    }
  });
  const newSettings: MergerSettingsType<ProSettings> = merge({}, settings, replaceSetting);
  delete newSettings.menu
  delete newSettings.title
  delete newSettings.iconfontUrl

  // 同步数据到外部
  onSettingChange?.(newSettings)

  // 如果 url 中设置主题，进行一次加载。
  if (defaultSettings.navTheme !== urlParams.navTheme && urlParams.navTheme) {
    updateTheme(settings.navTheme === 'realDark', urlParams.primaryColor)
  }
}

const getParamsFromUrl = (
  urlParams: Record<string, any>,
  settings?: MergerSettingsType<ProSettings>,
) => {
  if (!isBrowser()) return defaultSettings;

  return {
    ...defaultSettings,
    ...(settings || {}),
    ...urlParams,
  }
}

const SettingDrawer: FC<SettingDrawerProps> = (props) => {
  const {
    defaultSettings: propsDefaultSettings = undefined,
    settings: propsSettings = undefined,
    className,
    getContainer,
    hideHintAlert,
    hideCopyButton,
    colorList = [
      {key: 'daybreak', color: '#1890ff'},
      {key: 'dust', color: '#F5222D'},
      {key: 'volcano', color: '#FA541C'},
      {key: 'sunset', color: '#FAAD14'},
      {key: 'cyan', color: '#13C2C2'},
      {key: 'green', color: '#52C41A'},
      {key: 'geekblue', color: '#2F54EB'},
      {key: 'purple', color: '#722ED1'},
    ],
    onSettingChange,
    prefixCls = 'ant-pro',
    disableUrlParams = true,
    themeOnly = true,
    pathname = window.location.pathname,
  } = props;
  const firstRender = useRef<boolean>(true);

  const [show, setShow] = useMergedState(false, {
    value: props.collapse,
    onChange: props.onCollapseChange,
  });
  const SettingIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3264088_toi8vjjvb.js',
  });
  const [language, setLanguage] = useState<string>(getLanguage());
  const [urlParams, setUrlParams] = useUrlSearchParams(
    {},
    {
      disabled: disableUrlParams,
    },
  );
  const [settingState, setSettingState] = useMergedState<Partial<ProSettings>>(
    () => getParamsFromUrl(urlParams, propsSettings || propsDefaultSettings),
    {
      value: propsSettings,
      onChange: onSettingChange,
    },
  );

  const { navTheme, primaryColor, layout, colorWeak } = settingState || {};

  useEffect(() => {
    // 语言修改，这个是和 locale 是配置起来的
    const onLanguageChange = (): void => {
      if (language !== getLanguage()) {
        setLanguage(getLanguage());
      }
    };

    /** 如果不是浏览器 都没有必要做了 */
    if (!isBrowser()) return () => null;
    initState(getParamsFromUrl(urlParams, propsSettings), settingState, setSettingState);
    window.document.addEventListener('languagechange', onLanguageChange, {
      passive: true,
    })

    return () => window.document.removeEventListener('languagechange', onLanguageChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=> {
    updateTheme(settingState.navTheme === 'realDark', settingState.primaryColor)
  },[settingState.primaryColor, settingState.navTheme])


  /**
   * 修改设置
   *
   * @param key
   * @param value
   */
  const changeSetting = (key: string, value: string | boolean) => {
    const nextState = {} as any;
    nextState[key] = value;

    if (key === 'layout') {
      nextState.contentWidth = value === 'top' ? 'Fixed' : 'Fluid';
    }
    if (key === 'layout' && value !== 'mix') {
      nextState.splitMenus = false;
    }
    if (key === 'layout' && value === 'mix') {
      nextState.navTheme = 'light';
    }
    if (key === 'colorWeak' && value === true) {
      const dom = document.querySelector('body');
      if (dom) {
        dom.dataset.prosettingdrawer = dom.style.filter;
        dom.style.filter = 'invert(80%)';
      }
    }
    if (key === 'colorWeak' && value === false) {
      const dom = document.querySelector('body');
      if (dom) {
        dom.style.filter = dom.dataset.prosettingdrawer || 'none';
        delete dom.dataset.prosettingdrawer;
      }
    }

    delete nextState.menu;
    delete nextState.title;
    delete nextState.iconfontUrl;
    delete nextState.logo;
    delete nextState.pwa;

    setSettingState({...settingState, ...nextState})
  };

  useEffect(()=> {
    /** 如果不是浏览器 都没有必要做了 */
    if (!isBrowser()) return;
    if(disableUrlParams) return;
    if(firstRender.current) {
      firstRender.current = false;
      return;
    }

    /** 每次从url拿最新的防止记忆 */
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const diffParams = getDifferentSetting({ ...params, ...settingState });

    delete diffParams.logo;
    delete diffParams.menu;
    delete diffParams.title;
    delete diffParams.iconfontUrl;
    delete diffParams.pwa;

    setUrlParams(diffParams);

  }, [setUrlParams, settingState, urlParams, pathname, disableUrlParams])


  const baseClassName = `${prefixCls}-setting`;
  const formatMessage = getFormatMessage();
  return (
    <div className={classNames(className, styles.action)} style={{fontSize: '18px'}} onClick={() => setShow(!show)}>
      <SettingIcon type="icon-shezhi"/>
      <Drawer
        visible={show}
        width={300}
        closable={false}
        onClose={() => setShow(false)}
        placement="right"
        getContainer={getContainer}
      >
        <div className={`${baseClassName}-drawer-content`}>
          <Body title={
            formatMessage({
              id: 'app.setting.pagestyle',
              defaultMessage: 'Page style setting',
            })}
                prefixCls={baseClassName}>
            <BlockCheckbox
              configType="theme"
              key="navTheme"
              value={navTheme!}
              onChange={(value) => changeSetting('navTheme', value)}
              list={[
                {
                  key: 'light',
                  title: formatMessage({
                    id: 'app.setting.pagestyle.light',
                    defaultMessage: '亮色菜单风格',
                  }),
                },
                {
                  key: 'dark',
                  title: formatMessage({
                    id: 'app.setting.pagestyle.dark',
                    defaultMessage: '暗色菜单风格',
                  }),
                },
                {
                  key: 'realDark',
                  title: formatMessage({
                    id: 'app.setting.pagestyle.realdark',
                    defaultMessage: '暗色菜单风格',
                  }),
                }
              ]}
              prefixCls={baseClassName}
            />
          </Body>
          {colorList !== false && (
            <Body
              title={formatMessage({
                id: 'app.setting.themecolor',
                defaultMessage: 'Theme color',
              })}
              prefixCls={baseClassName}
            >
              <ThemeColor
                colorList={colorList}
                value={genStringToTheme(primaryColor)!}
                formatMessage={formatMessage}
                onChange={(color) => changeSetting('primaryColor', color)}
              />
            </Body>
          )}
          {themeOnly && (
            <>
              <Divider />
              <Body
                prefixCls={baseClassName}
                title={formatMessage({ id: 'app.setting.navigationmode' })}
              >
                <BlockCheckbox
                  prefixCls={baseClassName}
                  value={layout!}
                  key="layout"
                  configType="layout"
                  list={[
                    {
                      key: 'side',
                      title: formatMessage({ id: 'app.setting.sidemenu' }),
                    },
                    {
                      key: 'top',
                      title: formatMessage({ id: 'app.setting.topmenu' }),
                    },
                    {
                      key: 'mix',
                      title: formatMessage({ id: 'app.setting.mixmenu' }),
                    },
                  ]}
                  onChange={(value) => changeSetting('layout', value)}
                />
              </Body>
              <LayoutSetting settings={settingState} changeSetting={changeSetting} />
              <Divider />
              <Body
                prefixCls={baseClassName}
                title={formatMessage({ id: 'app.setting.regionalsettings' })}
              >
                <RegionalSetting settings={settingState} changeSetting={changeSetting} />
              </Body>

              <Divider />

              <Body
                prefixCls={baseClassName}
                title={formatMessage({ id: 'app.setting.othersettings' })}
              >
                <List
                  split={false}
                  renderItem={renderLayoutSettingItem}
                  dataSource={[
                    {
                      title: formatMessage({ id: 'app.setting.weakmode' }),
                      action: (
                        <Switch
                          size="small"
                          className="color-weak"
                          checked={!!colorWeak}
                          onChange={(checked) => {
                            changeSetting('colorWeak', checked);
                          }}
                        />
                      ),
                    },
                  ]}
                />
              </Body>
              {hideHintAlert && hideCopyButton ? null : <Divider />}
            </>
          )}
        </div>
      </Drawer>
    </div>
  )
}

export default SettingDrawer
