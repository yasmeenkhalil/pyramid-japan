import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1. تم إضافة nameRu لاستقبال حقل الاسم بالروسية من الطلب القادم
    const { nameAr, nameEn, nameJa, nameRu, slug } = await request.json();

    // 2. تم إضافة حقل nameRu لشروط الحقول المطلوبة إجبارياً للتحقق
    if (!nameAr || !nameEn || !nameJa || !nameRu || !slug) {
      return NextResponse.json(
        { message: "All fields including Russian name are required" },
        { status: 400 }
      );
    }

    // تنظيف المسافات للاسم الروسي
    const nameRuStr = nameRu.trim();

    // 3. التحقق من أن حقل الروسية لا يحتوي على مسافات فقط
    if (!nameRuStr) {
      return NextResponse.json(
        { message: "Russian name cannot contain only spaces" },
        { status: 400 }
      );
    }

    // 4. فحص الأحرف السيريلية (الروسية) بنطاق اليونيكود الصريح والآمن
    if (!/^[\u0400-\u04FF0-9\s\-_,.:()]+$/.test(nameRuStr)) {
      return NextResponse.json(
        { message: "Russian name must contain Russian (Cyrillic) characters only" },
        { status: 400 }
      );
    }

    const existingSpec = await prisma.specification.findFirst({
      where: {
        OR: [{ nameEn }, { slug }],
      },
    });

    if (existingSpec) {
      return NextResponse.json(
        { message: "Specification name or slug already exists" },
        { status: 400 }
      );
    }

    const newSpec = await prisma.specification.create({
      data: { 
        nameAr, 
        nameEn, 
        nameJa, 
        nameRu: nameRuStr, 
        slug 
      },
    });

    return NextResponse.json(newSpec, { status: 201 });
  } catch (error) {
    console.error("Create Specification Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
