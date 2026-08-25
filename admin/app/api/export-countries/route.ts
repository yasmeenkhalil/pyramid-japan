import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 1. تم إضافة nameRu لاستقبال حقل اسم الدولة بالروسية من الطلب القادم
    const { nameAr, nameEn, nameJa, nameRu, slug } = await request.json();

    // 2. تم إضافة حقل nameRu لشروط الحقول المطلوبة إجبارياً للتحقق
    if (!nameAr || !nameEn || !nameJa || !nameRu || !slug) {
      return NextResponse.json({ message: "All fields including Russian name are required" }, { status: 400 });
    }

    const nameRuStr = nameRu.trim();

    // 3. التحقق من أن حقل الروسية لا يحتوي على مسافات فقط
    if (!nameRuStr) {
      return NextResponse.json({ message: "Russian name cannot contain only spaces" }, { status: 400 });
    }

    // 4. فحص الأحرف السيريلية (الروسية) بنطاق اليونيكود الصريح والآمن لمنع مشاكل الـ TS Compiler
    if (!/^[\u0400-\u04FF0-9\s\-_,.:()]+$/.test(nameRuStr)) {
      return NextResponse.json({ message: "Russian name must contain Russian (Cyrillic) characters only" }, { status: 400 });
    }

    const existingCountry = await prisma.exportCountry.findFirst({
      where: { OR: [{ nameEn }, { slug }] },
    });

    if (existingCountry) {
      return NextResponse.json({ message: "Country name or slug already exists" }, { status: 400 });
    }

    // 5. حفظ الحقل الجديد في قاعدة البيانات عبر Prisma
    const newCountry = await prisma.exportCountry.create({
      data: { nameAr, nameEn, nameJa, nameRu: nameRuStr, slug },
    });

    return NextResponse.json(newCountry, { status: 201 });
  } catch (error) {
    console.error("Create Export Country Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // دالة findMany ستجلب حقول الدول بما فيها nameRu الجديد تلقائياً
    const countries = await prisma.exportCountry.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(countries, { status: 200 });
  } catch (error) {
    console.error("Fetch Export Countries Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
