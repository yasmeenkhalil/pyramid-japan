import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Please provide all fields." }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json({ message: "This email is already registered." }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // إنشاء الحساب مع إجبار الـ role أن يكون "user" بشكل صريح وآمن
    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "user" // حماية الهيكلية وتعيينه كمستخدم عادي دائماً
      },
    });

    return NextResponse.json(
      {
        message: "User registered successfully.",
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
}
