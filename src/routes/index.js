import express from 'express';

import healthRoutes from '../modules/health/health.routes';
import userRoutes from '../modules/user/user.routes';
import carrierCode from '../modules/carrierCode/carrierCode.routes';
import flightNumber from '../modules/flightNumber/flightNumber.routes';
import uploadRoutes from '../modules/uploads/upload.routes';
/* Creating a new router object. */
const router = express.Router();

/* Telling the router to use the healthRoutes object when the url is /health-check. */
router.use('/health-check', healthRoutes);

/* Telling the router to use the userRoutes object when the url is /user. */
router.use('/user', userRoutes);

router.use('/carrier-code', carrierCode);

router.use('/flight-number', flightNumber);

router.use('/upload', uploadRoutes)

export default router;
