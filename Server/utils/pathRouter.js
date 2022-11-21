routes = {
  path: '/home',
  name: 'home',
  meta: {
    title: '主页',
  },
  children: [
    {
      path: '/video',
      name: 'video',
      meta: {
        title: '视频',
      },
      children: [
        {
          path: '/videowz',
          name: 'videowz',
          meta: {
            title: '精彩剪辑',
          },
        },
      ],
    },
    {
      path: '/my',
      name: 'my',
      meta: {
        title: '我的',
      },
      children: [
        {
          path: '/myinfo',
          name: 'myinfo',
          meta: {
            title: '我的数据',
          },
        },
      ],
    },
  ],
}

exports.routes = routes
