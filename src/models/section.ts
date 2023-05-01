import { Schema, model } from 'mongoose';

export interface ISection {
  _id: any;
  serviceImage: string,
  serviceContent: string,
  imagealignment: {
    type: String,
    enum: ['left', 'right'],
    default: 'left'
  }
}

const sectionSchema = new Schema<ISection>({
  sectionImage: { type: String, required: true },
  sectionContent: { type: String, required: true },
  imagealignment: { type: String },
});

const Section = model<ISection>('tbl-section', sectionSchema);

export default Section;
