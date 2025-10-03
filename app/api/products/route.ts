import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newProduct = new Product(body);
    const savedProduct = await newProduct.save();
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Error creating product" }, { status: 500 });
  }
}
