import { Schema, model } from 'mongoose';

export interface ISection {
  _id: any;
  sectionImage: string,
  sectionContent: string,
  imagealignment: {
    type: String,
    enum: ['left', 'right'],
    default: 'left'
  }
}

const sectionSchema = new Schema<ISection>({
  sectionImage: { type: String },
  sectionContent: { type: String, required: true },
  imagealignment: { type: String },
});

const Section = model<ISection>('tbl-section', sectionSchema);

export default Section;
