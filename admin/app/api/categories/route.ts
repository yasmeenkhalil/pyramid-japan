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

interface CategoryRequestBody {
  nameEn?: string;
  nameAr?: string;
  nameJa?: string;
  imageUrl?: string;
  sector?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CategoryRequestBody;

    if (!body.nameEn || !body.nameAr || !body.nameJa || !body.imageUrl || !body.sector) {
      return Response.json(
        { error: "All fields including sector are required." },
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

    const category = await prisma.category.create({
      data: {
        nameEn: nameEnStr,
        nameAr: nameArStr,
        nameJa: nameJaStr,
        slug: categorySlug,
        imageUrl: imageUrlStr,
        sector: sectorStr,
      },
    });

    return Response.json(category, { status: 201 });
  } catch (error: unknown) {
    console.error("Prisma Error:", error);

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
      { error: "Failed to create category due to a server error." },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sector = searchParams.get("sector") || "";
    const sort = searchParams.get("sort") || "";

    const whereClause: any = {};
    if (sector) {
      whereClause.sector = { contains: sector };
    }

    let orderByClause: any = { nameEn: "asc" };
    if (sort === "za") {
      orderByClause = { nameEn: "desc" };
    }

    const categories = await prisma.category.findMany({
      where: whereClause,
      include: {
        _count: {
          select: { machinery: true }
        }
      },
      orderBy: orderByClause
    });

    return Response.json(categories, { status: 200 });
  } catch (error) {
    console.error("Fetch Categories Error:", error);
    return Response.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}


