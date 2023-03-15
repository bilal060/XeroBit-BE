import { Request, Response } from 'express';
import logger from '../../logger';
import { v4 } from 'uuid'
import Services from '../../models/services';

export const ServicesList = async (req: Request, res: Response) => {
    console.log("services List")
    try {
        const services = await Services.aggregate([
            {
                "$project": {
                    "_id": 1,
                    "servicesTitle": 1,
                    "description": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
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
export const AddServices = async (req: Request, res: Response) => {
    const { serviceTitle, description } = req.body;

    console.log("Add services")
    console.log(req.body)

    try {
        const createdservices = new Services({ serviceTitle, description })
        await createdservices.save();

        return res.status(200).json({
            success: false,
            message: 'services Added Successfully'
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
        const services = await Services.findById(id)
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
    const { servicesTitle, description } = req.body;

    console.log("Edit services")

    const serviceid = req.params['0'];
    try {
        const service = await Services.updateOne({ id: serviceid }, {
            servicesTitle: servicesTitle,
            description: description,
        })

        return res.status(200).json({
            success: true,
            message: 'SuccessFully Edit'
        });
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

