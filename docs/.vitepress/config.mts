import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: "zhengbin wiki",
  description: "A VitePress Site",
  themeConfig: {
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
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: '杂项',
        items: [
          { text: '剪切板', link: '/api-examples' },
        ]
      },
      {
        text: '技术栈',
        items: [
      {
        text: 'Laravel',
        items: [
          { text: '项目启动', link: '/laravel' },
          { text: '设计思想', link: '/markdown-examples' },
          { text: '部署上线', link: '/deployment' },
          { text: 'PHP特性', link: '/frontend' },
          { text: '数据库', link: '/database' },
          { text: '性能优化', link: '/optimize' },
          { text: '安全性', link: '/security' },
          { text: '外部服务集成', link: '/api' },
        ]
      },
      {
        text: 'Nest.js',
        collapsed: true,
        items: [
          { text: '项目启动', link: '/a' },
          { text: '设计思想', link: '/nest_module' },
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
