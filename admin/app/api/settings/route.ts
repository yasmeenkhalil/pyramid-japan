import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const keys = ["countries_count", "experience_years", "machines_count"];
    
    let settings = await prisma.setting.findMany({
      where: { key: { in: keys } }
    });

    if (settings.length === 0) {
      await prisma.setting.createMany({
        data: [
          { key: "countries_count", value: "50" },
          { key: "experience_years", value: "20" },
          { key: "machines_count", value: "1000" }
        ]
      });
      settings = await prisma.setting.findMany({ where: { key: { in: keys } } });
    }

    const settingsMap = settings.reduce((acc: Record<string, string>, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    return NextResponse.json(settingsMap, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { countries_count, experience_years, machines_count } = await request.json();

    if (countries_count) await prisma.setting.update({ where: { key: "countries_count" }, data: { value: String(countries_count) } });
    if (experience_years) await prisma.setting.update({ where: { key: "experience_years" }, data: { value: String(experience_years) } });
    if (machines_count) await prisma.setting.update({ where: { key: "machines_count" }, data: { value: String(machines_count) } });

    return NextResponse.json({ message: "Settings updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
