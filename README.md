# Blog

基于 Next.js、Tailwind CSS 和 shadcn/ui 搭建的个人博客。

## 技术栈

- [Next.js](https://nextjs.org/) — App Router
- [Tailwind CSS](https://tailwindcss.com/) — 样式
- [shadcn/ui](https://ui.shadcn.com/) — UI 组件
- Markdown — 文章内容

## 开发

```bash
npm install
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看博客。

## 写文章

在 `content/posts/` 目录下新建 `.md` 文件，使用 frontmatter 定义元信息：

```md
---
title: 文章标题
description: 文章摘要
date: 2026-05-29
tags: [标签1, 标签2]
---

正文内容...
```

## 构建

```bash
npm run build
npm start
```
