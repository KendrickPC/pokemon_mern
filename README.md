# Ken's Pokemon Shop

![REDUX Diagram ](./REDUX.png)

![Irida](https://www.titancards.co.uk/image/cache/catalog/products/Pokemon_Card_Singles/Astral_Radiance/186-189-Irida-1100x1100h.jpg)

npm run start

TO DO LIST:

- [] REFACTOR uploadRoutes.js to incorporate aws multerS3

```js
import express from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import config from '../config'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`)
  },
})

const upload = multer({ storage })

const router = express.Router()

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

aws.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
})
const s3 = new aws.S3()
const storageS3 = multerS3({
  s3,
  bucket: 'your-bucket',
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname)
  },
})
const uploadS3 = multer({ storage: storageS3 })
router.post('/s3', uploadS3.single('image'), (req, res) => {
  res.send(req.file.location)
})
export default router
```
