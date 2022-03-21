import {Space} from 'antd';
import React from 'react';
import {useModel, SelectLang, setLocale} from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import NoticeIconView from '../NoticeIcon';
import SettingDrawer from '../SettingDrawer'
export type SiderTheme = 'light' | 'dark';



const GlobalHeaderRight: React.FC = () => {
  const {initialState} = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const {navTheme, layout} = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  // 默认语言设置
  const defaultLang = [
    {
      lang: 'zh-CN',
      label: '简体中文',
      icon: '🇨🇳',
      title: '语言'
    },
    {
      lang: 'en-US',
      label: 'English',
      icon: '🇺🇸',
      title: 'Language'
    }
  ]

  // 设置语言
  function handleClick(props: any) {
    setLocale(props.key, true)
    return true
  }

  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="检索内容"
        defaultValue=""
        options={[]}
        // onSearch={value => {
        //   console.log('input', value);
        // }}
      />
      <NoticeIconView/>
      <Avatar menu/>
      <SettingDrawer/>
      <SelectLang
        postLocalesData={() => defaultLang}
        onItemClick={handleClick}
        reload
        className={styles.action}/>
    </Space>
  );
};

export default GlobalHeaderRight;
