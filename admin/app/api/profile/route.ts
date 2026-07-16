import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, password } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const currentUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: session.user.email },
          { email: session.user.email.toLowerCase().trim() }
        ]
      }
    });

    if (!currentUser) {
      return NextResponse.json({ error: "Admin user not found in database." }, { status: 404 });
    }

    const emailExists = await prisma.user.findFirst({
      where: {
        email: email.trim(),
        NOT: { id: currentUser.id }, 
      },
    });

    if (emailExists) {
      return NextResponse.json({ error: "This email is already in use." }, { status: 400 });
    }

    const updateData: any = {
      name: name?.trim() || currentUser.name,
      email: email.trim(),
    };

    if (password && password.trim() !== "") {
      if (password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
      }
      updateData.password = await bcrypt.hash(password.trim(), 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: updateData,
    });

    return NextResponse.json({ 
      message: "Profile updated successfully!", 
      user: { name: updatedUser.name, email: updatedUser.email } 
    }, { status: 200 });

  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ error: "Failed to update profile due to a server error." }, { status: 500 });
  }
}
