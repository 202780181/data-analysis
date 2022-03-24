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
        name: 'register-result',
        icon: 'smile',
        path: '/user/register-result',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/analysis',
      },
      {
        name: 'analysis',
        icon: 'smile',
        path: '/dashboard/analysis',
      },
      {
        name: 'monitor',
        icon: 'smile',
        path: '/dashboard/monitor',
      },
      {
        name: 'workplace',
        icon: 'smile',
        path: '/dashboard/workplace',
      },
    ],
  },
  {
    path: '/form',
    icon: 'form',
    name: 'form',
    routes: [
      {
        path: '/form',
        redirect: '/form/basic-form',
      },
      {
        name: 'basic-form',
        icon: 'smile',
        path: '/form/basic-form',
      },
      {
        name: 'step-form',
        icon: 'smile',
        path: '/form/step-form',
      },
      {
        name: 'advanced-form',
        icon: 'smile',
        path: '/form/advanced-form',
      },
    ],
  },
  {
    path: '/list',
    icon: 'table',
    name: 'list',
    routes: [
      {
        path: '/list/search',
        name: 'search-list',
        routes: [
          {
            path: '/list/search',
            redirect: '/list/search/articles',
          },
          {
            name: 'articles',
            icon: 'smile',
            path: '/list/search/articles',
          },
          {
            name: 'projects',
            icon: 'smile',
            path: '/list/search/projects',
          },
          {
            name: 'applications',
            icon: 'smile',
            path: '/list/search/applications',
          },
        ],
      },
      {
        path: '/list',
        redirect: '/list/table-list',
      },
      {
        name: 'table-list',
        icon: 'smile',
        path: '/list/table-list',
      },
      {
        name: 'basic-list',
        icon: 'smile',
        path: '/list/basic-list',
      },
      {
        name: 'card-list',
        icon: 'smile',
        path: '/list/card-list',
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    icon: 'profile',
    routes: [
      {
        path: '/profile',
        redirect: '/profile/basic',
      },
      {
        name: 'basic',
        icon: 'smile',
        path: '/profile/basic',
      },
      {
        name: 'advanced',
        icon: 'smile',
        path: '/profile/advanced',
      },
    ],
  },
  {
    name: 'result',
    icon: 'CheckCircleOutlined',
    path: '/result',
    routes: [
      {
        path: '/result',
        redirect: '/result/success',
      },
      {
        name: 'success',
        icon: 'smile',
        path: '/result/success',
      },
      {
        name: 'fail',
        icon: 'smile',
        path: '/result/fail',
      },
    ],
  },
  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
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
    name: 'editor',
    icon: 'highlight',
    path: '/editor',
    routes: [
      {
        path: '/editor',
        redirect: '/editor/flow',
      },
      {
        name: 'flow',
        icon: 'smile',
        path: '/editor/flow',
      },
      {
        name: 'mind',
        icon: 'smile',
        path: '/editor/mind',
      },
      {
        name: 'koni',
        icon: 'smile',
        path: '/editor/koni',
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
    path: '/',
    redirect: '/dashboard/analysis',
  },
  {
    component: '404',
  },
];
