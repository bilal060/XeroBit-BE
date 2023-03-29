import { Request, Response } from 'express';
import logger from '../../logger';
import { v4 } from 'uuid'
import Projects from '../../models/Projects';

export const ProjectsList = async (req: Request, res: Response) => {
    console.log("projects List")
    try {
        const projects = await Projects.aggregate([
            {
                "$project": {
                    "_id": 1,
                    "projectTitle": 1,
                    "projectCategory": 1,
                    "description": 1,
                    "author": 1,
                    "source": 1,
                    "links": 1,
                    "projectImage": 1,
                    "createdAt": 1,
                    "updatedAt": 1
                }
            }
        ])
        return res.status(200).json({
            total: projects.length,
            projects
        }
        );
    } catch (error) {
        logger.error({
            level: 'debug',
            message: `${'Cant Find'} , ${error}`,
            consoleLoggerOptions: { label: 'API' }
        });
        return res.status(404).json({
            success: false,
            message: 'Cant Find'
        });
    }

};
export const Addprojects = async (req: Request, res: Response) => {
    const { projectTitle, projectCategory, description, author, source, links } = req.body;
    console.log("Add projects")

    try {
        const createdprojects = new Projects({
            projectTitle: projectTitle,
            projectCategory: projectCategory,
            description: description,
            author: author,
            source: source,
            links: links,
            projectImage: req.file?.path
        })
        await createdprojects.save();
        return res.status(200).json({
            success: false,
            message: 'projects Added Successfully'
        });
    } catch (error) {
        logger.error({
            level: 'debug',
            message: `${'Add Failure'} , ${error}`,
            consoleLoggerOptions: { label: 'API' }
        });
        return res.status(200).json({
            success: false,
            message: 'Fail to Add'
        });
    }

};
export const FindOne = async (req: Request, res: Response) => {
    const id = req.params['0']
    try {
        const project = await Projects.findById(id)
        return res.status(200).json(
            project
        );
    } catch (error) {
        logger.error({
            level: 'debug',
            message: `${'Cant Find'} , ${error}`,
            consoleLoggerOptions: { label: 'API' }
        });
        return res.status(404).json({
            success: false,
            message: 'Cant Find'
        });
    }

};

export const EditProjects = async (req: Request, res: Response) => {
    const { id, projectTitle, projectCategory, description, author, source, links } = req.body;
    const image = req.file?.path
    console.log("Edit projects")
    try {
        if (id) {
            await Projects.findByIdAndUpdate(id, {
                projectTitle: projectTitle,
                projectCategory: projectCategory,
                description: description,
                author: author,
                source: source,
                links: links,
                // projectImage: image
            }, (err, result) => {
                if (err)
                    res.send(err)
                else
                    return result
            })
        } else {
            return res.status(200).json({
                success: false,
                message: 'Id is Null to Edit'
            });
        }
    } catch (error) {
        logger.error({
            level: 'debug',
            message: `${'Edit Failure'} , ${error}`,
            consoleLoggerOptions: { label: 'API' }
        });
        return res.status(200).json({
            success: false,
            message: 'Fail to Edit'
        });
    }
};

export const DeleteProject = async (req: Request, res: Response) => {
    const id = req.params['0']
    try {
        const del = await Projects.deleteOne({ _id: id });
        console.log(del)
        return res.status(200).json(
            del
        );
    } catch (error) {
        logger.error({
            level: 'debug',
            message: `${'Cant Find'} , ${error}`,
            consoleLoggerOptions: { label: 'API' }
        });
        return res.status(404).json({
            success: false,
            message: 'Cant Find'
        });
    }

};
