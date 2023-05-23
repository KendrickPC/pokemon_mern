# Ken's Pokemon Shop

![REDUX Diagram ](./REDUX.png)

![Irida](https://www.titancards.co.uk/image/cache/catalog/products/Pokemon_Card_Singles/Astral_Radiance/186-189-Irida-1100x1100h.jpg)

npm run start

TO DO LIST:

-[x] REFACTOR uploadRoutes.js to incorporate aws multerS3

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

```shell
# .env file
ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
BUCKET_NAME=YOUR_BUCKET_NAME
DATABASE_URL=YOUR_DATABASE_URL
```

```js
// config/config.js
import dotenv from 'dotenv'

dotenv.config()

const config = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  bucketName: process.env.BUCKET_NAME,
  databaseURL: process.env.DATABASE_URL,
}

export default config
```

```js
// uploadRoutes.js

import config from '../config'

// Access the values from the config object
const accessKeyId = config.accessKeyId
const secretAccessKey = config.secretAccessKey
const bucketName = config.bucketName
const databaseURL = config.databaseURL

// Use the values in your code
aws.config.update({
  accessKeyId,
  secretAccessKey,
})
```

-[x] Use moment to clean up date
