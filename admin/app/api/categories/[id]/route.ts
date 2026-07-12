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

    if (!body.nameEn || !body.nameAr || !body.nameJa || !body.imageUrl || !body.sector) {
      return Response.json(
        { error: "All fields are required for updating." },
        { status: 400 }
      );
    }

    const nameEnStr = body.nameEn.trim();
    const nameArStr = body.nameAr.trim();
    const nameJaStr = body.nameJa.trim();
    const imageUrlStr = body.imageUrl.trim();
    const sectorStr = body.sector.trim();

    if (!nameEnStr || !nameArStr || !nameJaStr || !imageUrlStr || !sectorStr) {
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

    let categorySlug = slugify(nameEnStr);
    if (!categorySlug) {
      categorySlug = slugify(nameArStr) || `category-${Date.now()}`;
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        nameEn: nameEnStr,
        nameAr: nameArStr,
        nameJa: nameJaStr,
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
