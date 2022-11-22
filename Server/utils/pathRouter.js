routes = {
  path: '/home',
  name: 'home',
  meta: {
    title: '主页',
  },
  children: [
    {
      path: '/user',
      name: 'user',
      meta: {
        title: '用户管理',
      },
      children: [
        {
          path: '/users',
          name: 'users',
          meta: {
            title: '用户列表',
          },
        },
      ],
    },
    {
      path: '/shop',
      name: 'shop',
      meta: {
        title: '商品管理',
      },
      children: [
        {
          path: '/shops',
          name: 'shops',
          meta: {
            title: '商品列表',
          },
        },
      ],
    },
  ],
}

exports.routes = routes
