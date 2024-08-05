import mongoose, { Schema } from 'mongoose';
import { v4 } from 'uuid';


// Define the schema for Carrier Code
const CarrierCodeSchema = new Schema(
    {
        guid: {
            type: String,
            default: function () {
                return v4();
            },
            unique: true,
        },
        ccId: {
            type: String,
            required: true,
            unique: true
        },
        carrierCode: {
            type: String,
            required: true,
            trim: true
        },
        enabled: {
            type: String,
            enum: ['ANY', 'YES', 'NO'],
            default: 'ANY'
        },
        createdOrupdatedBy: { type: String, default: '' }
    },
    {
        timestamps: true
    }
);

export const CarrierCodeModel = mongoose.model('CarrierCode', CarrierCodeSchema);
