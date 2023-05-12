import { Schema, Types, model } from 'mongoose';

export interface IProjectSection {
  _id: Types.ObjectId;
  projectSectionImage: string,
  projectSectionContent: string,
  projectImagealignment: {
    type: String,
    enum: ['left', 'right'],
    default: 'left'
  }
}

const projectSectionSchema = new Schema<IProjectSection>({
  projectSectionImage: { type: String , required: true},
  projectSectionContent: { type: String, required: true },
  projectImagealignment: { type: String , required: true},
});

const projectSection = model<IProjectSection>('tbl-projectSection', projectSectionSchema);

export default projectSection;
