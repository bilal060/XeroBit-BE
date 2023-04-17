import { Request, Response } from 'express';
import logger from '../../logger';
import Services, { Iservices } from '../../models/services';
import Section from '../../models/section';

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



export const AddServices = async (req: Request, res: Response) => {
    const { serviceTitle, serviceCategory, description, source, links } = req.body;
    console.log("Add services")
    try {
        const createdservices = new Services({
            serviceTitle: serviceTitle,
            serviceCategory: serviceCategory,
            description: description,
            source: source,
            links: links,
            serviceImage: req.file?.path
        })
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


export const addSections = async (req: Request, res: Response) => {
    const { sectionTitle,sectionDescription,sectionImage } = req.body;
    const section = new Section({ sectionTitle,sectionDescription, sectionImage });
    await section.save(); 
    section.save(async (err, savedSection) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            const sectionId = savedSection._id;
            let mySectionlId = req.cookies.myModelId;
        if (!mySectionlId) {
            const createService = new Services({
              section: [sectionId]
            });
            createService.save((err, savedService) => {
            if (err) {
              res.status(500).send(err);
            } else {
            mySectionlId = createService._id.toString();
              res.cookie('mySectionlId', mySectionlId);
              res.send(savedService);
            }
          });
        }else{
            const service: Iservices | null = await Services.findById(mySectionlId);
            if (service) {
                service.sections.push(savedSection._id); // add the section id to the service's sections array
                 service.save(); // save the service with the new section
                res.status(200).json(savedSection); // send the saved section as response
              } else {
                res.status(404).json({ message: 'Service not found' });
              }
        }   
}})
}
export const addService = async (req: Request, res: Response) => {
const { serviceTitle, serviceCategory, description, source, links } = req.body;
console.log("Add services")
const serviceID = req.cookies.myModelId;
if(!serviceID){
    const createdservices = new Services({
        serviceTitle: serviceTitle,
        serviceCategory: serviceCategory,
        description: description,
        source: source,
        links: links,
        serviceImage: req.file?.path
    })
    createdservices.save((err, savedService) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.send(savedService);
              }
            })
        }else{
            const service = await Services.findByIdAndUpdate(serviceID, {
                serviceTitle: req.body.serviceTitle,
                serviceCategory: req.body.serviceCategory,
                description: req.body.description,
                source: req.body.source,
                links: req.body.links,
                serviceImage: req.file?.path
              }, { new: true });
                res.clearCookie('myModelId');
                res.send(service);
              }
          }
    

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
