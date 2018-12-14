export default [
  //建设单位
  {
    path: '/developer',
    component: './Developer/Developer',
    name: '建设单位',
    routes: [
      { path: '/developer', redirect: '/developer/home' },
      {
        path: '/developer/home',
        component: './DeveloperHome/DeveloperHome',
        name: '主页',
      },
      {
        path: '/developer/dlql',
        name: '道路、桥梁命名申请',
        component: './Developer/DLQL/DLQL',
      },
      {
        path: '/developer/xqly',
        name: '小区、楼宇命名申请',
        component: './Developer/XQLY/XQLY',
      },
      { path: '/developer/mph', name: '门牌号申请', component: './Developer/MPH/MPH' },
    ],
  },

  //登录
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: './Login/Login',
    name: '用户登录',
  },
  //经办人主页
  {
    path: '/home',
    component: './Home/Home',
    name: '用户主页',
  },
  //地名地址审批管理系统
  {
    path: '/approval',
    component: './Approval/Approval',
    name: '地名地址审批管理系统',
    routes: [
      { path: '/approval', redirect: '/approval/dlql' },
      { path: '/home', name: '主页', component: './Home/Home' },
      { path: '/approval/dlql', name: '道路、桥梁命名审批', component: './Approval/DLQL/DLQL' },
      { path: '/approval/xqly', name: '小区、楼宇命名审批', component: './Approval/XQLY/XQLY' },
      { path: '/approval/mph', name: '门牌号审批', component: './Approval/MPH/MPH' },
      { path: '/approval/mpbz', name: '门牌号编制', component: './Approval/MPBZ/MPBZ' },
    ],
  },
//地名地址服务应用系统
{
  path: '/servicemanage',
  component: './ServiceManage/ServiceManage',
  name: '地名地址服务应用系统',
  routes: [
    { path: '/servicemanage', redirect: '/servicemanage/mapservice' },
    { path: '/home', name: '主页', component: './Home/Home' },
    { path: '/servicemanage/mapservice', name: '地图管理', component: './ServiceManage/MapService/MapService' },
  ],
},

  /*
  // test
  {
    path: '/test',
    component: './Test/Test',
    name: 'test',
    routes: [
      // { path: '/test', redirect: '/test/t0' },
      { path: '/test/t0', name: 'hehe', component: './Test/T0' },
      { path: '/test/t1', component: './Test/T1' },
    ],
  },
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      // { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      // forms
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },*/
  {
    component: '404',
  },
];
