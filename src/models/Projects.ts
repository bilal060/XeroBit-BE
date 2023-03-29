import { string } from '@hapi/joi';
import {
    Model, Schema, model
} from 'mongoose';
import TimeStampPlugin, {
    ITimeStampedDocument
} from './plugins/timestamp-plugin';

export interface IProjects extends ITimeStampedDocument {
    /** Name of the project Title */
    projectTitle: string;
    // project Category
    projectCategory: string
    // project Description
    description: string
    // Author
    author: {
        authorID: string,
        position: string,
        email: string,
        authorLinks: [{ Site: string, src: string }],
    }
    // source
    source: string
    // link
    links: string
    // project Image
    projectImage: string[]
}

interface IProjectsModel extends Model<IProjects> { }

const schema = new Schema<IProjects>({
    projectTitle: { type: String, required: true },
    projectCategory: { type: String },
    description: { type: String, required: true },
    author: { type: Array<Object>, required: true },
    source: { type: String },
    links: { type: String },
    projectImage: { type: Array<String> }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const Projects: IProjectsModel = model<IProjects, IProjectsModel>('tbl-project', schema);

export default Projects;
