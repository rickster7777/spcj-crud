import mongoose, { Schema } from 'mongoose';
import { v4 } from 'uuid';

// Define the schema for Flight
const uploadSchema = new Schema(
    {
        guid: {
            type: String,
            default: function () {
                return v4();
            },
            unique: true,
        },
        carrierCode: {
            type: String
        },
        flightNumber: {
            type: String,
            required: true,
            trim: true
        },

        depDate: {
            type: String,
            default: ''
        },

        arrivalDate: {
            type: String,
            default: ''
        },

        reason: {
            type: String,
            default: ''
        },

        createdOrUpdatedBy: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

export const uploadModel = mongoose.model('upload', uploadSchema);
