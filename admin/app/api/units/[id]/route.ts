import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const { name } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: "Unit name is required" },
        { status: 400 }
      );
    }

    const cleanName = name.trim();

    const existingUnit = await prisma.unit.findFirst({
      where: {
        name: cleanName,
        NOT: { id },
      },
    });

    if (existingUnit) {
      return NextResponse.json(
        { message: "Unit name already exists" },
        { status: 400 }
      );
    }

    const updatedUnit = await prisma.unit.update({
      where: { id },
      data: { name: cleanName },
    });

    return NextResponse.json(updatedUnit, { status: 200 });
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

    await prisma.unit.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Unit deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
