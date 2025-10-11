
import mongoose, { Document, Schema } from 'mongoose';

// Interface for a secondary gem
export interface ISecondaryGem {
  type: string;
  color: string;
  carats: string;
}

// Schema for a secondary gem
const SecondaryGemSchema: Schema = new Schema({
  type: { type: String, required: true },
  color: { type: String, required: true },
  carats: { type: String, required: true },
});

// Main certificate interface
export interface ICertificate extends Document {
  jewelName: string;
  serialNumber: string;
  certificateDate: Date;
  atamsaLogoUrl?: string;
  jewelVideoUrl?: string;
  jewelImageUrls: string[];
  jewelType: string;
  mainMaterial: string;
  totalWeight: string;
  designModel: string;
  craftingTechnique: string;
  generalDescription: string;
  mainGemType: string;
  mainGemVariety: string;
  mainGemColor: string;
  mainGemDimensions: string;
  mainGemCarats: string;
  mainGemOrigin?: string;
  mainGemPhotoUrl?: string;
  secondaryGems: ISecondaryGem[];
  evaluationMethod: string;
  evaluationDate: Date;
  evaluatorName: string;
  evaluatorSignatureUrl?: string;
  additionalComments?: string;
  legalNotice: boolean;
  atamsaLocation: string;
  atamsaWebsite: string;
  managerSealUrl?: string;
  institutionalMessage: string;
}

// Main certificate schema
const CertificateSchema: Schema = new Schema({
  jewelName: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  certificateDate: { type: Date, required: true },
  atamsaLogoUrl: { type: String },
  jewelVideoUrl: { type: String },
  jewelImageUrls: { type: [String], required: true },
  jewelType: { type: String, required: true },
  mainMaterial: { type: String, required: true },
  totalWeight: { type: String, required: true },
  designModel: { type: String },
  craftingTechnique: { type: String },
  generalDescription: { type: String, required: true },
  mainGemType: { type: String, required: true },
  mainGemVariety: { type: String },
  mainGemColor: { type: String },
  mainGemDimensions: { type: String },
  mainGemCarats: { type: String, required: true },
  mainGemOrigin: { type: String },
  mainGemPhotoUrl: { type: String },
  secondaryGems: [SecondaryGemSchema],
  evaluationMethod: { type: String },
  evaluationDate: { type: Date },
  evaluatorName: { type: String },
  evaluatorSignatureUrl: { type: String },
  additionalComments: { type: String },
  legalNotice: { type: Boolean, required: true },
  atamsaLocation: { type: String },
  atamsaWebsite: { type: String },
  managerSealUrl: { type: String },
  institutionalMessage: { type: String },
}, { timestamps: true });

export default mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);
