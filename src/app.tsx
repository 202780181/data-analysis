import type { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { RequestConfig } from 'umi';
import routers from '@/routers';
import {
  RequestInterceptor,
  ResponseInterceptors,
  errorHandler,
} from '@/middlewares/httpInterceptors';

import {
  DashboardOutlined,
  FormOutlined,
  TableOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  UserOutlined,
  HighlightOutlined,
} from '@ant-design/icons';

const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * http 请求设置
 */
export const request: RequestConfig = {
  timeout: 15000,
  dataField: '',
  errorHandler,
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: resData.ok,
        errorMessage: resData.message,
      };
    },
  },
  middlewares: [],
  requestInterceptors: [RequestInterceptor],
  responseInterceptors: [ResponseInterceptors],
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// 服务端获取menu, icon 必须映射使用
const IconMap = {
  dashboard: <DashboardOutlined />,
  form: <FormOutlined />,
  table: <TableOutlined />,
  profile: <ProfileOutlined />,
  CheckCircleOutlined: <CheckCircleOutlined />,
  warning: <WarningOutlined />,
  user: <UserOutlined />,
  highlight: <HighlightOutlined />,
};

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, routes, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    routes: routes && loopMenuItem(routes),
  }));

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    menuDataRender: () => {
      return loopMenuItem(routers);
    },
    onPageChange: () => {
      const { currentUser } = initialState;
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!currentUser && location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};
