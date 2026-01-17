import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRecord extends Document {
    text: string;
    amount: number;
    date: Date;
    userId: mongoose.Types.ObjectId;
}

const RecordSchema: Schema<IRecord> = new Schema(
    {
        text: {
            type: String,
            default: '',
        },
        amount: {
            type: Number,
            required: [true, 'Please provide sleep amount'],
        },
        date: {
            type: Date,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

// Prevent overwriting model during hot reload
const Record: Model<IRecord> =
    mongoose.models.Record || mongoose.model<IRecord>('Record', RecordSchema);

export default Record;
