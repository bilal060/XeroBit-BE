import { Request, Response, response } from 'express';
import logger from '../../logger';
import Services, { Iservices } from '../../models/services';
import Section, { ISection } from '../../models/section';


//     console.log("services List")
//     try {
//         const services = await Services.aggregate([
//             {
//                 "$project": {
//                     "_id": 1,
//                     "serviceTitle": 1,
//                     "serviceCategory": 1,
//                     "description": 1,
//                     "source": 1,
//                     "links": 1,
//                     "serviceImage": 1,
//                     "createdAt": 1,
//                     "updatedAt": 1
//                 }
//             }
//         ])
//         return res.status(200).json({
//             total: services.length,
//             services
//         }
//         );
//     } catch (error) {
//         logger.error({
//             level: 'debug',
//             message: `${'Cant Find'} , ${error}`,
//             consoleLoggerOptions: { label: 'API' }
//         });
//         return res.status(404).json({
//             success: false,
//             message: 'Cant Find'
//         });
//     }

// };



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

export const ServicesList = async (req: Request, res: Response) => {
    try {
      const services = await Services.find();
      const result = [];
      for (let i = 0; i < services.length; i++) {
        const service = services[i];
        const sectionIds = service.sections;
        const sections = await Section.find({ _id: { $in: sectionIds } });
        const sectionsData = sections.map(section => {
          const { _id,sectionTitle, sectionDescription, sectionImage } = section;
          return {_id , sectionTitle, sectionDescription, sectionImage };
        });
        const serviceWithSections = { ...service._doc, sections: sectionsData };
        delete serviceWithSections.section;
        result.push(serviceWithSections);
      }
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
export const AddServices = async (req: Request, res: Response) => {
const { serviceTitle, serviceCategory, description, source, links } = req.body;
let serviceImage = req.file?.path; 
const serviceID = req.cookies.mySectionlId;
if(!serviceID){
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
        }else{
            const service = await Services.findByIdAndUpdate(serviceID, {
                serviceTitle: req.body.serviceTitle,
                serviceCategory: req.body.serviceCategory,
                description: req.body.description,
                source: req.body.source,
                links: req.body.links,
                serviceImage: serviceImage
              }, { new: true });
                res.clearCookie('mySectionlId');
                res.send(service);
              }
  }
export const FindOneService = async (req: Request, res: Response) => {
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
        res.clearCookie('mySectionlId')
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




    