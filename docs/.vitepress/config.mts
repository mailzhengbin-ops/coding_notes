import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AI coding开发手册",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '杂项',
        items: [
          { text: '剪切板', link: '/markdown-examples' },
        ]
      },
      {
        text: 'Laravel',
        items: [
          { text: '项目搭建', link: '/laravel' },
          { text: '目录结构', link: '/markdown-examples' },
        ]
      },
      {
        text: 'Agent',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Laravel项目启动', link: '/laravel' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
