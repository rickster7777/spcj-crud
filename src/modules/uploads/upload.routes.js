import express from 'express';
import { uploadXlsxFile } from './upload.controller';
import { catchAsync } from '@tczdigital/node-utilities/errors';
//import { responseFormatter } from '../middlewares/responseFormatter';
import { uploadMiddleware } from './upload.middleware';

const router = express.Router();

router.route('/').post(uploadMiddleware, catchAsync(uploadXlsxFile));
// router.post('/upload', responseFormatter, uploadExcel);

export default router;
