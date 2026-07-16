import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: "Unit name is required" },
        { status: 400 }
      );
    }

    const cleanName = name.trim();

    const existingUnit = await prisma.unit.findUnique({
      where: { name: cleanName },
    });

    if (existingUnit) {
      return NextResponse.json(
        { message: "Unit name already exists" },
        { status: 400 }
      );
    }

    const newUnit = await prisma.unit.create({
      data: { name: cleanName },
    });

    return NextResponse.json(newUnit, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
