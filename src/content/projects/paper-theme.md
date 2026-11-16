---
title: Paper 博客主题
slug: paper-theme
summary: 一个为长文阅读设计的 Astro 主题，克制的排版与可以读到底的正文。
date: 2024-11-12
cover: /covers/paper-theme.svg
tags: [开源, Astro]
featured: false
priority: 60
role: 独立开发
stack: [Astro, CSS, MDX]
highlights:
  - 零客户端脚本，构建产物以静态 HTML 为主
  - 覆盖文章、标签与归档三类内容页
  - 保持 100 分的 Lighthouse 可访问性评分
---

## 起点

做这个主题的原因很简单：我想给写作找一个足够安静、又不需要长期运维的容器。

许多博客主题把注意力放在首页动画上，而真正被反复阅读的是文章页。Paper 因此把大部分设计预算放在正文排版、行宽与层级上。

## 设计原则

- 正文行宽控制在 68 个字符左右
- 标题与正文使用同一套字族，只通过字重与字号区分
- 所有交互都有键盘可达的等价路径
- 页面不加载外部字体与统计脚本

## 实现

主题基于 Astro 的内容集合，文章、标签与归档都由 Markdown 自动生成。样式使用原生 CSS，没有引入框架。

```ts
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

## 结果

主题目前维护在个人仓库中，作为这个站点的基础。它不追求覆盖所有场景，但足够支撑长期写作。

## 后续计划

计划补上暗色模式与 RSS，仍然保持零客户端依赖。这两项已经在待办清单里放了很久，比起新增功能，我更想先把已有页面的细节打磨好。
