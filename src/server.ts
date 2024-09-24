import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'

import { router } from './routes/routes'
import fileUpload from 'express-fileupload'

const app = express()
app.use(express.json())
app.use(cors())
app.use(
   fileUpload({
      limits: { fileSize: 10 * 1024 * 1024 },
   }),
)

app.use(router)

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   if (err instanceof Error) {
      return res.status(400).json({ error: err.message })
   }

   return res.status(500).json({ status: 'error', message: 'Internal server error' })
})

app.listen(process.env.PORT || 5000)
