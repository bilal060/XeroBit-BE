import { Request, Response, response } from 'express';
import logger from '../../logger';
import Services, { Iservices } from '../../models/services';
import Section, { ISection } from '../../models/section';

export const ServicesList =async (req: Request, res: Response) => {
    try {
      const services = await Services.find();
      res.json({
        services:services
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
export const AddServices = async (req: Request, res: Response) => {
let { serviceTitle, serviceCategory, description, source, links } = req.body;
let serviceImage = req.file?.path; 
console.log(serviceImage)
    const createdservices = new Services({
        serviceTitle: serviceTitle,
        serviceCategory: serviceCategory, 
        description: description,
        source: source,
        links: links,
        serviceImage: serviceImage
    })
    createdservices.save((err, savedService) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.send(savedService);
              }
            })
  }
export const DeleteAllServices = async (req: Request, res: Response) => {
    try {
      const servicesToDelete = await Services.find();
      if (servicesToDelete.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No services found',
        });
      }
      const serviceIds = servicesToDelete.map((service) => service._id);
      await Services.deleteMany({});
      await Section.deleteMany({ service: { $in: serviceIds } });
      return res.status(200).json({
        success: true,
        message: 'All services and their sections have been deleted successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while deleting all services and their sections',
      });
    }
  };
  
export const FindOneService = async (req: Request, res: Response) => {
    try {
       
        const service = await Services.findOne({ _id: req.params.id });
        return res.status(200).json({
            service
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
export const FindOneSection = async (req: Request, res: Response) => {
  try {
     
      const section = await Section.findOne({ _id: req.params.id });
      return res.status(200).json({
        section
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
export const Editservices = async (req: Request, res: Response) => {
    const { serviceTitle, serviceCategory, description, source, links } = req.body;
    try {                                                                                           
        if (req.params.id) {
            await Services.findByIdAndUpdate(req.params.id, {  
                serviceTitle:serviceTitle, 
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
                message: 'SuccessFully Edit',
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
export const Editsection = async (req: Request, res: Response) => {
  const { serviceContent, imagealignment } = req.body;
  try {                                                                                           
      if (req.params.id) {
          await Section.findByIdAndUpdate(req.params.id, {  
            serviceImage: req.file?.path,
            serviceContent: serviceContent,
            imagealignment: imagealignment,
          }, (err, result) => {
              if (err)
                  res.send(err)
          })
          console.log(serviceContent,imagealignment)
            return res.status(200).json({
              success: true,
              message: 'SuccessFully Edit',
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
    try {
        const serviceToDelete = await Services.findOne({ _id: req.params.id });
        if(!serviceToDelete){
            return res.status(404).json({
                success: false,
                message: 'Cant Find'
            });
        }
        const del = await Services.deleteOne({ _id: req.params.id });
        await Section.deleteMany({ _id: { $in: serviceToDelete.sections } });
        return res.status(200).json(del);
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
export const DeleteSection = async (req: Request, res: Response) => {
    try {
        const sectionToDelete = await Section.findOne({ _id: req.params.id });
        if(!sectionToDelete){
            return res.status(404).json({
                success: false,
                message: 'Cant Find'
            });
        }
        const del = await Section.deleteOne({ _id: req.params.id });
        return res.status(200).json(del);
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
export const AddServiceSection = async (req: Request, res: Response) => {
    console.log('AddServiceSection')
    try {
      const service = await Services.findOne({ _id: req.params.id });
      if (!service) {
        return res.status(404).json({
          success: false,
          message: 'Service not found'
        });
      }
      const serviceSectionImage = req.file?.path; 
      const newSection = new Section({
        serviceImage: serviceSectionImage,
        serviceContent: req.body.serviceContent,
        imagealignment: req.body.imagealignment
      });
      const savedSection = await newSection.save();
      service.sections.push(savedSection._id);
      await service.save();
      return res.status(200).json({
        success: true,
        message: 'Service section created successfully',
        data: savedSection
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  };
  
  








    