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

interface MachineryRequestBody {
  titleEn?: string;
  titleAr?: string;
  titleJa?: string;
  stockNo?: string;
  year?: number;
  hour?: number;
  price?: number;
  descriptionEn?: string;
  descriptionAr?: string;
  descriptionJa?: string;
  featured?: boolean;
  categoryId?: string;
  images?: string[];
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as MachineryRequestBody;

    if (!body.titleEn || !body.titleAr || !body.titleJa || !body.categoryId || !body.images || body.images.length === 0) {
      return Response.json(
        { error: "Titles in all languages, category, and at least one image are required." },
        { status: 400 }
      );
    }

    const titleEnStr = body.titleEn.trim();
    const titleArStr = body.titleAr.trim();
    const titleJaStr = body.titleJa.trim();

    if (!titleEnStr || !titleArStr || !titleJaStr) {
      return Response.json(
        { error: "Titles cannot contain only spaces." },
        { status: 400 }
      );
    }

    let machinerySlug = slugify(titleEnStr);
    if (!machinerySlug) {
      machinerySlug = slugify(titleArStr) || `machinery-${Date.now()}`;
    }

    const categoryExists = await prisma.category.findUnique({
      where: { id: body.categoryId },
    });

    if (!categoryExists) {
      return Response.json(
        { error: "The specified category does not exist." },
        { status: 400 }
      );
    }

    const machinery = await prisma.machinery.create({
      data: {
        titleEn: titleEnStr,
        titleAr: titleArStr,
        titleJa: titleJaStr,
        slug: machinerySlug,
        stockNo: body.stockNo?.trim() || null,
        year: body.year ? Number(body.year) : null,
        hour: body.hour ? Number(body.hour) : null,
        price: body.price ? Number(body.price) : null,
        descriptionEn: body.descriptionEn?.trim() || null,
        descriptionAr: body.descriptionAr?.trim() || null,
        descriptionJa: body.descriptionJa?.trim() || null,
        featured: !!body.featured,
        categoryId: body.categoryId,
        images: {
          create: body.images.map((url: string) => ({
            imageUrl: url,
          })),
        },
      },
      include: {
        images: true,
      },
    });

    return Response.json(machinery, { status: 201 });
  } catch (error: unknown) {
    console.error("Prisma Error:", error);

    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string };
      if (prismaError.code === 'P2002') {
        return Response.json(
          { error: "A machinery item with this title or slug already exists." },
          { status: 400 }
        );
      }
    }

    return Response.json(
      { error: "Failed to create machinery due to a server error." },
      { status: 500 }
    );
  }
}
