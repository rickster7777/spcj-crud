import flightNumberRepository from '../../database/flightNumber/flightNumberRepository';
import AppError from '@tczdigital/node-utilities/errors/AppError';
import httpStatus from 'http-status';

/**
 * Retrieves flights based on query parameters.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves to send a response to the client.
 * @throws {AppError} - Throws an error if flights are not found.
 */
export const getFlights = async (req, res, next) => {
    const { enabled } = req.query;
    const queryObject = enabled ? { enabled: enabled.toUpperCase() } : {};

    const flights = await flightNumberRepository.get().find(queryObject);

    if (!flights.length) {
        return next(new AppError('Flights not found', httpStatus.NOT_FOUND));
    }

    return res.create(httpStatus.OK, 'Flights found', flights);
};

/**
 * Creates a new flight record.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves to send a response to the client.
 * @throws {AppError} - Throws an error if flight creation fails.
 */
export const createFlight = async (req, res, next) => {
    const { flightId, flightNumber, enabled, createdOrUpdatedBy } = req.body;

    if ( !flightId || !flightNumber) {
        return next(new AppError('Flight number and Id is required', httpStatus.BAD_REQUEST));
    }

    const newFlight = {
        flightId,
        flightNumber,
        enabled: enabled ? enabled.toUpperCase() : 'ANY',
        createdOrUpdatedBy: createdOrUpdatedBy || ''
    };

    const flightRecord = await flightNumberRepository.get().create(newFlight);

    if (!flightRecord) {
        return next(new AppError('Failed to create flight', httpStatus.INTERNAL_SERVER_ERROR));
    }

    return res.create(httpStatus.CREATED, 'Flight created successfully', flightRecord);
};

/**
 * Edit a flight number.
 */

export const editFlight = async (req, res, next) => {
    const { guid } = req.params;
    const { flightId, flightNumber, enabled, createdOrUpdatedBy } = req.body;

    const updatedFlight = await flightNumberRepository.get().findOneAndUpdate(
        { guid },
        {   flightId,
            flightNumber,
            enabled: enabled ? enabled.toUpperCase() : 'ANY',
            createdOrUpdatedBy: createdOrUpdatedBy || ''
        },
        { new: true }
    );

    if (!updatedFlight) {
        return next(new AppError('Flight not found', httpStatus.NOT_FOUND));
    }

    return res.create(httpStatus.OK, 'Flight updated successfully', updatedFlight);
};


/**
 * delete a flight number.
 */

export const deleteFlight = async (req, res, next) => {
    const { guid } = req.params;

    const deletedFlight = await flightNumberRepository.get().findOneAndDelete({ guid });

    if (!deletedFlight) {
        return next(new AppError('Flight not found', httpStatus.NOT_FOUND));
    }

    return res.create(httpStatus.OK, 'Flight deleted successfully', deletedFlight);
};
