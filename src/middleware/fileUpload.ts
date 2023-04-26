import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }                       
})

export const upload = multer({ storage: storage  })


const service = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/service')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
export const serviceUpload = multer({ 
  storage: service, 
  fileFilter: function (req, file, cb) {
    if (file.fieldname === 'serviceImage') {
      cb(null, true);
    } else {
      cb(new Error('Unexpected field'));
    }
  }
})