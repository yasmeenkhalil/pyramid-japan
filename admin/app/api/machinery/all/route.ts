import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    const maker = searchParams.get("maker") || "";
    
    const specId = searchParams.get("specId") || "";
    const specOperator = searchParams.get("specOp") || "";
    const specValue = searchParams.get("specVal") || "";

    const whereClause: any = {};

    if (categorySlug && categorySlug !== "all") {
      whereClause.category = {
        slug: categorySlug,
      };
    }

    if (search) {
      whereClause.OR = [
        { titleEn: { contains: search, mode: "insensitive" } },
        { titleAr: { contains: search, mode: "insensitive" } },
        { titleJa: { contains: search, mode: "insensitive" } },
        {
          manufacturer: {
            name: { contains: search, mode: "insensitive" }
          }
        }
      ];
    }

    if (maker) {
      whereClause.manufacturer = {
        name: { contains: maker, mode: "insensitive" },
      };
    }

    if (specId && specValue) {
      const cleanUserVal = specValue.replace(/,/g, "");
      const userNumericValue = parseFloat(cleanUserVal);

      if (!isNaN(userNumericValue)) {
        const allSpecRecords = await prisma.machinerySpecification.findMany({
          where: { specificationId: specId }
        });

        const matchingMachineryIds = allSpecRecords
          .filter((rec) => {
            const cleanDbVal = rec.value.replace(/,/g, "");
            const dbNumericValue = parseFloat(cleanDbVal);
            if (isNaN(dbNumericValue)) return false;

            if (specOperator === "gt") return dbNumericValue > userNumericValue;
            if (specOperator === "lt") return dbNumericValue < userNumericValue;
            return dbNumericValue === userNumericValue;
          })
          .map((rec) => rec.machineryId);

        whereClause.id = matchingMachineryIds.length > 0 ? { in: matchingMachineryIds } : { equals: "none-matched-id" };
      } else {
        whereClause.specifications = {
          some: {
            specificationId: specId,
            value: { contains: specValue, mode: "insensitive" }
          }
        };
      }
    }

    const machineryList = await prisma.machinery.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        images: true,
        category: true,
        manufacturer: true,
        specifications: {
          include: {
            specification: true,
            unit: true,
          },
        },
      },
    });

    return NextResponse.json(machineryList, { status: 200 });
  } catch (error) {
    console.error("Fetch All Machinery Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch filtered machinery due to a server error." },
      { status: 500 }
    );
  }
}
