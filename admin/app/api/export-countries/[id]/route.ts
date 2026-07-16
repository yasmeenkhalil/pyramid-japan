import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  console.log(params);
  
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    console.log(id);
    
    const { nameAr, nameEn, nameJa, slug } = await request.json();

    if (!nameAr || !nameEn || !nameJa || !slug) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingCountry = await prisma.exportCountry.findFirst({
      where: {
        OR: [{ nameEn }, { slug }],
        NOT: { id },
      },
    });

    if (existingCountry) {
      return NextResponse.json(
        { message: "Country name or slug already exists" },
        { status: 400 }
      );
    }

    const updatedCountry = await prisma.exportCountry.update({
      where: { id },
      data: { nameAr, nameEn, nameJa, slug },
    });

    return NextResponse.json(updatedCountry, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    await prisma.exportCountry.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Country deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
