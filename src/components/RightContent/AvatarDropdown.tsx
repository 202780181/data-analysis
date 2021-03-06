import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin, Modal, message } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';
import type { MenuInfo } from 'rc-menu/lib/interface';
import cookie from 'react-cookies';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    const res = await outLogin();
    if (res.code !== 200) {
      message.warning(res.msg);
      return;
    }
    const { query = {}, pathname } = history.location;
    const { redirect } = query;
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      cookie.remove('token');
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname,
        }),
      });
    }
  };

  function loginOutTips() {
    Modal.confirm({
      title: '提示',
      okText: '确定',
      cancelText: '取消',
      content: (
        <div>
          <p>确定注销并退出系统吗？</p>
        </div>
      ),
      onOk() {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
      },
      onCancel() {},
    });
  }
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        loginOutTips();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser?.user?.userName) {
    return loading;
  }
  const { user } = currentUser;
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={
            user?.avatar || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
          }
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{user?.userName}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
