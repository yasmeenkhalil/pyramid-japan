import { prisma } from "@/lib/prisma";

interface ContainerUpdateBody {
  titleEn?: string;
  titleAr?: string;
  titleJa?: string;
  titleRu?: string;
  imageUrl?: string;
  exportCountryId?: string;
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await req.json()) as ContainerUpdateBody;

    if (!body.imageUrl) {
      return Response.json(
        { error: "Container image is required for updating." },
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
        { error: "Fields cannot contain only spaces." },
        { status: 400 }
      );
    }

    // 🟢 تم إزالة التحقق من نوع الأحرف للغات هنا أيضاً

    const updatedContainer = await prisma.containerImage.update({
      where: { id },
      data: {
        titleEn: titleEnStr || null,
        titleAr: titleArStr || null,
        titleJa: titleJaStr || null,
        titleRu: titleRuStr || null,
        imageUrl: imageUrlStr,
        exportCountryId: exportCountryIdStr,
      },
    });

    return Response.json(updatedContainer);
  } catch (error: unknown) {
    console.error("Update Container Error:", error);
    return Response.json(
      { error: "Failed to update container due to a server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.containerImage.delete({
      where: { id },
    });

    return Response.json({ success: true });
  } catch (error: unknown) {
    console.error("Delete Container Error:", error);
    return Response.json(
      { error: "Failed to delete container image" },
      { status: 500 }
    );
  }
}
