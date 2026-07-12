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

interface MachineryUpdateBody {
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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.machinery.delete({
      where: { id },
    });

    return Response.json({ success: true });
  } catch (error: unknown) {
    console.error("Delete Machinery Error:", error);
    return Response.json(
      { error: "Failed to delete machinery" },
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
    const body = (await req.json()) as MachineryUpdateBody;

    if (!body.titleEn || !body.titleAr || !body.titleJa || !body.categoryId || !body.images) {
      return Response.json(
        { error: "Titles, category, and images array are required for updating." },
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

    await prisma.machineryImage.deleteMany({
      where: { machineryId: id },
    });

    const machinery = await prisma.machinery.update({
      where: { id },
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

    return Response.json(machinery);
  } catch (error: unknown) {
    console.error("Update Machinery Error:", error);

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
      { error: "Failed to update machinery due to a server error." },
      { status: 500 }
    );
  }
}
