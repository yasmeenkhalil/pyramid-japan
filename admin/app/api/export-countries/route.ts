import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { nameAr, nameEn, nameJa, slug } = await request.json();

    if (!nameAr || !nameEn || !nameJa || !slug) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const existingCountry = await prisma.exportCountry.findFirst({
      where: { OR: [{ nameEn }, { slug }] },
    });

    if (existingCountry) {
      return NextResponse.json({ message: "Country name or slug already exists" }, { status: 400 });
    }

    const newCountry = await prisma.exportCountry.create({
      data: { nameAr, nameEn, nameJa, slug },
    });

    return NextResponse.json(newCountry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const countries = await prisma.exportCountry.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(countries, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
