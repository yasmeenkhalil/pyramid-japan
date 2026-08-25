import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    // 1. تم إضافة nameRu لاستقبل حقل الاسم بالروسية من الطلب القادم للتحديث
    const { nameAr, nameEn, nameJa, nameRu, slug } = await request.json();

    // 2. تم إضافة حقل nameRu لشروط الحقول المطلوبة إجبارياً للتحديث
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

    // 4. فحص الأحرف السيريلية (الروسية) بنطاق اليونيكود الصريح والآمن لمنع مشاكل الـ TS Compiler
    if (!/^[\u0400-\u04FF0-9\s\-_,.:()]+$/.test(nameRuStr)) {
      return NextResponse.json(
        { message: "Russian name must contain Russian (Cyrillic) characters only" },
        { status: 400 }
      );
    }

    const existingSpec = await prisma.specification.findFirst({
      where: {
        OR: [{ nameEn }, { slug }],
        NOT: { id },
      },
    });

    if (existingSpec) {
      return NextResponse.json(
        { message: "Specification name or slug already exists" },
        { status: 400 }
      );
    }

    // 5. تحديث الحقل الجديد في قاعدة البيانات عبر Prisma
    const updatedSpec = await prisma.specification.update({
      where: { id },
      data: { 
        nameAr, 
        nameEn, 
        nameJa, 
        nameRu: nameRuStr, // تمرير القيمة الروسية المحدثة للـ DB
        slug 
      },
    });

    return NextResponse.json(updatedSpec, { status: 200 });
  } catch (error) {
    console.error("Update Specification Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    await prisma.specification.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Specification deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Specification Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
