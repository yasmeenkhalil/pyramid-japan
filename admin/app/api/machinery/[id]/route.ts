import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function slugify(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\t\n\r_]+/g, "-") 
    .replace(/[^\p{L}\p{N}-]/gu, "") 
    .replace(/^-+|-+$/g, ""); 
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

interface MachineryUpdateRequestBody {
  titleEn?: string;
  titleAr?: string;
  titleJa?: string;
  stockNo?: string;
  year?: string | number;
  hour?: string | number;
  price?: string | number;
  location?: string;
  sector?: string; // 💡 تم إضافة حقل السيكتور هنا في الـ Interface الخاص بالتحديث
  minPrice?: string | number;
  avgPrice?: string | number;
  maxPrice?: string | number;
  descriptionEn?: string;
  descriptionAr?: string;
  descriptionJa?: string;
  featured?: boolean;
  categoryId?: string;
  manufacturerId?: string;
  specifications?: any[];
  images?: string[];
}

export async function GET(req: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const machinery = await prisma.machinery.findUnique({
      where: { id },
      include: {
        images: true,
        specifications: {
          include: {
            specification: true,
            unit: true,
          }
        },
        category: true,
        manufacturer: true,
      },
    });

    if (!machinery) {
      return Response.json(
        { error: "Machinery not found" },
        { status: 404 }
      );
    }

    return Response.json(machinery, { status: 200 });
  } catch (error) {
    console.error("Fetch Machinery Details Error:", error);
    return Response.json(
      { error: "Failed to fetch machinery details due to a server error." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const body = (await req.json()) as MachineryUpdateRequestBody;

    // 💡 تعديل شرط الفحص: تم إضافة body.sector ليكون إلزامياً (Mandatory) في عملية التحديث
    if (!body.titleEn || !body.titleAr || !body.titleJa || !body.categoryId || !body.manufacturerId || !body.location || !body.sector) {
      return Response.json(
        { error: "Core fields including titles, category, manufacturer, location, and sector are required." },
        { status: 400 }
      );
    }

    const titleEnStr = body.titleEn.trim();
    const titleArStr = body.titleAr.trim();
    const titleJaStr = body.titleJa.trim();
    const categoryIdStr = body.categoryId.trim();
    const manufacturerIdStr = body.manufacturerId.trim();
    const locationStr = body.location.trim();
    const sectorStr = body.sector.trim(); // 💡 تنظيف نص السيكتور المستقبل

    // 💡 منع تمرير حقل القطاع كمسافات فارغة
    if (!titleEnStr || !titleArStr || !titleJaStr || !categoryIdStr || !manufacturerIdStr || !locationStr || !sectorStr) {
      return Response.json(
        { error: "Required fields cannot contain only spaces." },
        { status: 400 }
      );
    }

    if (!/^[A-Za-z0-9\s\-_,.:()]+$/.test(titleEnStr)) {
      return Response.json(
        { error: "English title must contain English characters only." },
        { status: 400 }
      );
    }

    if (!/^[\u0600-\u06FF0-9\s\-_,.:()]+$/.test(titleArStr)) {
      return Response.json(
        { error: "Arabic title must contain Arabic characters only." },
        { status: 400 }
      );
    }
    
    let machinerySlug = slugify(titleEnStr);
    if (!machinerySlug) {
      machinerySlug = slugify(titleArStr) || `machinery-${Date.now()}`;
    }
    const uploadedImageUrls: string[] = [];
    if (body.images && Array.isArray(body.images)) {
      for (const img of body.images) {
        const trimmedImg = img.trim();
        if (trimmedImg.startsWith("data:image")) {
          try {
            const uploadResponse = await cloudinary.uploader.upload(trimmedImg, {
              folder: "machinery-images",
            });
            uploadedImageUrls.push(uploadResponse.secure_url);
          } catch (uploadError) {
            console.error("Cloudinary Upload Error:", uploadError);
            return Response.json(
              { error: "Failed to upload new images to the cloud." },
              { status: 500 }
            );
          }
        } else {
          uploadedImageUrls.push(trimmedImg);
        }
      }
    }

    const updatedMachinery = await prisma.$transaction(async (tx) => {
      await tx.machineryImage.deleteMany({
        where: { machineryId: id },
      });

      await tx.machinerySpecification.deleteMany({
        where: { machineryId: id },
      });

      return await tx.machinery.update({
        where: { id },
        data: {
          titleEn: titleEnStr,
          titleAr: titleArStr,
          titleJa: titleJaStr,
          slug: machinerySlug,
          stockNo: body.stockNo ? body.stockNo.trim() : null,
          year: body.year ? parseInt(body.year.toString()) : null,
          hour: body.hour ? parseInt(body.hour.toString()) : null,
          price: body.price ? parseFloat(body.price.toString()) : null,
          location: locationStr,
          sector: sectorStr, 
          minPrice: body.minPrice ? parseFloat(body.minPrice.toString()) : null,
          avgPrice: body.avgPrice ? parseFloat(body.avgPrice.toString()) : null,
          maxPrice: body.maxPrice ? parseFloat(body.maxPrice.toString()) : null,
          descriptionEn: body.descriptionEn ? body.descriptionEn.trim() : null,
          descriptionAr: body.descriptionAr ? body.descriptionAr.trim() : null,
          descriptionJa: body.descriptionJa ? body.descriptionJa.trim() : null,
          featured: Boolean(body.featured),
          categoryId: categoryIdStr,
          manufacturerId: manufacturerIdStr,
          images: {
            create: uploadedImageUrls.map((url: string) => ({
              imageUrl: url,
            })),
          },
          specifications: {
            create: body.specifications && Array.isArray(body.specifications)
              ? body.specifications.map((spec: any) => ({
                  specificationId: spec.specificationId,
                  value: spec.value.trim(),
                  unitId: spec.unitId && spec.unitId !== "" ? spec.unitId : null,
                }))
              : [],
          },
        },
        include: {
          images: true,
          specifications: true,
        },
      });
    });

    return Response.json(updatedMachinery, { status: 200 });
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
      { error: "Failed to update machinery due to a server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    await prisma.machinery.delete({
      where: { id },
    });

    return Response.json(
      { message: "Machinery deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return Response.json(
      { error: "Failed to delete machinery due to a server error." },
      { status: 500 }
    );
  }
}
