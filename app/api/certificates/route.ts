import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Certificate from "@/models/Certificate";
import cloudinary from "@/lib/cloudinary";

// Helper function to upload a single file to Cloudinary
async function uploadFileToCloudinary(file: File): Promise<string> {
  console.log(`Uploading file: ${file.name}, size: ${file.size}, type: ${file.type}`);

  if (file.size === 0) {
    throw new Error(`Cannot upload empty file: ${file.name}`);
  }

  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "certificates_atamsa",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        if (result) {
          console.log(`Successfully uploaded ${file.name}, URL: ${result.secure_url}`);
          return resolve(result.secure_url);
        }
        return reject(new Error("Cloudinary upload result is undefined"));
      }
    );
    uploadStream.end(bytes);
  });
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const formData = await request.formData();

    // --- File Uploads ---
    const fileFields = [
      'atamsaLogo', 'jewelVideo', 'mainGemPhoto', 
      'evaluatorSignature', 'managerSeal'
    ];
    
    const uploadPromises: Promise<any>[] = [];

    // Handle single file uploads
    const fileUrls: { [key: string]: string } = {};
    for (const fieldName of fileFields) {
      const file = formData.get(fieldName);
      
      console.log(`--- Processing field: ${fieldName} ---`);
      console.log(`Value type: ${typeof file}`);
      if (file instanceof File) {
        console.log(`Value is a File object. Name: ${file.name}, Size: ${file.size}`);
        if (file.size > 0) {
          uploadPromises.push(
            uploadFileToCloudinary(file).then(url => {
              fileUrls[`${fieldName}Url`] = url;
            })
          );
        }
      } else {
        console.log('Value is NOT a File object. Value:', file);
      }
    }

    // Handle multiple jewel images upload
    const jewelImagesFiles = formData.getAll("jewelImages") as File[];
    console.log(`--- Processing jewelImages field ---`);
    console.log(`Found ${jewelImagesFiles.length} files for jewelImages.`);
    
    let jewelImageUrls: string[] = [];
    const validJewelImages = jewelImagesFiles.filter(file => file instanceof File && file.size > 0);
    
    if (validJewelImages.length > 0) {
      console.log(`Uploading ${validJewelImages.length} valid jewel images.`);
      const jewelImagesPromise = Promise.all(
        validJewelImages.map(file => uploadFileToCloudinary(file))
      ).then(urls => {
        jewelImageUrls = urls;
      });
      uploadPromises.push(jewelImagesPromise);
    }

    // Wait for all uploads to complete
    await Promise.all(uploadPromises);

    // --- Data Extraction ---
    const secondaryGems = JSON.parse(formData.get("secondaryGems") as string || '[]');

    const certificateData = {
      jewelName: formData.get("jewelName"),
      serialNumber: formData.get("serialNumber"),
      certificateDate: formData.get("certificateDate"),
      jewelType: formData.get("jewelType"),
      mainMaterial: formData.get("mainMaterial"),
      totalWeight: formData.get("totalWeight"),
      designModel: formData.get("designModel"),
      craftingTechnique: formData.get("craftingTechnique"),
      generalDescription: formData.get("generalDescription"),
      mainGemType: formData.get("mainGemType"),
      mainGemVariety: formData.get("mainGemVariety"),
      mainGemColor: formData.get("mainGemColor"),
      mainGemDimensions: formData.get("mainGemDimensions"),
      mainGemCarats: formData.get("mainGemCarats"),
      mainGemOrigin: formData.get("mainGemOrigin"),
      evaluationMethod: formData.get("evaluationMethod"),
      evaluationDate: formData.get("evaluationDate"),
      evaluatorName: formData.get("evaluatorName"),
      additionalComments: formData.get("additionalComments"),
      legalNotice: formData.get("legalNotice") === 'true',
      atamsaLocation: formData.get("atamsaLocation"),
      atamsaWebsite: formData.get("atamsaWebsite"),
      institutionalMessage: formData.get("institutionalMessage"),
      secondaryGems: secondaryGems,
      ...fileUrls,
      jewelImageUrls: jewelImageUrls,
    };

    // --- Database Insertion ---
    const newCertificate = new Certificate(certificateData);
    const savedCertificate = await newCertificate.save();

    return NextResponse.json(savedCertificate, { status: 201 });

  } catch (error) {
    console.error("Error creating certificate:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: `Error creating certificate: ${errorMessage}` }, { status: 500 });
  }
}