import { NextResponse } from "next/server";
import prisma from "@/app/prisma"; // Adjust the path to your Prisma client
import { hash } from "bcrypt";

export async function POST(request: Request) {
  const { email, password, firstName, lastName } = await request.json();

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
      },
    });

    return NextResponse.json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
