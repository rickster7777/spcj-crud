import mongoose from 'mongoose';
import connectToDatabase from '@tczdigital/node-utilities/database/mongodb';
import logger from '@tczdigital/node-utilities/logger';

const connectionURI = `mongodb+srv://rickster:eusjwRx9US1IFGe6@cluster0.7otfiqs.mongodb.net/Spicejet?retryWrites=true&w=majority`;

const config = {
    autoIndex: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

connectToDatabase(mongoose, connectionURI, config).catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error}`);
});
