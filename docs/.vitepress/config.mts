import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "AI coding开发手册",
  description: "A VitePress Site",
  themeConfig: {
    sidebarMenuLabel: '菜单',
    outline: {
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
        text: 'Laravel',
        collapsed: false,
        items: [
          { text: '项目启动', link: '/laravel' },
          { text: '前端', link: '/frontend' },
          { text: '数据库', link: '/database' },
          { text: '目录结构', link: '/markdown-examples' },
          { text: '部署上线', link: '/deployment' },
          { text: '民法', link: '/civil' },
        ]
      },
      {
        text: 'Agent',
        collapsed: false,
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Laravel项目启动', link: '/laravel' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mailzhengbin-ops/coding_notes' }
    ]
  }
})
