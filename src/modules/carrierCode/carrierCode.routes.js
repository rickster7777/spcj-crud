import { Router } from 'express';
import { getCarrierCodes, createCarrierCode, editCarrierCode, deleteCarrierCode } from './carrierCode.controller';
import { catchAsync } from '@tczdigital/node-utilities/errors';
// import { authenticateUser } from '../authentication/authentication.middleware';

const router = Router();

router.route('/get-carrier-codes').get(catchAsync(getCarrierCodes));

router.route('/create-carrier-code').post(catchAsync(createCarrierCode));

router.route('/edit-carrier-code/:guid').put(catchAsync(editCarrierCode));

router.route('/delete-carrier-code/:guid').delete(catchAsync(deleteCarrierCode));

export default router;
