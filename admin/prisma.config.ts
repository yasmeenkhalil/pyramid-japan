
import { defineConfig, env } from 'prisma/config';
import 'dotenv/config'; // لتأكيد تحميل المتغيرات من ملف .env

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"), // قراءة الرابط ديناميكياً عند تشغيل أوامر Prisma
  },
});
