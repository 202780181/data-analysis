import {FC} from 'react';
import {createFromIconfontCN} from '@ant-design/icons';
import styles from './index.less';
import classNames from "classnames";
import {Drawer} from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type {ProSettings} from './defaultSettings';
import { gLocaleObject, getLanguage } from '@/locales';


type BodyProps = {
  title: string;
  prefixCls: string;
};

// @ts-ignore
type MergerSettingsType<T> = Partial<T> & {
  primaryColor?: string;
  colorWeak?: boolean;
};

export type SettingDrawerProps = {
  collapse?: boolean;
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

const Body: React.FC<BodyProps> = ({children, prefixCls, title}) => (
  <div style={{marginBottom: 24}}>
    <h3 className={`${prefixCls}-drawer-title`}>{title}</h3>
    {children}
  </div>
);

export const getFormatMessage =():((data: { id: string; defaultMessage?: string }) => string)=>{
  const formatMessage= ({id}:{id:string;defaultMessage?: string}): string => {
    const locales = gLocaleObject();
    return locales[id];
  }
  return formatMessage;
}

const SettingDrawer: FC<SettingDrawerProps> = (props) => {
  const {
    className,
    getContainer,
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
    prefixCls = 'ant-pro',
  } = props;
  const [show, setShow] = useMergedState(false, {
    value: props.collapse,
    onChange: props.onCollapseChange,
  });
  const SettingIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3264088_toi8vjjvb.js',
  });

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

          </Body>
        </div>
      </Drawer>
    </div>
  )
}

export default SettingDrawer
