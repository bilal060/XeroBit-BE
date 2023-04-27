import { Schema, model } from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from './plugins/timestamp-plugin';
import Section, { ISection } from './section';

export interface Iservices extends ITimeStampedDocument {
  /** Name of the BLog Title */
  _doc: any;
  serviceTitle: string;
  // service Category
  serviceCategory: string;
  // service Description
  description: string;
  // source
  source: string;
  // link
  links: [{ Site: string; src: string }];
  // service Image
  serviceImage?: string;
  sections: ISection[];
}

const schema = new Schema<Iservices>({
  serviceTitle: { type: String,},
  serviceCategory: { type: String },
  description: { type: String,},
  source: { type: String },
  links: { type: Array<Object>, default: [] },
  serviceImage: { type: String },
  sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }] // reference the Section model
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const   Services = model<Iservices>('tbl-services', schema);

export default Services;
