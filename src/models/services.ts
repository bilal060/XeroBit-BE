import { Schema, model } from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from './plugins/timestamp-plugin';
import  { ISection } from './section';

export interface Iservices extends ITimeStampedDocument {
  _doc: any;
  serviceTitle: string;
  serviceCategory: string;
  description: string;
  source: string;
  links: [{ Site: string; src: string }];
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
  sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }]
});

schema.plugin(TimeStampPlugin);

const   Services = model<Iservices>('tbl-services', schema);

export default Services;
