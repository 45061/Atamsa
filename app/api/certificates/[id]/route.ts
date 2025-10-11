import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Certificate from "@/models/Certificate";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = params;
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return NextResponse.json(
        { message: "Certificate not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(certificate);
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return NextResponse.json(
      { message: "Error fetching certificate" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = params;
    await Certificate.findByIdAndDelete(id);
    return NextResponse.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    console.error("Error deleting certificate:", error);
    return NextResponse.json(
      { message: "Error deleting certificate" },
      { status: 500 }
    );
  }
}
