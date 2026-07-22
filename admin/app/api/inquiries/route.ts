import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { partNo, machineModel, message, name, email, phone, type } = body;

    const currentType = type || "parts";

    const inquiryData: any = {
      type: currentType,
      message: message || "",
      name: name || "",
      email: email || "",
      phone: phone || "",
    };

    if (currentType === "parts") {
      if (!partNo || !machineModel) {
        return NextResponse.json(
          { message: "Part number and Machine model are required for parts inquiries" },
          { status: 400 }
        );
      }
      inquiryData.partNo = partNo;
      inquiryData.machineModel = machineModel;
    }

    const newInquiry = await prisma.inquiry.create({
      data: inquiryData,
    });

    const emailSubject = currentType === "parts" 
      ? ` New Parts Request: ${partNo}` 
      : ` New Fleet Inquiry`;

    const emailHtml = currentType === "parts"
      ? `
        <h3>New Spare Parts Inquiry</h3>
        <p><strong>Part Number / OEM Ref:</strong> ${partNo}</p>
        <p><strong>Machine Model & Brand:</strong> ${machineModel}</p>
        <p><strong>Additional Details:</strong> ${message || "None"}</p>
      `
      : `
        <h3>New General Inquiry</h3>
        <p><strong>Client Name:</strong> ${name || "N/A"}</p>
        <p><strong>Email:</strong> ${email || "N/A"}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong> ${message || "None"}</p>
      `;

   const result= await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "yasmeen_ka_sa@hotmail.com",
      subject: emailSubject,
      html: emailHtml,
    });

console.log(result);

    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (error) {
    console.error("Inquiry system error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { message: "Status is required" },
        { status: 400 }
      );
    }

    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedInquiry, { status: 200 });
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

    await prisma.inquiry.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Inquiry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
