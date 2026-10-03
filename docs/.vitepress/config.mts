import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: "zhengbin wiki",
  description: "A VitePress Site",
  themeConfig: {
    logo: '/logo.png',
    externalLinkIcon: true,
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    outline: {
      level: 2,
      label: '本页目录'
    },
    editLink: {
      pattern: 'https://github.com/mailzhengbin-ops/coding_notes/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/' }
    ],
    sidebar: [
      {
        text: '杂项',
        items: [
          { text: '剪切板', link: '/shortcuts' },
        ]
      },
      {
        text: '技术栈',
        items: [
      {
        text: 'Laravel',
        items: [
          { text: '项目启动', link: '/laravel/laravel_start' },
          { text: '设计思想', link: '/laravel/design_thoughts' },
          { text: '部署上线', link: '/laravel/deployment' },
          { text: 'PHP特性', link: '/laravel/php_features' },
          { text: '数据库', link: '/laravel/database' },
          { text: '性能优化', link: '/laravel/optimize' },
          { text: '安全性', link: '/laravel/security' },
          { text: '外部服务集成', link: '/laravel/api' },
        ]
      },
      {
        text: 'Nest.js',
        collapsed: true,
        items: [
          { text: '项目启动', link: '/nest/nest_start' },
          { text: '设计思想', link: '/nest/nest_module' },
        ]
      },
        ]
      },
      {
        text: '运维',
        items: [
          { text: 'Nginx', link: '/operations' },
          { text: 'Linux', link: 'abc' },
        ]
      },
      {
        text: 'Agent',
        collapsed: false,
        items: [
          { text: '规范驱动开发', link: '/spec' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mailzhengbin-ops/coding_notes' }
    ]
  }
})
