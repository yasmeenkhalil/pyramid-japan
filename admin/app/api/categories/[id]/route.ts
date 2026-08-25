import { prisma } from "@/lib/prisma";

function slugify(text: string): string {
  if (!text) return "";
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\t\n\r_]+/g, "-") 
    .replace(/[^\p{L}\p{N}-]/gu, "") 
    .replace(/^-+|-+$/g, ""); 
}

interface CategoryUpdateBody {
  nameEn?: string;
  nameAr?: string;
  nameJa?: string;
  nameRu?: string; // 1. إضافة حقل الاسم بالروسية للـ Interface الخاص بالتعديل
  imageUrl?: string;
  sector?: string;
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.category.delete({
      where: { id },
    });

    return Response.json({ success: true });
  } catch (error: unknown) {
    console.error("Delete Error:", error);
    return Response.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await req.json()) as CategoryUpdateBody;

    // 2. التحقق من وجود حقل nameRu ضمن الحقول الإلزامية للتحديث
    if (!body.nameEn || !body.nameAr || !body.nameJa || !body.nameRu || !body.imageUrl || !body.sector) {
      return Response.json(
        { error: "All fields including Russian name are required for updating." },
        { status: 400 }
      );
    }

    const nameEnStr = body.nameEn.trim();
    const nameArStr = body.nameAr.trim();
    const nameJaStr = body.nameJa.trim();
    const nameRuStr = body.nameRu.trim(); // تنظيف المسافات للاسم الروسي
    const imageUrlStr = body.imageUrl.trim();
    const sectorStr = body.sector.trim();

    // 3. التأكد من أن الحقل الروسي لا يحتوي على مسافات فقط
    if (!nameEnStr || !nameArStr || !nameJaStr || !nameRuStr || !imageUrlStr || !sectorStr) {
      return Response.json(
        { error: "Fields cannot contain only spaces." },
        { status: 400 }
      );
    }

    if (!/^[A-Za-z0-9\s\-_,.:()]+$/.test(nameEnStr)) {
      return Response.json(
        { error: "English name must contain English characters only." },
        { status: 400 }
      );
    }

    if (!/^[\u0600-\u06FF0-9\s\-_,.:()]+$/.test(nameArStr)) {
      return Response.json(
        { error: "Arabic name must contain Arabic characters only." },
        { status: 400 }
      );
    }

    // 4. فحص الأحرف السيريلية (الروسية) بنطاق اليونيكود الصريح والآمن لمنع مشاكل الـ TS Compiler
    if (!/^[\u0400-\u04FF0-9\s\-_,.:()]+$/.test(nameRuStr)) {
      return Response.json(
        { error: "Russian name must contain Russian (Cyrillic) characters only." },
        { status: 400 }
      );
    }

    let categorySlug = slugify(nameEnStr);
    if (!categorySlug) {
      categorySlug = slugify(nameArStr) || `category-${Date.now()}`;
    }

    // 5. تحديث الحقل الجديد في قاعدة البيانات عبر Prisma
    const category = await prisma.category.update({
      where: { id },
      data: {
        nameEn: nameEnStr,
        nameAr: nameArStr,
        nameJa: nameJaStr,
        nameRu: nameRuStr, // تمرير القيمة الروسية المحدثة للـ DB
        slug: categorySlug,
        imageUrl: imageUrlStr,
        sector: sectorStr,
      },
    });

    return Response.json(category);
  } catch (error: unknown) {
    console.error("Update Error:", error);

    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string };
      if (prismaError.code === 'P2002') {
        return Response.json(
          { error: "A category with this name or slug already exists." },
          { status: 400 }
        );
      }
    }

    return Response.json(
      { error: "Failed to update category due to a server error." },
      { status: 500 }
    );
  }
}
