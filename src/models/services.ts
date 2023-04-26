  import {
      Model, Schema, model
  } from 'mongoose';
  import TimeStampPlugin, {
      ITimeStampedDocument
  } from './plugins/timestamp-plugin';

  // interface ISection {
  //     sectionTitle: string;
  //     sectionDescription: string;
  //     sectionImage: {
  //       data: Buffer;
  //       contentType: string;
  //     };
  //   }
  export interface Iservices extends ITimeStampedDocument {
      /** Name of the BLog Title */
      serviceTitle: string;
      // service Category
      serviceCategory: string
      // service Description
      description: string
      // source
      source: string
      // link
      links: [{ Site: string, src: string }],
      // service Image
      serviceImage: {
          contentType: String
      }
      // serviceImage: [{ images: Buffer }]

  }

  interface IservicesModel extends Model<Iservices> { }
  const schema = new Schema<Iservices>({
      serviceTitle: { type: String, required: true },
      serviceCategory: { type: String },
      description: { type: String, required: true },
      source: { type: String },
      links: { type: Array<Object>, default: [] },
      serviceImage: {
          type: {
              contentType: String
          }, required: true
      },
  });

  // Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
  schema.plugin(TimeStampPlugin);

  const Services: IservicesModel = model<Iservices, IservicesModel>('tbl-services', schema);

  export default Services;