import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    const machineryList = await prisma.machinery.findMany({
      include: {
        category: true,
        manufacturer: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const excelData = machineryList.map((item) => ({
      "Stock No": item.stockNo || "N/A",
      "Title": item.titleEn || "",
      "Category": item.category?.nameEn || "N/A",
      "Manufacturer": item.manufacturer?.name || "N/A",
      "Sector": item.sector || "N/A",
      "Year": item.year || "N/A",
      "Hours": item.hour || 0,
      "Price (JPY)": item.price ? Number(item.price) : "Ask Price",
      "Location": item.location || "N/A",
      "Description": item.descriptionEn || "No description available",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Machinery Stock");

    const excelBase64 = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });
    const buffer = Buffer.from(excelBase64, "base64");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="Pyramid_Japan_Stock_List.xlsx"',
      },
    });

  } catch (error) {
    console.error("Export Excel Error:", error);
    return NextResponse.json(
      { error: "Failed to export stock list due to a server error." },
      { status: 500 }
    );
  }
}
