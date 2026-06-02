---
title: Next.js 入门指南
description: 快速了解 Next.js App Router 的核心概念。
date: 2026-05-28
locale: zh
tags: [Next.js, 教程]
---

Next.js 是一个基于 React 的全栈框架，适合构建博客、官网和 Web 应用。

## App Router

App Router 使用 `app` 目录组织路由，每个文件夹对应一个 URL 路径。

## 服务端组件

默认情况下，组件在服务端渲染，可以减少客户端 JavaScript 体积，提升首屏性能。

## 静态生成

博客文章可以在构建时预渲染，部署后访问速度更快。

```tsx
export default function Page() {
  return <h1>Hello Blog</h1>;
}
```

继续探索，构建属于你的博客吧。
