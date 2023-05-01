import { Schema, model } from 'mongoose';

export interface ISection {
  serviceImage: string,
  serviceContent: string,
  imagealignment: {
    type: String,
    enum: ['left', 'right'],
    default: 'left'
  }
}

const sectionSchema = new Schema<ISection>({
  serviceImage: { type: String, required: true },
  serviceContent: { type: String, required: true },
  imagealignment: { type: String },
});

const Section = model<ISection>('tbl-section', sectionSchema);

export default Section;
