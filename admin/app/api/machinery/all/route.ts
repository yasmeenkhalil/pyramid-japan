import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";
    const maker = searchParams.get("maker") || "";
    const sector = searchParams.get("sector") || ""; 
    const isExport = searchParams.get("export") || "";
    
    const specId = searchParams.get("specId") || "";
    const specOperator = searchParams.get("specOp") || "eq"; 
    const specValue = searchParams.get("specVal") || "";

    const andClauses: any[] = [];

    if (sector && sector !== "All Sectors") {
      andClauses.push({
        sector: { equals: sector } 
      });
    }

    if (categorySlug && categorySlug !== "all") {
      andClauses.push({
        category: {
          slug: categorySlug,
        }
      });
    }

    if (maker && maker !== "All Makers") {
      andClauses.push({
        manufacturer: {
          name: { contains: maker },
        }
      });
    }

    if (isExport === "true") {
      andClauses.push({
        isAvailableForExport: { equals: true }
      });
    }

    if (search) {
      andClauses.push({
        OR: [
          { titleEn: { contains: search } },
          { titleAr: { contains: search } },
          { titleJa: { contains: search } },
          { stockNo: { contains: search } }
        ]
      });
    }

    if (specId && specValue) {
      const cleanUserVal = specValue.replace(/,/g, "").trim();
      const userNumericValue = parseFloat(cleanUserVal);

      if (!isNaN(userNumericValue)) {
        const allSpecRecords = await prisma.machinerySpecification.findMany({
          where: { specificationId: specId }
        });

        const matchingMachineryIds = allSpecRecords
          .filter((rec) => {
            const cleanDbVal = rec.value.replace(/,/g, "").trim();
            const dbNumericValue = parseFloat(cleanDbVal);
            if (isNaN(dbNumericValue)) return false;

            if (specOperator === "gt") return dbNumericValue > userNumericValue;
            if (specOperator === "lt") return dbNumericValue < userNumericValue;
            return dbNumericValue === userNumericValue;
          })
          .map((rec) => rec.machineryId);

        andClauses.push({
          id: { in: matchingMachineryIds }
        });
      } else {
        andClauses.push({
          specifications: {
            some: {
              specificationId: specId,
              value: { contains: specValue }
            }
          }
        });
      }
    }

    const whereClause = andClauses.length > 0 ? { AND: andClauses } : {};

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
