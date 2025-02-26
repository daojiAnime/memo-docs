import { defineConfig } from 'vitepress'
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MemoMate",
  description: "MemoMate Documents",
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '示例', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '示例',
        items: [
          { text: 'Markdown 示例', link: '/markdown' },
        ]
      },
      {
        text: '部署文档',
        items: [
          { text: '部署', link: '/api-docs' },
        ]
      },
      {
        text: 'API文档',
        items: [
          { text: 'API文档', link: '/api-docs' }
        ]
      },
      {
        text: '开发文档',
        items: [
          { text: '前端镜像构建文档', link: '/develop/frontend-image' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/STARTERLanG/MemoMate' }
    ],
    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: '大纲'
    },

    lastUpdated: {
      text: '最后更新时间',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short'
      }
    },
    docFooter: { 
      prev: '上一页', 
      next: '下一页', 
    }, 
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
  },
  markdown: {
    // 开启图片懒加载
    image: {
      lazyLoading: true
    },
    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    lineNumbers: true,
    // 组件插入h1标题下
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options)
        if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`
        return htmlResult
      },

      md.use(groupIconMdPlugin) //代码组图标
      md.use(markdownItTaskCheckbox) //todo

    }
  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          ts: localIconLoader(import.meta.url, '../public/svg/typescript.svg'), //本地ts图标导入
          md: localIconLoader(import.meta.url, '../public/svg/md.svg'), //markdown图标
          css: localIconLoader(import.meta.url, '../public/svg/css.svg'), //css图标
          js: 'logos:javascript', //js图标
        },
      }),
    ],
  },
})
