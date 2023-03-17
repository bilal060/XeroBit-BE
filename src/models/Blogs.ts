import {
    Model, Schema, model
} from 'mongoose';
import TimeStampPlugin, {
    ITimeStampedDocument
} from './plugins/timestamp-plugin';

export interface IBlogs extends ITimeStampedDocument {
    /** Name of the BLog Title */
    blogTitle: string;
    // Blog Category
    blogCategory: string
    // Blog Description
    description: string
    // Author
    author: string
    // source
    source: string
    // link
    link: string,
    // blog Image
    blogImage: string
}

interface IBlogsModel extends Model<IBlogs> { }

const schema = new Schema<IBlogs>({
    blogTitle: { type: String, required: true },
    blogCategory: { type: String },
    description: { type: String, required: true },
    author: { type: String, required: true },
    source: { type: String },
    link: { type: String },
    blogImage: { type: String, required: true }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const Blogs: IBlogsModel = model<IBlogs, IBlogsModel>('tbl-blog', schema);

export default Blogs;
