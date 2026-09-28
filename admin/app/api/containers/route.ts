import { prisma } from "@/lib/prisma";

interface ContainerRequestBody {
  titleEn?: string;
  titleAr?: string;
  titleJa?: string;
  titleRu?: string;
  imageUrl?: string;
  exportCountryId?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContainerRequestBody;

    if (!body.imageUrl) {
      return Response.json(
        { error: "Container image is required." },
        { status: 400 }
      );
    }

    const imageUrlStr = body.imageUrl.trim();
    const titleEnStr = body.titleEn?.trim() || "";
    const titleArStr = body.titleAr?.trim() || "";
    const titleJaStr = body.titleJa?.trim() || "";
    const titleRuStr = body.titleRu?.trim() || "";
    const exportCountryIdStr = body.exportCountryId?.trim() || null;

    if (!imageUrlStr) {
      return Response.json(
        { error: "Image URL cannot contain only spaces." },
        { status: 400 }
      );
    }

    // 🟢 تم إزالة التحقق من نوع الأحرف للغات (العربية والإنجليزية والروسية)

    const container = await prisma.containerImage.create({
      data: {
        titleEn: titleEnStr || null,
        titleAr: titleArStr || null,
        titleJa: titleJaStr || null,
        titleRu: titleRuStr || null,
        imageUrl: imageUrlStr,
        exportCountryId: exportCountryIdStr,
      },
    });

    return Response.json(container, { status: 201 });
  } catch (error: unknown) {
    console.error("Prisma Error:", error);
    return Response.json(
      { error: "Failed to create container image due to a server error." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const countryId = searchParams.get("exportCountryId")?.trim() || "";

    const whereClause: any = {};
    if (countryId) {
      whereClause.exportCountryId = countryId;
    }

    const containers = await prisma.containerImage.findMany({
      where: whereClause,
      include: {
        exportCountry: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(containers, { status: 200 });
  } catch (error) {
    console.error("Fetch Containers Error:", error);
    return Response.json({ error: "Failed to fetch container images" }, { status: 500 });
  }
}
