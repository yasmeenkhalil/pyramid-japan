import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const { name, slug } = await request.json();

    if (!name || !slug) {
      return NextResponse.json(
        { message: "Name and Slug are required" },
        { status: 400 }
      );
    }

    const existingManufacturer = await prisma.manufacturer.findFirst({
      where: {
        OR: [{ name }, { slug }],
        NOT: { id },
      },
    });

    if (existingManufacturer) {
      return NextResponse.json(
        { message: "Manufacturer name or slug already exists" },
        { status: 400 }
      );
    }

    const updatedManufacturer = await prisma.manufacturer.update({
      where: { id },
      data: { name, slug },
    });

    return NextResponse.json(updatedManufacturer, { status: 200 });
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

    await prisma.manufacturer.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Manufacturer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
