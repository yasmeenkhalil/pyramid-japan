import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
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
        NOT: { id },
      },
    });

    if (existingSpec) {
      return NextResponse.json(
        { message: "Specification name or slug already exists" },
        { status: 400 }
      );
    }

    const updatedSpec = await prisma.specification.update({
      where: { id },
      data: { nameAr, nameEn, nameJa, slug },
    });

    return NextResponse.json(updatedSpec, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    await prisma.specification.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Specification deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
