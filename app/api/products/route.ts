import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    let query = {};

    if (category) {
      if (category.toLowerCase() === 'joyería' || category.toLowerCase() === 'joyeria') {
        query = {
          $or: [
            { category: { $regex: '^joyeria$', $options: 'i' } },
            { category: { $regex: '^joyería$', $options: 'i' } }
          ]
        };
      } else {
        query = { category: { $regex: `^${category}$`, $options: 'i' } };
      }
    }

    const products = await Product.find(query);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const originalPrice = formData.get("originalPrice") as string;
    const category = formData.get("category") as string;
    const badge = formData.get("badge") as string;
    const badgeColor = formData.get("badgeColor") as string;
    const description = formData.get("description") as string;
    const rating = formData.get("rating") as string;
    const reviews = formData.get("reviews") as string;
    const materials = formData.get("materials") as string;
    const styles = formData.get("styles") as string;
    const subcategory = formData.get("subcategory") as string;

    if (!image) {
      return NextResponse.json({ message: "Image is required" }, { status: 400 });
    }

    const buffer = await image.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        folder: "tiendarecuerdoscolombia",
        transformation: [
          { width: 800, height: 800, crop: "limit" },
          { quality: "auto:good" },
          { fetch_format: "auto" }
        ]
      }, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }).end(bytes);
    });

    const imageUrl = (uploadResult as any).secure_url;

    const newProduct = new Product({
      name,
      price,
      originalPrice,
      category,
      subcategory,
      image: imageUrl,
      badge,
      badgeColor,
      description,
      rating: Number(rating),
      reviews: Number(reviews),
      materials: materials ? JSON.parse(materials) : [],
      styles: styles ? JSON.parse(styles) : [],
    });

    const savedProduct = await newProduct.save();
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Error creating product" }, { status: 500 });
  }
}