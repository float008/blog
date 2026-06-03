# Blog

个人博客，中英双语，支持后台写文章。

## 技术栈

Next.js 16 · React 19 · TypeScript · Tailwind CSS · shadcn/ui · next-intl · NextAuth · Prisma + PostgreSQL

## 开发

```bash
npm install
npm run db:generate
npm run dev
```

需要在 `.env` 配置 `DATABASE_URL`、GitHub OAuth 和 `ADMIN_GITHUB_LOGIN`。

## 写文章

登录 `/admin`（GitHub OAuth），在后台新建、编辑、删除文章。

## 个人信息

About 页内容在 `src/lib/site-config.ts` 修改。
