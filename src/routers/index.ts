/**
 *  hideInMenu: true, 不展示菜单
 */
export default [
  {
    path: '/user',
    menuRender: false,
    // 不展示菜单顶栏
    menuHeaderRender: false,
    headerRender: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/',
    name: 'home',
    icon: 'home',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        name: 'home',
        icon: 'home',
        path: '/home',
      },
    ],
  },
  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    hideInMenu: true,
    routes: [
      {
        path: '/exception',
        redirect: '/exception/403',
      },
      {
        name: '403',
        icon: 'smile',
        path: '/exception/403',
      },
      {
        name: '404',
        icon: 'smile',
        path: '/exception/404',
      },
      {
        name: '500',
        icon: 'smile',
        path: '/exception/500',
      },
    ],
  },
  {
    name: 'account',
    icon: 'user',
    path: '/account',
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        name: 'center',
        icon: 'smile',
        path: '/account/center',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
      },
    ],
  },
  {
    name: 'system',
    icon: 'setting',
    path: '/system',
    routes: [
      {
        path: '/user',
        redirect: '/system/user',
      },
      {
        name: 'user',
        icon: 'smile',
        path: '/system/user',
      },
    ],
  },
  {
    component: '404',
  },
  {
    icon: 'bulbOutlined',
    name: 'testMenu',
    path: '/newPage',
    routes: [
      {
        path: '/newPage',
        redirect: '/testList/newPage',
      },
      {
        name: 'chart',
        icon: 'smile',
        path: '/testList/newPage',
        // // 不展示顶栏
        // headerRender: false,
        // // 不展示页脚
        // footerRender: false,
        // // 不展示菜单
        // menuRender: false,
        // // 不展示菜单顶栏
        // menuHeaderRender: false,
      },
    ],
  },
];
