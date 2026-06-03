# Blog

基于 Next.js、Tailwind CSS 和 shadcn/ui 搭建的个人博客。

## 技术栈

- [Next.js](https://nextjs.org/) — App Router
- [Tailwind CSS](https://tailwindcss.com/) — 样式
- [shadcn/ui](https://ui.shadcn.com/) — UI 组件
- [Prisma](https://www.prisma.io/) + PostgreSQL — 文章数据

## 开发

```bash
npm install
npm run db:generate   # 生成 Prisma Client
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看博客。

数据库连接通过 `.env` 中的 `DATABASE_URL` 配置（PostgreSQL）。

## 写文章

登录 `/admin` 后台，通过编辑器新建、编辑或删除文章，数据直接读写 PostgreSQL。

## 构建

```bash
npm run build
npm start
```
