import { Request, Response } from 'express';
import logger from '../../logger';
import Services from '../../models/services';

export const ServicesList = async (req: Request, res: Response) => {
    console.log("services List")
    try {
        const services = await Services.aggregate([
            {
                "$project": {
                    "_id": 1,
                    "serviceTitle": 1,
                    "serviceCategory": 1,
                    "description": 1,
                    "source": 1,
                    "links": 1,
                    "serviceImage": 1,
                    "createdAt": 1,
                    "updatedAt": 1
                }
            }
        ])
        return res.status(200).json({
            total: services.length,
            services
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
// export const AddServices = async (req: Request, res: Response) => {
//     const { serviceTitle, serviceCategory, description, source, links } = req.body;
//     console.log("Add services")
//     try {
//         const createdservices = new Services({
//             serviceTitle: serviceTitle,
//             serviceCategory: serviceCategory,
//             description: description,
//             source: source,
//             links: links,
//             serviceImage: req.file?.path
//         })
//         await createdservices.save();
//         return res.status(200).json({
//             success: false,
//             message: 'services Added Successfully'
//         });
//     } catch (error) {
//         logger.error({
//             level: 'debug',
//             message: `${'Add Failure'} , ${error}`,
//             consoleLoggerOptions: { label: 'API' }
//         });
//         return res.status(200).json({
//             success: false,
//             message: 'Fail to Add'
//         });
//     }

// };
export const AddServices = async (req: Request, res: Response) => {
    const { serviceTitle, serviceCategory, description, source, links, sections } = req.body;
    console.log("Add services")
    try {
        const createdSections = await Promise.all(
            sections.map(async (section: any) => {
                const { sectionTitle, sectionDescription } = section;
                const sectionImage = section.sectionImage ? { data: Buffer.from(section.sectionImage.data, 'base64'), contentType: section.sectionImage.contentType } : undefined;
                const createdSection = new section({
                    sectionTitle,
                    sectionDescription,
                    sectionImage
                });
                return await createdSection.save();
            })
        );
        const serviceImage = req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : undefined;
        const createdService = new Services({
            serviceTitle,
            serviceCategory,
            description,
            source,
            links,
            serviceImage,
            sections: createdSections.map((section: any) => section._id)
        });
        await createdService.save();
        return res.status(200).json({
            success: true,
            message: 'Service added successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to add service'
        });
    }
};

export const FindOne = async (req: Request, res: Response) => {
    const id = req.params['0']
    try {
        const services = await Services.findById(id)
        console.log(services)
        return res.status(200).json(
            services
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

export const Editservices = async (req: Request, res: Response) => {
    const { id, serviceTitle, serviceCategory, description, source, links } = req.body;
    console.log("Edit services")
    try {
        if (id) {
            await Services.findByIdAndUpdate(id, {
                serviceTitle: serviceTitle,
                serviceCategory: serviceCategory,
                description: description,
                source: source,
                links: links,
                serviceImage: req.file?.path
            }, (err, result) => {
                if (err)
                    res.send(err)
            })
            return res.status(200).json({
                success: true,
                message: 'SuccessFully Edit'
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

export const DeleteService = async (req: Request, res: Response) => {
    const id = req.params['0']
    try {
        const del = await Services.deleteOne({ _id: id });
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
