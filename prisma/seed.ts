import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);
const prisma = new PrismaClient({ adapter });
const postsDirectory = path.join(process.cwd(), "content/posts");

function parseDate(value: unknown): Date {
  if (value instanceof Date) {
    return value;
  }
  return new Date(String(value));
}

async function main() {
  if (!fs.existsSync(postsDirectory)) {
    console.log("未找到 content/posts 目录，跳过导入。");
    return;
  }

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));

  for (const fileName of fileNames) {
    const slug = fileName.replace(/\.md$/, "");
    const fileContents = fs.readFileSync(
      path.join(postsDirectory, fileName),
      "utf8",
    );
    const { data, content } = matter(fileContents);

    await prisma.post.upsert({
      where: { slug },
      update: {
        title: data.title as string,
        description: data.description as string,
        date: parseDate(data.date),
        tags: (data.tags as string[]) ?? [],
        content,
      },
      create: {
        slug,
        title: data.title as string,
        description: data.description as string,
        date: parseDate(data.date),
        tags: (data.tags as string[]) ?? [],
        content,
      },
    });

    console.log(`已导入：${slug}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
