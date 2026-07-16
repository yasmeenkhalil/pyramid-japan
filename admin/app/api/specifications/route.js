import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { nameAr, nameEn, nameJa, slug } = await request.json();

    if (!nameAr || !nameEn || !nameJa || !slug) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingSpec = await prisma.specification.findFirst({
      where: {
        OR: [{ nameEn }, { slug }],
      },
    });

    if (existingSpec) {
      return NextResponse.json(
        { message: "Specification name or slug already exists" },
        { status: 400 }
      );
    }

    const newSpec = await prisma.specification.create({
      data: { nameAr, nameEn, nameJa, slug },
    });

    return NextResponse.json(newSpec, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
