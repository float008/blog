# 运行时镜像：仅装载 Next.js standalone 构建产物
# 完整的依赖安装与 next build 在 CI 中完成，这里只负责打包成最小可运行镜像
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

# 使用非 root 用户运行
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# standalone 已经把所需 node_modules + server.js 一起打好
COPY --chown=nextjs:nodejs .next/standalone ./
# 静态资源与 public 不会自动打进 standalone，需要单独复制
COPY --chown=nextjs:nodejs .next/static ./.next/static
COPY --chown=nextjs:nodejs public ./public

# Next.js standalone 会把根目录 .env 复制进来，必须清除以免敏感信息泄露
# 运行时通过容器环境变量注入配置
RUN rm -f .env .env.local .env.production .env.production.local

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
