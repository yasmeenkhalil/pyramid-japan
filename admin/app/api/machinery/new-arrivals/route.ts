import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const manufacturer = searchParams.get("manufacturer") || "";

    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { titleEn: { contains: search, mode: "insensitive" } },
        { titleAr: { contains: search, mode: "insensitive" } },
        { titleJa: { contains: search, mode: "insensitive" } },
        { model: { contains: search, mode: "insensitive" } },
      ];
    }

    if (category) {
      whereClause.categoryId = category;
    }

    if (manufacturer) {
      whereClause.manufacturerId = manufacturer;
    }

    const newArrivals = await prisma.machinery.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return NextResponse.json(newArrivals, { status: 200 });
  } catch (error) {
    console.error("Fetch New Arrivals Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch new arrivals" },
      { status: 500 }
    );
  }
}
