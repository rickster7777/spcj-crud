import mongoose, { Schema } from 'mongoose';
import { v4 } from 'uuid';

// Define the schema for Flight
const FlightSchema = new Schema(
    {
        guid: {
            type: String,
            default: function () {
                return v4();
            },
            unique: true,
        },
        flightId: {
            type: String,
            required: true,
            unique: true
        },
        flightNumber: {
            type: String,
            required: true,
            trim: true
        },
        enabled: {
            type: String,
            enum: ['ANY', 'YES', 'NO'],
            default: 'ANY'
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

export const FlightModel = mongoose.model('Flight', FlightSchema);
