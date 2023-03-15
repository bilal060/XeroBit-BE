import {
    Model, Schema, model
} from 'mongoose';
import TimeStampPlugin, {
    ITimeStampedDocument
} from './plugins/timestamp-plugin';

export interface Iservices extends ITimeStampedDocument {
    /** Name of the service Title */
    serviceTitle: string;
    // service Description
    description: string
}

interface IservicesModel extends Model<Iservices> { }

const schema = new Schema<Iservices>({
    serviceTitle: { type: String, required: true },
    description: { type: String, required: true },
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const Services: IservicesModel = model<Iservices, IservicesModel>('tbl-services', schema);

export default Services;
