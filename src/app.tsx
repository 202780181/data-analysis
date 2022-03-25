import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { MenuDataItem } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { RequestConfig } from 'umi';
import routers from '@/routers';
import NoPermission from '@/pages/exception/403';

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
  BulbOutlined,
} from '@ant-design/icons';
import TagView from '@/components/TagView';
import EventEmitter from '@/utils/eventEmitter';

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
  bulbOutlined: <BulbOutlined />,
};

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, routes, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    routes: routes && loopMenuItem(routes),
  }));

// ProLayout 支持的api https://procomponents.ant.design/components/layout
// BasicLayoutProps 运行时配置非常灵活，但是相应的性能可能比较差，
// 除了下面的插件支持的特有配置外，运行时配置支持所有的构建时配置并透传给 @ant-design/pro-layout。
// 官方url https://umijs.org/zh-CN/plugins/plugin-layout#layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <TagView />,
    disableContentMargin: false,
    menuDataRender: () => {
      return loopMenuItem(routers);
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      } else {
        EventEmitter.emit('routerChange', location);
      }
      if (initialState?.currentUser && location.pathname === '/') {
        history.push('/home');
      }
    },
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <NoPermission />,
    // 右侧全局设置菜单<自定义设置已覆盖>
    // childrenRender: (children, props) => {
    //   return (
    //     <>
    //       {children}
    //       {!props.location?.pathname?.includes('/login') && (
    //         <SettingDrawer
    //           disableUrlParams
    //           enableDarkTheme
    //           settings={initialState?.settings}
    //           onSettingChange={(settings) => {
    //             setInitialState((preInitialState) => ({
    //               ...preInitialState,
    //               settings,
    //             })).then(() => {});
    //           }}
    //         />
    //       )}
    //     </>
    //   );
    // },
    ...initialState?.settings,
  };
};
