import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import PDFDocument from "pdfkit";
import sharp from "sharp";

export const runtime = "nodejs";

const PAGE_WIDTH = 842; 
const PAGE_HEIGHT = 595;

const MARGIN = 30;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const ROW_HEIGHT = 42;
const HEADER_HEIGHT = 48;

const columns = [
  { key: "stockNo", label: "Stock No", width: 70 },
  { key: "title", label: "Title", width: 170 },
  { key: "category", label: "Category", width: 100 },
  { key: "manufacturer", label: "Manufacturer", width: 100 },
  { key: "sector", label: "Sector", width: 80 },
  { key: "year", label: "Year", width: 50 },
  { key: "hours", label: "Hours", width: 60 },
  { key: "price", label: "Price (JPY)", width: 90 },
  { key: "location", label: "Location", width: 92 },
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncateText(
  value: string,
  maxLength: number
): string {
  if (!value) return "";
  if (value.length <= maxLength) return value;

  return value.substring(0, maxLength - 3) + "...";
}

function createPageSvg(
  rows: Record<string, string>[],
  pageNumber: number,
  totalPages: number
) {
  const tableX = MARGIN;
  const tableY = 82;

  const tableWidth = columns.reduce(
    (sum, column) => sum + column.width,
    0
  );

  const height =
    tableY +
    HEADER_HEIGHT +
    rows.length * ROW_HEIGHT +
    55;

  let svg = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="${PAGE_WIDTH}"
    height="${Math.max(height, PAGE_HEIGHT)}"
    viewBox="0 0 ${PAGE_WIDTH} ${Math.max(height, PAGE_HEIGHT)}"
  >

    <rect
      x="0"
      y="0"
      width="${PAGE_WIDTH}"
      height="${Math.max(height, PAGE_HEIGHT)}"
      fill="#ffffff"
    />

    <!-- Header -->
    <text
      x="${MARGIN}"
      y="35"
      font-family="Arial, Helvetica, sans-serif"
      font-size="22"
      font-weight="700"
      fill="#111827"
    >
      Pyramid Japan
    </text>

    <text
      x="${MARGIN}"
      y="58"
      font-family="Arial, Helvetica, sans-serif"
      font-size="11"
      fill="#6b7280"
    >
      Global Machinery Stock List
    </text>

    <text
      x="${PAGE_WIDTH - MARGIN}"
      y="35"
      text-anchor="end"
      font-family="Arial, Helvetica, sans-serif"
      font-size="11"
      fill="#6b7280"
    >
      Stock List
    </text>

    <text
      x="${PAGE_WIDTH - MARGIN}"
      y="53"
      text-anchor="end"
      font-family="Arial, Helvetica, sans-serif"
      font-size="10"
      fill="#9ca3af"
    >
      Page ${pageNumber} / ${totalPages}
    </text>

    <!-- Table background -->
    <rect
      x="${tableX}"
      y="${tableY}"
      width="${tableWidth}"
      height="${HEADER_HEIGHT + rows.length * ROW_HEIGHT}"
      rx="5"
      fill="#ffffff"
      stroke="#d1d5db"
      stroke-width="1"
    />

    <!-- Table Header -->
    <rect
      x="${tableX}"
      y="${tableY}"
      width="${tableWidth}"
      height="${HEADER_HEIGHT}"
      fill="#f3f4f6"
    />
  `;

  // Header columns
  let currentX = tableX;

  columns.forEach((column, index) => {
    if (index > 0) {
      svg += `
        <line
          x1="${currentX}"
          y1="${tableY}"
          x2="${currentX}"
          y2="${tableY + HEADER_HEIGHT + rows.length * ROW_HEIGHT}"
          stroke="#e5e7eb"
          stroke-width="1"
        />
      `;
    }

    svg += `
      <text
        x="${currentX + column.width / 2}"
        y="${tableY + 29}"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="10"
        font-weight="700"
        fill="#374151"
      >
        ${escapeXml(column.label)}
      </text>
    `;

    currentX += column.width;
  });

  // Rows
  rows.forEach((row, rowIndex) => {
    const rowY =
      tableY + HEADER_HEIGHT + rowIndex * ROW_HEIGHT;

    if (rowIndex % 2 === 1) {
      svg += `
        <rect
          x="${tableX}"
          y="${rowY}"
          width="${tableWidth}"
          height="${ROW_HEIGHT}"
          fill="#fafafa"
        />
      `;
    }

    svg += `
      <line
        x1="${tableX}"
        y1="${rowY}"
        x2="${tableX + tableWidth}"
        y2="${rowY}"
        stroke="#e5e7eb"
        stroke-width="1"
      />
    `;

    let cellX = tableX;

    columns.forEach((column) => {
      const rawValue = row[column.key] || "";
      const value = truncateText(rawValue, 22);

      svg += `
        <text
          x="${cellX + 6}"
          y="${rowY + 26}"
          font-family="Arial, Helvetica, sans-serif"
          font-size="9"
          fill="#374151"
        >
          ${escapeXml(value)}
        </text>
      `;

      cellX += column.width;
    });
  });

  // Footer
  const footerY =
    tableY +
    HEADER_HEIGHT +
    rows.length * ROW_HEIGHT +
    28;

  svg += `
    <text
      x="${MARGIN}"
      y="${footerY}"
      font-family="Arial, Helvetica, sans-serif"
      font-size="9"
      fill="#9ca3af"
    >
      Generated by Pyramid Japan
    </text>

    <text
      x="${PAGE_WIDTH - MARGIN}"
      y="${footerY}"
      text-anchor="end"
      font-family="Arial, Helvetica, sans-serif"
      font-size="9"
      fill="#9ca3af"
    >
      For reference purposes only
    </text>

  </svg>
  `;

  return svg;
}

async function svgToPng(svg: string) {
  return await sharp(Buffer.from(svg))
    .png()
    .toBuffer();
}

function createPdf(pageImages: Buffer[]): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: [PAGE_WIDTH, PAGE_HEIGHT],
      layout: "landscape",
      margin: 0,
      autoFirstPage: false,
      compress: true,
    });

    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    doc.on("error", (error: Error) => {
      reject(error);
    });

    for (const image of pageImages) {
      doc.addPage({
        size: [PAGE_WIDTH, PAGE_HEIGHT],
        margin: 0,
      });

      doc.image(image, 0, 0, {
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
      });
    }

    doc.end();
  });
}

export async function GET() {
  try {
    const machineryList =
      await prisma.machinery.findMany({
        include: {
          category: true,
          manufacturer: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    const stockData = machineryList.map((item) => ({
      stockNo: item.stockNo || "N/A",

      title:
        item.titleEn ||
        "No title available",

      category:
        item.category?.nameEn ||
        "N/A",

      manufacturer:
        item.manufacturer?.name ||
        "N/A",

      sector:
        item.sector ||
        "N/A",

      year:
        item.year
          ? String(item.year)
          : "N/A",

      hours:
        item.hour !== null &&
        item.hour !== undefined
          ? String(item.hour)
          : "N/A",

      price:
        item.price
          ? Number(item.price).toLocaleString("en-US")
          : "Ask Price",

      location:
        item.location ||
        "N/A",
    }));

    /*
     * 9 items per page.
     *
     * The actual PDF page contains an image.
     * Therefore the PDF does not contain editable
     * Excel-like cells or normal text objects.
     */
    const ROWS_PER_PAGE = 10;

    const totalPages = Math.max(
      1,
      Math.ceil(
        stockData.length / ROWS_PER_PAGE
      )
    );

    const pageImages: Buffer[] = [];

    for (
      let page = 0;
      page < totalPages;
      page++
    ) {
      const start =
        page * ROWS_PER_PAGE;

      const pageRows =
        stockData.slice(
          start,
          start + ROWS_PER_PAGE
        );

      const svg = createPageSvg(
        pageRows,
        page + 1,
        totalPages
      );

      const png = await svgToPng(svg);

      pageImages.push(png);
    }

    const pdfBuffer =
      await createPdf(pageImages);

    return new NextResponse(
      pdfBuffer as any,
      {
        status: 200,
        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            'attachment; filename="Pyramid_Japan_Stock_List.pdf"',

          "Content-Length":
            String(pdfBuffer.length),

          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "Export PDF Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to export stock list as PDF.",
      },
      {
        status: 500,
      }
    );
  }
}