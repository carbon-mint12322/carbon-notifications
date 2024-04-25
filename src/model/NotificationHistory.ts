import Mongoose, { Types } from "mongoose";
import { getISOTimestamp } from "../helper/Utils";

export interface INotificationHistory {
    notificationIdempotentKey: Types.ObjectId
    createdAt: string
}

const NotificationHistorySchema = new Mongoose.Schema({
    // the objectId of the job, to maintain the job running 
    // only one time even if it's invocated parallely
    jobIdempotentKey: {
        type: String,
        required: true,
        unique: true
    },
    // timestamps at which the event was created 
    createdAt: {
        type: String,
        default: getISOTimestamp
    },
});


export const NotificationHistory = Mongoose.model<INotificationHistory>(
    'NotificationHistory',
    NotificationHistorySchema
);