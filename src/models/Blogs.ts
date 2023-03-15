import {
    Model, Schema, model
} from 'mongoose';
import TimeStampPlugin, {
    ITimeStampedDocument
} from './plugins/timestamp-plugin';

export interface IBlogs extends ITimeStampedDocument {
    /** Name of the BLog Title */
    blogTitle: string;
    // Blog Description
    description: string
    // Author
    author: string
    // source
    source: string
    // link
    link: string
}

interface IBlogsModel extends Model<IBlogs> { }

const schema = new Schema<IBlogs>({
    blogTitle: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    source: { type: String },
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const Blogs: IBlogsModel = model<IBlogs, IBlogsModel>('tbl-blog', schema);

export default Blogs;
