import express from "express";
import multer from "multer";
import path from 'path'
import {protect, isAdmin} from '../middleware/authMiddleware.js'
const router = express.Router()

// DiskStorage documentation
// https://www.npmjs.com/package/multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

// how to check/validate file type in multer
// https://stackoverflow.com/questions/65537778/how-to-check-file-type-in-multer
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  // extname will give us a Boolean if it matches filetypes
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // has to have jpg || jpeg || png in the mimetype. Returns a Boolean
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
  }
})

// Creating endpoint for image uploads
router.post('/', protect, isAdmin, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})


export default router