import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AI coding开发手册",
  description: "A VitePress Site",
  themeConfig: {
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
          { text: '项目搭建', link: '/laravel' },
          { text: '目录结构', link: '/markdown-examples' },
          { text: '部署上线', link: '/deployment' },
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
