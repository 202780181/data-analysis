import type {Settings as LayoutSettings} from '@ant-design/pro-layout';
import type {MenuDataItem} from '@ant-design/pro-layout';
// @ts-ignore
import {PageLoading, SettingDrawer} from "@ant-design/pro-layout";
import type {RunTimeLayoutConfig} from 'umi';
import {history, RequestConfig} from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import routers from '@/routers'
import {currentUser as queryCurrentUser} from './services/ant-design-pro/api';
import {errorHandler, RequestInterceptor, ResponseInterceptors} from '@/middlewares/httpInterceptors';
// @ts-ignore
import {fetchMenuData} from '@/services/ant-design-pro/system';
import {
  DashboardOutlined,
  FormOutlined,
  TableOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  UserOutlined,
  HighlightOutlined
} from '@ant-design/icons'

const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading/>,
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
      }
    }
  },
  middlewares: [],
  requestInterceptors: [RequestInterceptor],
  responseInterceptors: [ResponseInterceptors]
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
  dashboard: <DashboardOutlined/>,
  form: <FormOutlined/>,
  table: <TableOutlined/>,
  profile: <ProfileOutlined/>,
  CheckCircleOutlined: <CheckCircleOutlined/>,
  warning: <WarningOutlined/>,
  user: <UserOutlined/>,
  highlight: <HighlightOutlined />,
};
const defaultMenus = routers

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({icon, routes, ...item}) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    routes: routes && loopMenuItem(routes),
  }));

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    // 水印API
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: [],
    menuHeaderRender: undefined,
    // 从服务端请求获取menu
    menu: {
      request: async () => loopMenuItem(defaultMenus)
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
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
    //           onSettingChange={(settings => {
    //             setInitialState((preInitialState) => ({
    //               ...preInitialState,
    //               settings,
    //             })).then(() => {});
    //           })}>
    //
    //         </SettingDrawer>
    //       )}
    //     </>
    //   )
    // },
    ...initialState?.settings,
  };
};
