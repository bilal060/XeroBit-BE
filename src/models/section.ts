import { Schema, model } from 'mongoose';

export interface ISection {
  sectionTitle: string;
  sectionDescription: string;
  sectionImage?: string;
}

const sectionSchema = new Schema<ISection>({
  sectionTitle: { type: String, required: true },
  sectionDescription: { type: String, required: true },
  sectionImage: { type: String },
});

const Section = model<ISection>('tbl-section', sectionSchema);

export default Section;
