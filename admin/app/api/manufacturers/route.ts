import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
  try {
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
      },
    });

    if (existingManufacturer) {
      return NextResponse.json(
        { message: "Manufacturer name or slug already exists" },
        { status: 400 }
      );
    }

    const newManufacturer = await prisma.manufacturer.create({
      data: { name, slug },
    });

    return NextResponse.json(newManufacturer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const manufacturers = await prisma.manufacturer.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(manufacturers, { status: 200 });
  } catch (error) {
    console.error("Fetch Manufacturers Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch manufacturers due to a server error." },
      { status: 500 }
    );
  }
}


