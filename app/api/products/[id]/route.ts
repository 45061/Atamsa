import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

// Helper function to upload image stream to Cloudinary
const uploadToCloudinary = (buffer: Uint8Array): Promise<any> => {
  return new Promise((resolve, reject) => {
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
    }).end(buffer);
  });
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const id = params.id;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const id = params.id;
    const formData = await request.formData();

    const updateData: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      if (key !== 'image' && key !== 'images') {
        updateData[key] = value;
      }
    });

    const newImageFile = formData.get("image") as File | null;
    if (newImageFile) {
      const buffer = await newImageFile.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const uploadResult = await uploadToCloudinary(bytes);
      updateData.image = (uploadResult as any).secure_url;
    }

    const newCarouselImageFiles = formData.getAll("images") as File[];
    let newCarouselImageUrls: string[] = [];
    if (newCarouselImageFiles.length > 0 && newCarouselImageFiles[0].size > 0) {
      for (const file of newCarouselImageFiles) {
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const uploadResult = await uploadToCloudinary(bytes);
        newCarouselImageUrls.push((uploadResult as any).secure_url);
      }
    }

    const existingImagesValue = formData.get("existingImages");
    const existingImages = existingImagesValue ? JSON.parse(existingImagesValue as string) : [];
    
    updateData.images = [...existingImages, ...newCarouselImageUrls];
    
    // Limpiar el campo que no es parte del esquema del producto
    delete updateData.existingImages;

    if (updateData.materials && typeof updateData.materials === 'string') {
      updateData.materials = JSON.parse(updateData.materials);
    }
    if (updateData.styles && typeof updateData.styles === 'string') {
      updateData.styles = JSON.parse(updateData.styles);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}