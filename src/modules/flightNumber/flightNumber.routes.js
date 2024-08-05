import { Router } from 'express';
import { getFlights, createFlight, editFlight, deleteFlight } from './flightNumber.controller';
import { catchAsync } from '@tczdigital/node-utilities/errors';
// import { authenticateUser } from '../authentication/authentication.middleware';

const router = Router();

router.route('/get-flight-numbers').get(catchAsync(getFlights));

router.route('/create-flight-number').post(catchAsync(createFlight));

router.route('/edit-flight-number/:guid').put(catchAsync(editFlight));

router.route('/delete-flight-number/:guid').delete(catchAsync(deleteFlight));

export default router;
