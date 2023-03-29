import { Request, Response } from 'express';
import logger from '../../logger';
import Blogs from '../../models/Blogs';
import { v4 } from 'uuid'

export const BlogsList = async (req: Request, res: Response) => {
    console.log("Blog List")
    try {
        const blogs = await Blogs.aggregate([
            {
                "$project": {
                    "_id": 1,
                    "blogTitle": 1,
                    "blogCategory": 1,
                    "description": 1,
                    "author": 1,
                    "source": 1,
                    "links": 1,
                    "blogImage": 1,
                }
            }
        ])
        return res.status(200).json({
            total: blogs.length,
            blogs
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
export const AddBlog = async (req: Request, res: Response) => {
    const { blogTitle, blogCategory, description, author, source, links, } = req.body;
    console.log("Add Blog")

    try {
        const createdBlog = new Blogs({
            blogTitle: blogTitle,
            blogCategory: blogCategory,
            description: description,
            author: author,
            source: source,
            links: links,
            blogImage: req.file?.path
        })
        await createdBlog.save();
        return res.status(200).json({
            success: true,
            message: 'Blog Added Successfully'
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
    console.log(req.params['0'])
    const id = req.params['0']
    try {
        const blog = await Blogs.findById(id)
        return res.status(200).json(
            blog
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

export const EditBlog = async (req: Request, res: Response) => {
    const { id, blogTitle, blogCategory, description, author, source, links, } = req.body;
    console.log("Edit BLog")

    try {
        if (id) {
            await Blogs.findByIdAndUpdate(id, {
                blogTitle: blogTitle,
                blogCategory: blogCategory,
                description: description,
                author: author,
                source: source,
                links: links,
                // blogImage: req.file?.path,
            }, (err, result) => {
                if (err)
                    res.send(err)
            })
            return res.status(200).json({
                success: true,
                message: 'SuccessFully to Edit'
            });
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

export const DeleteBlog = async (req: Request, res: Response) => {
    const id = req.params['0']
    try {
        const del = await Blogs.deleteOne({ _id: id });
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