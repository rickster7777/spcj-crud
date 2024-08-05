import CarrierCodeRepository from '../../database/carrierCode/carrierCodeRepository';
import AppError from '@tczdigital/node-utilities/errors/AppError';
import httpStatus from 'http-status';

/**
 * Retrieves carrier codes based on the provided filters.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves to send a response to the client.
 * @throws {AppError} - Throws an error if carrier codes are not found.
 */
export const getCarrierCodes = async (req, res, next) => {
    // const { user } = req;

    // if (!user) {
    //     return next(new AppError('User not authenticated', httpStatus.UNAUTHORIZED));
    // }
    console.log('In getCarrierCodes');
    const { enabled } = req.query;
    const queryObject = enabled ? { enabled: enabled.toUpperCase() } : {};

    const carrierCodes = await CarrierCodeRepository.get().find(queryObject);

    if (carrierCodes.length === 0) {
        return next(new AppError('Carrier codes not found', httpStatus.NOT_FOUND));
    }

    return res.create(httpStatus.OK, 'Carrier codes found', carrierCodes);
};


/**
 * Creates a new carrier code record.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves to send a response to the client.
 * @throws {AppError} - Throws an error if carrier code creation fails.
 */
export const createCarrierCode = async (req, res, next) => {
    const { ccId, carrierCode, enabled, createdOrUpdatedBy } = req.body;

    if (!carrierCode || !ccId) {
        return next(new AppError('ccId and Carrier code is required', httpStatus.BAD_REQUEST));
    }

    const newCarrierCode = {
        ccId,
        carrierCode,
        enabled: enabled ? enabled.toUpperCase() : 'ANY',
        createdOrUpdatedBy: createdOrUpdatedBy || ''
    };

    const carrierCodeRecord = await CarrierCodeRepository.get().create(newCarrierCode);

    if (!carrierCodeRecord) {
        return next(new AppError('Failed to create carrier code', httpStatus.INTERNAL_SERVER_ERROR));
    }

    return res.create(httpStatus.CREATED, 'Carrier code created successfully', carrierCodeRecord);
};


/**
 * Edit a carrier code.
 */

export const editCarrierCode = async (req, res, next) => {
    const { guid } = req.params;
    const { ccId, carrierCode, enabled, createdOrupdatedBy } = req.body;

    const updatedCarrierCode = await CarrierCodeRepository.get().findOneAndUpdate(
        { guid },
        {
            ccId,
            carrierCode,
            enabled: enabled ? enabled.toUpperCase() : 'ANY',
            createdOrupdatedBy: createdOrupdatedBy || ''
        },
        { new: true }
    );

    if (!updatedCarrierCode) {
        return next(new AppError('Carrier code not found', httpStatus.NOT_FOUND));
    }

    return res.create(httpStatus.OK, 'Carrier code updated successfully', updatedCarrierCode);
};

/**
 * Delete a carrier code.
 */

export const deleteCarrierCode = async (req, res, next) => {
    const { guid } = req.params;

    const deletedCarrierCode = await CarrierCodeRepository.get().findOneAndDelete({ guid });

    if (!deletedCarrierCode) {
        return next(new AppError('Carrier code not found', httpStatus.NOT_FOUND));
    }

    return res.create(httpStatus.OK, 'Carrier code deleted successfully', deletedCarrierCode);
};
